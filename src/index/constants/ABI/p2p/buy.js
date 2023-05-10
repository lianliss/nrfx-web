module.exports = [{
  "inputs": [{
    "internalType": "address",
    "name": "_factory",
    "type": "address"
  }, {"internalType": "address", "name": "_owner", "type": "address"}, {
    "internalType": "address",
    "name": "_fiatAddress",
    "type": "address"
  }, {"internalType": "uint16", "name": "_commission", "type": "uint16"}],
  "stateMutability": "nonpayable",
  "type": "constructor"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "address", "name": "_client", "type": "address"}, {
    "indexed": false,
    "internalType": "address",
    "name": "_lawyer",
    "type": "address"
  }],
  "name": "P2pCancelTrade",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "address", "name": "_client", "type": "address"}, {
    "indexed": false,
    "internalType": "address",
    "name": "_lawyer",
    "type": "address"
  }],
  "name": "P2pConfirmTrade",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "address", "name": "_client", "type": "address"}, {
    "indexed": false,
    "internalType": "uint256",
    "name": "moneyAmount",
    "type": "uint256"
  }, {"indexed": false, "internalType": "uint256", "name": "fiatAmount", "type": "uint256"}],
  "name": "P2pCreateTrade",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "uint256", "name": "_index", "type": "uint256"}, {
    "indexed": false,
    "internalType": "string",
    "name": "_jsonData",
    "type": "string"
  }],
  "name": "P2pOfferAddBankAccount",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "address", "name": "_client", "type": "address"}],
  "name": "P2pOfferBlacklisted",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "uint256", "name": "_index", "type": "uint256"}],
  "name": "P2pOfferClearBankAccount",
  "type": "event"
}, {"anonymous": false, "inputs": [], "name": "P2pOfferDisable", "type": "event"}, {
  "anonymous": false,
  "inputs": [],
  "name": "P2pOfferEnable",
  "type": "event"
}, {"anonymous": false, "inputs": [], "name": "P2pOfferKYCRequired", "type": "event"}, {
  "anonymous": false,
  "inputs": [],
  "name": "P2pOfferKYCUnrequired",
  "type": "event"
}, {"anonymous": false, "inputs": [], "name": "P2pOfferScheduleUpdate", "type": "event"}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "uint256", "name": "_percents", "type": "uint256"}],
  "name": "P2pOfferSetCommission",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "address", "name": "_client", "type": "address"}],
  "name": "P2pOfferUnblacklisted",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "uint256", "name": "_amount", "type": "uint256"}],
  "name": "P2pOfferWithdraw",
  "type": "event"
}, {
  "anonymous": false,
  "inputs": [{"indexed": false, "internalType": "address", "name": "_client", "type": "address"}, {
    "indexed": false,
    "internalType": "address",
    "name": "_offer",
    "type": "address"
  }, {"indexed": false, "internalType": "address", "name": "_lawyer", "type": "address"}],
  "name": "P2pSetLawyer",
  "type": "event"
}, {
  "inputs": [{"internalType": "string", "name": "_jsonData", "type": "string"}],
  "name": "addBankAccount",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_client", "type": "address"}],
  "name": "addToBlacklist",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_client", "type": "address"}],
  "name": "cancelTrade",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_index", "type": "uint256"}],
  "name": "clearBankAccount",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "commission",
  "outputs": [{"internalType": "uint16", "name": "", "type": "uint16"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_client", "type": "address"}],
  "name": "confirmTrade",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "moneyAmount", "type": "uint256"}, {
    "internalType": "uint256",
    "name": "bankAccountId",
    "type": "uint256"
  }], "name": "createTrade", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "moneyAmount", "type": "uint256"}, {
    "internalType": "uint256",
    "name": "bankAccountId",
    "type": "uint256"
  }, {"internalType": "address", "name": "clientAddress", "type": "address"}],
  "name": "createTrade",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [],
  "name": "fiat",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getAvailableBalance",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getBalance",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getBankAccounts",
  "outputs": [{"internalType": "string[]", "name": "", "type": "string[]"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getCurrentTrades",
  "outputs": [{
    "components": [{"internalType": "uint8", "name": "status", "type": "uint8"}, {
      "internalType": "uint32",
      "name": "createDate",
      "type": "uint32"
    }, {"internalType": "uint256", "name": "moneyAmount", "type": "uint256"}, {
      "internalType": "uint256",
      "name": "fiatAmount",
      "type": "uint256"
    }, {"internalType": "uint256", "name": "fiatLocked", "type": "uint256"}, {
      "internalType": "address",
      "name": "client",
      "type": "address"
    }, {"internalType": "address", "name": "lawyer", "type": "address"}, {
      "internalType": "uint256",
      "name": "bankAccountId",
      "type": "uint256"
    }, {"internalType": "bytes32", "name": "chatRoom", "type": "bytes32"}],
    "internalType": "struct NarfexP2pBuyOffer.Trade[]",
    "name": "",
    "type": "tuple[]"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getIsActive",
  "outputs": [{"internalType": "bool", "name": "isActive", "type": "bool"}],
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
  "name": "getLockedAmount",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getOffer",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}, {
    "internalType": "address",
    "name": "",
    "type": "address"
  }, {"internalType": "address", "name": "", "type": "address"}, {
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }, {"internalType": "bool", "name": "", "type": "bool"}, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }, {"internalType": "uint256", "name": "", "type": "uint256"}, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }, {"internalType": "uint256", "name": "", "type": "uint256"}, {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getSchedule",
  "outputs": [{"internalType": "bool[24][7]", "name": "", "type": "bool[24][7]"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_client", "type": "address"}],
  "name": "getTrade",
  "outputs": [{
    "components": [{"internalType": "uint8", "name": "status", "type": "uint8"}, {
      "internalType": "uint32",
      "name": "createDate",
      "type": "uint32"
    }, {"internalType": "uint256", "name": "moneyAmount", "type": "uint256"}, {
      "internalType": "uint256",
      "name": "fiatAmount",
      "type": "uint256"
    }, {"internalType": "uint256", "name": "fiatLocked", "type": "uint256"}, {
      "internalType": "address",
      "name": "client",
      "type": "address"
    }, {"internalType": "address", "name": "lawyer", "type": "address"}, {
      "internalType": "uint256",
      "name": "bankAccountId",
      "type": "uint256"
    }, {"internalType": "bytes32", "name": "chatRoom", "type": "bytes32"}],
    "internalType": "struct NarfexP2pBuyOffer.Trade",
    "name": "",
    "type": "tuple"
  }],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "getTradesQuote",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_client", "type": "address"}],
  "name": "isClientHaveTrade",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "isKYCRequired",
  "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "maxTradeAmount",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "minTradeAmount",
  "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [],
  "name": "owner",
  "outputs": [{"internalType": "address", "name": "", "type": "address"}],
  "stateMutability": "view",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_client", "type": "address"}],
  "name": "removeFromBlacklist",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "bool", "name": "_newState", "type": "bool"}],
  "name": "setActiveness",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint16", "name": "_percents", "type": "uint16"}],
  "name": "setCommission",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "bool", "name": "_newState", "type": "bool"}],
  "name": "setKYCRequirement",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "address", "name": "_client", "type": "address"}],
  "name": "setLawyer",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "bool[24][7]", "name": "_schedule", "type": "bool[24][7]"}],
  "name": "setSchedule",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}, {
  "inputs": [{"internalType": "uint256", "name": "_amount", "type": "uint256"}],
  "name": "withdraw",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
}];