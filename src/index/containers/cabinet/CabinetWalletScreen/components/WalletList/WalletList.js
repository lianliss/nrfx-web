import "./WalletList.less";
import * as PAGES from "src/index/constants/pages";
import React, { useCallback } from "react";
import { useRouter } from "react-router5";
import { useDispatch, useSelector } from "react-redux";

import Wallet from "../Wallet/Wallet";
import Lang from "../../../../../../components/Lang/Lang";
import { walletSelector } from "../../../../../../selectors";
import { loadHistory } from "../../../../../../actions/cabinet/wallet";

export default ({ currency }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { wallets, balances } = useSelector(walletSelector);

  return (
    <div className="WalletList">
      <Wallet
        onClick={() => router.navigate(PAGES.WALLET)}
        title={<Lang name={"cabinet_header_wallet"} />}
        icon={require("src/asset/24px/wallet.svg")}
      />
      <Wallet
        onClick={() => router.navigate(PAGES.WALLET_SWAP)}
        title={<Lang name={"cabinet_fiatMarketExchangeTitle"} />}
        icon={require("src/asset/24px/loop.svg")}
      />
      <hr />
      {wallets.map(wallet => (
        <Wallet
          onClick={() => {
            router.navigate(PAGES.WALLET_CRYPTO, { currency: wallet.currency });
          }}
          key={wallet.id}
          active={wallet.currency === currency}
          amount={wallet.amount}
          currency={wallet.currency}
        />
      ))}
      <hr />
      {balances.map(balance => (
        <Wallet
          onClick={() => {
            router.navigate(PAGES.WALLET_FIAT, { currency: balance.currency });
          }}
          key={balance.id}
          active={balance.currency === currency}
          amount={balance.amount}
          currency={balance.currency}
        />
      ))}
    </div>
  );
};
