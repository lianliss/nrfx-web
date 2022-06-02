import React, { memo, useEffect, useCallback } from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { useRoute, withRouter } from "react-router5";
import { useDispatch, useSelector } from "react-redux";
import { getAnalytics, logEvent } from "firebase/analytics";

import PageContainer from "../../../components/cabinet/PageContainer/PageContainer";
import * as PAGES from "src/index/constants/pages";
import WalletList from "./components/WalletList/WalletList";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import History from "./components/History/History";

import {
  fetchWalletPage,
  walletFetchHistory,
  walletFetchHistoryMore,
  walletUpdate,
  walletSetStatus,
} from "actions/cabinet/wallet";

import {
  walletBalanceSelector,
  walletCardReservationSelector,
  walletHistorySelector,
  walletStatusSelector,
  web3StatusSelector,
  web3BalancesSelector,
} from "src/selectors";

import {
  web3SetStatus,
  web3SetData,
} from "actions/cabinet/web3";

import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";
import Paging from "../../../components/cabinet/Paging/Paging";
import CommonHeader from "./components/CommonHeader/CommonHeader";
import SwapForm from "./components/SwapForm/SwapForm";
import RefillBlock from "./components/RefillBlock/RefillBlock";
import SwapTutorial from "./components/SwapTutorial/SwapTutorial";
import EmptyBalance from "./components/EmptyBalance/EmptyBalance";
import Web3Wallets from "./components/Web3Wallets/Web3Wallets";
import CryptoWallet from './components/CryptoWallet/CryptoWallet';
import CabinetSidebar from "../../../components/cabinet/CabinetSidebar/CabinetSidebar";
import CabinetWallets from "../../../components/cabinet/CabinetWallets/CabinetWallets";

import { ContentBox } from "ui";
import SwapFormAdaptive from "./components/SwapFormAdaptive/SwapFormAdaptive";
import { setTitle } from "actions";
import { getLang } from "utils";

import web3Backend from "services/web3-backend";

const old = memo(() => {
  const {
    route: { name, params }
  } = useRoute();

  const adaptive = useAdaptive();

  const isCommon = name === PAGES.WALLET;
  const isCrypto = name === PAGES.WALLET_CRYPTO;
  const isSwap = name === PAGES.WALLET_SWAP;

  const dispatch = useDispatch();
  const status = useSelector(walletStatusSelector);
  const web3Status = useSelector(web3StatusSelector);
  const web3Balances = useSelector(web3BalancesSelector);
  const history = useSelector(walletHistorySelector);
  const cardReservation = useSelector(walletCardReservationSelector);
  const balance = useSelector(walletBalanceSelector(params.currency));
  const balanceId = !isSwap && !!balance && balance.id;

  useEffect(() => {
    dispatch(fetchWalletPage());
  }, [dispatch]);

  useEffect(() => {
    window.scroll(0, 0);

    if (isSwap) {
      logEvent(getAnalytics(), "open_swap_page");
    }
  }, [isSwap]);

  useEffect(() => {
    setTitle(getLang("cabinet_header_wallet", true));
    dispatch(walletFetchHistory(buildOptions(balanceId, isCrypto, isSwap)));
  }, [balanceId, isCrypto, isSwap, dispatch]);

  if (!web3Status.isRequested) {
    // Request for wallets
    dispatch(web3SetStatus('isRequested', true));
    web3Backend.getWallets().then(wallets => {
      dispatch(web3SetData({wallets}));
      dispatch(web3SetStatus('isWalletsLoaded', true));

      // Request for balances
      Promise.allSettled(
        wallets.map(wallet => web3Backend.getBalances(wallet.address))
      ).then(data => {
        const balances = [];
        data.map((balance, index) => {
          const address = wallets[index].address;
          if (balance.status !== 'fulfilled') {
            return;
          }
          balances.push({address, items: balance.value});
        });
        dispatch(web3SetData({balances}));
        dispatch(web3SetStatus('isBalancesLoaded', true));
      });
    }).catch(error => {
      console.error('[CabinetWalletScreen] getWallets', error);
      dispatch(web3SetStatus('isRequested', false));
    });
  }

  const handleLoadMore = useCallback(() => {
    dispatch(walletFetchHistoryMore(buildOptions(balanceId, isCrypto, isSwap)));
  }, [balanceId, isCrypto, isSwap, dispatch]);

  if (status.main) {
    return <LoadingStatus status={status.main} />;
  }

  return (
    <PageContainer
      className="CabinetWalletScreen"
      sideBar={
        !adaptive && <WalletList currency={balanceId && params.currency} />
      }
    >
      {isCommon && <Web3Wallets />}
      {isCommon && <CommonHeader />}
      {isSwap &&
      (adaptive ? (
        <SwapFormAdaptive />
      ) : (
        <>
          <SwapForm />
          <SwapTutorial />
        </>
      ))}

      {balance &&
      !isSwap &&
      (balance.amount ? (
        <WalletHeader isCrypto={isCrypto} balance={balance} />
      ) : (
        <EmptyBalance currency={params.currency} />
      ))}

      {adaptive && !balance && !isSwap && (
        <ContentBox className="CabinetWalletScreen__adaptiveWalletList">
          <WalletList currency={params.currency} />
        </ContentBox>
      )}

      {cardReservation && <RefillBlock />}

      <Paging
        isCanMore={!!history.next && status.historyMore !== "loading"}
        onMore={handleLoadMore}
        moreButton={!!history.next && !status.history}
        isLoading={status.historyMore === "loading"}
      >
        <History />
      </Paging>
    </PageContainer>
  );
});