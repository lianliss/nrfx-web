const testnetDomains = ['testnet.narfex.com'];

module.exports = testnetDomains.indexOf(window.location.hostname) >= 0;
