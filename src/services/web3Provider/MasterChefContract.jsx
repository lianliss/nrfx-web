import wei from 'utils/wei';
import _ from 'lodash';

class MasterChefContract {

  constructor(provider) {
    if (!provider.state.isConnected) return;
    this.provider = provider;
    this.web3 = provider.web3;
    this.ethereum = provider.ethereum;

    this.contract = new (this.web3.eth.Contract)(
      require('src/index/constants/ABI/MasterChef'),
      this.provider.masterChefAddress,
    );
  }

  async getPoolsList() {
    try {
      const accountAddress = _.get(this, 'provider.state.accountAddress');
      const pools = {};
      const count = await this.contract.methods.poolsCount().call();
      const getMethods = [];
      for (let i = 0; i < Number(count); i++) {
        getMethods.push(this.contract.methods.poolsList(i).call())
      }
      const addresses = await Promise.all(getMethods);
      const contracts = addresses.map(poolAddress => new (this.web3.eth.Contract)(
        require('src/index/constants/ABI/PancakePair'),
        poolAddress,
      ));
      addresses.map((address, index) => {
        pools[address] = {
          address,
          contract: contracts[index],
          token0: null,
          token1: null,
          size: '0',
          balance: '0',
          userPool: '0',
          isDataLoaded: false,
        }
      });
      return pools;
    } catch (error) {
      console.error('[MasterChefContract][getPoolsList]', error);
    }
  }

  async getPoolData(pool) {
    try {
      const {contract, address} = pool;
      const accountAddress = _.get(this, 'provider.state.accountAddress');
      const promises = [
        contract.methods.token0().call(),
        contract.methods.token1().call(),
        this.contract.methods.getPoolSize(address).call(),
      ];
      if (accountAddress) {
        promises.push(contract.methods.balanceOf(accountAddress).call());
        promises.push(this.contract.methods.getUserPoolSize(address, accountAddress).call());
        promises.push(this.contract.methods.getUserReward(address, accountAddress).call());
      }
      const data = await Promise.all(promises);
      return {
        ...pool,
        token0: data[0],
        token1: data[1],
        size: data[2],
        balance: data[3] || '0',
        userPool: data[4] || '0',
        reward: data[5] || '0',
        isDataLoaded: true,
      }
    } catch (error) {
      console.error('[MasterChefContract][getPoolData]', pool.address, error);
      return pool;
    }
  }

  transaction = async (method, params, value = 0) => {
    return await this.provider.transaction(this.contract, method, params, value);
  };
}

export default MasterChefContract;
