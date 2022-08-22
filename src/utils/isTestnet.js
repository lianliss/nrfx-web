const testnetDomains = ['testnet.narfex.com', 'localhost'];

module.exports = testnetDomains.indexOf(window.location.hostname) >= 0;
