module.exports = [{
  "inputs": [{
    "internalType": "address",
    "name": "_WETH",
    "type": "address"
  }, {"internalType": "address", "name": "_kyc", "type": "address"}, {
    "internalType": "address",
    "name": "_lawyers",
    "type": "address"
  }, {"internalType": "address", "name": "_router", "type": "address"}],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "address", "name": "validator", "type": "address"}, {
    "indexed": true,
    "internalType": "address",
    "name": "fiatAddress",
    "type": "address"
  }, {"indexed": false, "internalType": "address", "name": "offer", "type": "address"}, {
    "indexed": false,
    "internalType": "bool",
    "name": "isBuy",
    "type": "bool"
  }],
  "name": "CreateOffer",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"}, {
    "indexed": true,
    "internalType": "address",
    "name": "newOwner",
    "type": "address"
  }],
  "name": "OwnershipTransferred",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "address", "name": "fiatAddress", "type": "address"}, {
    "indexed": false,
    "internalType": "uint16",
    "name": "fee",
    "type": "uint16"
  }],
  "name": "SetFiatFee",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "address", "name": "kycContract", "type": "address"}],
  "name": "SetKYCContract",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "address", "name": "lawyersContract", "type": "address"}],
  "name": "SetLawyersContract",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "address", "name": "routerAddress", "type": "address"}],
  "name": "SetRouter",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}],
  "name": "SetTradesLimit",
  "type": "event"
}, {
  "inputs": [],
  "name": "WETH",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_fiatAddress", "type": "address"}, {
    "internalType": "uint16",
    "name": "_commission",
    "type": "uint16"
  }], "name": "create", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_validator", "type": "address"}],
  "name": "getCanTrade",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_token", "type": "address"}],
  "name": "getETHPrice",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_fiatAddress", "type": "address"}],
  "name": "getFiatFee",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_client", "type": "address"}],
  "name": "getIsBlacklisted",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getLawyer",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_fiat", "type": "address"}, {
    "internalType": "uint256",
    "name": "_offset",
    "type": "uint256"
  }, {"internalType": "uint256", "name": "_limit", "type": "uint256"}],
  "name": "getOffers",
  "outputs": [{
    "components": [{
      "internalType": "address",
      "name": "offerAddress",
      "type": "address"
    }, {"internalType": "address", "name": "fiatAddress", "type": "address"}, {
      "internalType": "address",
      "name": "ownerAddress",
      "type": "address"
    }, {"internalType": "bool", "name": "isBuy", "type": "bool"}, {
      "internalType": "bool",
      "name": "isActive",
      "type": "bool"
    }, {"internalType": "uint256", "name": "commission", "type": "uint256"}, {
      "internalType": "uint256",
      "name": "totalCommission",
      "type": "uint256"
    }, {"internalType": "uint256", "name": "minTrade", "type": "uint256"}, {
      "internalType": "uint256",
      "name": "maxTrade",
      "type": "uint256"
    }, {"internalType": "uint256", "name": "tradesQuote", "type": "uint256"}],
    "internalType": "struct NarfexP2pBuyFactory.Offer[]",
    "name": "",
    "type": "tuple[]"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getRouter",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getTradesLimit",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_validator", "type": "address"}, {
    "internalType": "address",
    "name": "_fiatAddress",
    "type": "address"
  }],
  "name": "getValidatorLimit",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_account", "type": "address"}, {
    "internalType": "uint256",
    "name": "_offset",
    "type": "uint256"
  }, {"internalType": "uint256", "name": "_limit", "type": "uint256"}],
  "name": "getValidatorOffers",
  "outputs": [{
    "components": [{
      "internalType": "address",
      "name": "offerAddress",
      "type": "address"
    }, {"internalType": "address", "name": "fiatAddress", "type": "address"}, {
      "internalType": "address",
      "name": "ownerAddress",
      "type": "address"
    }, {"internalType": "bool", "name": "isBuy", "type": "bool"}, {
      "internalType": "bool",
      "name": "isActive",
      "type": "bool"
    }, {"internalType": "uint256", "name": "commission", "type": "uint256"}, {
      "internalType": "uint256",
      "name": "totalCommission",
      "type": "uint256"
    }, {"internalType": "uint256", "name": "minTrade", "type": "uint256"}, {
      "internalType": "uint256",
      "name": "maxTrade",
      "type": "uint256"
    }, {"internalType": "uint256", "name": "tradesQuote", "type": "uint256"}],
    "internalType": "struct NarfexP2pBuyFactory.Offer[]",
    "name": "",
    "type": "tuple[]"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_client", "type": "address"}],
  "name": "isKYCVerified",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "kyc",
  "outputs": [{"internalType": "contract INarfexKYC", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "lawyers",
  "outputs": [{"internalType": "contract INarfexLawyers", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "owner",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "renounceOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "router",
  "outputs": [{"internalType": "contract INarfexP2pRouter", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_fiatAddress", "type": "address"}, {
    "internalType": "uint16",
    "name": "_fee",
    "type": "uint16"
  }], "name": "setFiatFee", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_newAddress", "type": "address"}],
  "name": "setKYCContract",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_newAddress", "type": "address"}],
  "name": "setLawyersContract",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_router", "type": "address"}],
  "name": "setRouter",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_limit", "type": "uint256"}],
  "name": "setTradesLimit",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "tradesLimit",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
  "name": "transferOwnership",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];