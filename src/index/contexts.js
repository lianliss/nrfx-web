import React from "react";

export const GetParamsContext = React.createContext();
export const Web3Context = React.createContext({
  ethereum: null,
  connectWallet: () => {},
});
