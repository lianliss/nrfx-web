import wei from 'utils/wei';
import _ from 'lodash';

const wait = miliseconds => new Promise(fulfill => setTimeout(fulfill, miliseconds));

class TokenContract {

  isAwaiting = false;
  pendingTimeout = 2000;

  constructor(token, provider) {
    Object.assign(this, token);
    this.provider = provider;
    this.web3 = provider.web3;
    this.ethereum = provider.ethereum;

    this.contract = new (this.web3.eth.Contract)(
      require('src/index/constants/ABI/Bep20Token'),
      this.address,
    );
  }

  getAllowance = spender => new Promise((fulfill, reject) => {
    this.contract.methods.allowance(
      this.provider.state.accountAddress,
      spender,
    ).call().then(response => {
      const allowance = wei.from(wei.bn(response), this.decimals);
      fulfill(allowance);
    }).catch(error => {
      console.error('[TokenContract][getAllowance]', error);
      fulfill(0);
    });
  });

  _pendingAllowance = async (spender, amount) => {
    if (!this.isAwaiting) return false;
    const allowance = await this.getAllowance(spender);
    if (allowance < amount) {
      await wait(this.pendingTimeout);
      return await this._pendingAllowance(spender, amount);
    } else {
      return true;
    }
  };

  waitApprove = async (spender, amount) => {
    this.isAwaiting = true;
    return await this._pendingAllowance(spender, amount);
  };

  stopWaiting = () => this.isAwaiting = false;

  transaction = async (method, params, value = 0) => {
    return await this.provider.transaction(this.contract, method, params, value);
  };

  approve = async (spender, amount) => {
    try {
      const txHash = await this.transaction('approve', [spender, wei.to(amount, this.decimals)]);
      console.log('APPROVE DATA', this.provider.getBSCScanLink(txHash));
      await this.waitApprove(spender, amount);
      console.log('APPROVED', amount);
      return amount;
    } catch (error) {
      this.stopWaiting();
      throw error;
    }
  }
}

export default TokenContract;
