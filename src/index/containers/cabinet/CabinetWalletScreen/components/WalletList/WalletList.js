import "./WalletList.less";
import * as PAGES from "src/index/constants/pages";
import React from "react";
import { useRoute } from "react-router5";
import { useSelector } from "react-redux";
import _ from "lodash";

import Wallet from "../Wallet/Wallet";
import Lang from "../../../../../../components/Lang/Lang";
import {
  walletSelector,
  web3BalancesCountSelector,
  web3BalancesSelector,
} from "../../../../../../selectors";
import useAdaptive from "src/hooks/adaptive";
import { Separator } from "ui";

import {
  WEI_ETHER, NANO,
} from 'src/index/constants/cabinet';

import { ReactComponent as WalletIcon } from "src/asset/24px/wallet.svg";
import { ReactComponent as LoopIcon } from "src/asset/24px/loop.svg";

export default ({ currency }) => {
  const adaptive = useAdaptive();
  const { route, router } = useRoute();
  const legacyWallets = useSelector(walletSelector);
  const fiats = legacyWallets.balances;
  // const wallets = useSelector(web3WalletsSelector);
  const web3Balances = useSelector(web3BalancesSelector);
  const web3BalancesCount = useSelector(web3BalancesCountSelector);
  const balances = {};
  web3Balances.map(walletBalance => {
    Object.keys(walletBalance.items).map(token => {
      if (!balances[token]) balances[token] = 0;
      balances[token] += Number(walletBalance.items[token]);
    })
  });
  const tokens = Object.keys(balances);

  return (
    <div className="WalletList">
      {!adaptive && (
        <>
        <Wallet
          active={route.name === PAGES.WALLET}
          onClick={() => router.navigate(PAGES.WALLET)}
          title={<Lang name={"cabinet_header_wallet"} />}
          icon={<WalletIcon />}
        />
        <Wallet
          active={route.name === PAGES.WALLET_SWAP}
          onClick={() => router.navigate(PAGES.WALLET_SWAP)}
          title={<Lang name={"cabinet_fiatMarketExchangeTitle"} />}
          icon={<LoopIcon />}
        />
        <Separator />
        </>
      )}
      {tokens.filter(token => token !== 'wbnb').map(token => {
        const devider = token === 'ton' ? NANO : WEI_ETHER;
        const amount = Number(balances[token]) / devider;
        return <Wallet
          onClick={() => {
            router.navigate(PAGES.WALLET_CRYPTO, { currency: token });
          }}
          key={token}
          active={token === currency}
          amount={amount}
          currency={token}
        />
      })}
      {!!tokens.length && <Separator />}
      {fiats.map(balance => (
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
