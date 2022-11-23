class WalletConnectorStorage {
  storageName = 'walletConenctor';

  constructor(provider) {
    this.connector = window.localStorage.getItem(this.storageName);
    this.connectWallet = provider.connectWallet;
  }

  set(connector = null) {
    if (connector) {
      window.localStorage.setItem(this.storageName, connector);
    }
  }

  clear() {
    window.localStorage.removeItem(this.storageName);
  }

  get() {
    return this.connector;
  }

  /**
   * Connect wallet if previously used
   * connect function.
   * @returns connectionStatus {boolean}
   */
  async connect() {
    if (!this.connector) return false;

    const connected = await this.connectWallet(this.connector);

    return !!connected;
  }
}

export default WalletConnectorStorage;
