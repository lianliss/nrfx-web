import wei from 'utils/wei';
import _ from 'lodash';

class MasterChefContract {

  contract = null;

  constructor(provider) {
    //if (!provider.state.isConnected) return;
    if (!provider.web3) return;
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
      addresses.map((address, index) => {
        pools[address] = {
          address,
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
      const {address} = pool;
      const accountAddress = _.get(this, 'provider.state.accountAddress');
      const pairContract = new (this.web3.eth.Contract)(
        require('src/index/constants/ABI/PancakePair'),
        address,
      );
      const promises = [
        this.contract.methods.getPoolData(address).call()
      ];
      if (accountAddress) {
        promises.push(this.contract.methods.getPoolUserData(address, accountAddress).call());
      }
      const data = await Promise.all(promises);
      return {
        ...pool,
        token0: _.get(data[0], 'token0'),
        token1: _.get(data[0], 'token1'),
        token0Symbol: _.get(data[0], 'token0Symbol'),
        token1Symbol: _.get(data[0], 'token1Symbol'),
        size: _.get(data[0], 'size', '0'),
        rewardPerBlock: _.get(data[0], 'rewardPerBlock', '0'),
        balance: _.get(data[1], 'balance', '0'),
        userPool: _.get(data[1], 'userPool', '0'),
        reward: _.get(data[1], 'reward', '0'),
        isCanHarvest: _.get(data[1], 'isCanHarvest', false),
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
