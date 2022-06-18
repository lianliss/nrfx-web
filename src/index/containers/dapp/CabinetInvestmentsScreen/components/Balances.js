import React from "react";
import WalletBox from "../../../../components/cabinet/WalletBox/WalletBox";

export default function Balances({ data }) {
  return data.map((item, key) => {
    // return BalanceItem(item, key);
    return <WalletBox action={false} key={key} {...item} />;
  });
}
