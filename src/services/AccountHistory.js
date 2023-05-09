class AccountHistory {
  constructor(provider) {
    this.provider = provider;
  }

  async getMethodTopic() {
    const contract = await new (this.provider.getWeb3().eth.Contract)(
      require('src/index/constants/ABI/PancakeRouter'),
      this.provider.network.contractAddresses.routerAddress
    );

    return contract;
  }

  async updateHistory(token0, token1) {
    const usdcTokenAddress = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d'; // USDC token on BSC
    const nrfxCoinAddress = '0x3764Be118a1e09257851A3BD636D48DFeab5CAFE'; // Pancake Coin on BSC
    const contract = await this.getMethodTopic();
    console.log(contract)

    const data = await this.provider.getWeb3().eth.getPastLogs(
      {
        address: this.provider.state.accountAddress,
        fromBlock: 22647760,
        topics: [
          this.provider.getWeb3().utils.sha3("swapExactTokensForTokens"),
          this.provider.getWeb3().utils.padLeft(nrfxCoinAddress.toLowerCase(), 64),
          this.provider.getWeb3().utils.padLeft(usdcTokenAddress, 64),
        ],
      },
      (err, logs) => {
        console.log(logs);
      }
    );

    console.log(data)
  }
}

export default AccountHistory;
