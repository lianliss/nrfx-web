import "./CabinetWalletScreen.less";

import React, { memo, useEffect, useCallback } from "react";
import { useRoute } from "react-router5";
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
  walletFetchHistoryMore
} from "../../../../actions/cabinet/wallet";

import {
  walletBalanceSelector,
  walletCardReservationSelector,
  walletHistorySelector,
  walletStatusSelector
} from "../../../../selectors";

import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";
import Paging from "../../../components/cabinet/Paging/Paging";
import CommonHeader from "./components/CommonHeader/CommonHeader";
import SwapForm from "./components/SwapForm/SwapForm";
import RefillBlock from "./components/RefillBlock/RefillBlock";
import SwapTutorial from "./components/SwapTutorial/SwapTutorial";
import EmptyBalance from "./components/EmptyBalance/EmptyBalance";
import Addresses from "./components/Addresses/Addresses";

import useAdaptive from "src/hooks/adaptive";
import { ContentBox } from "../../../../ui";
import SwapFormAdaptive from "./components/SwapFormAdaptive/SwapFormAdaptive";
import { setTitle } from "../../../../actions";
import { getLang } from "../../../../utils";

const buildOptions = (balanceId, isCrypto, isSwap) => {
  return isSwap
    ? { operations: "swap" }
    : balanceId && {
        [isCrypto ? "wallet_id" : "balance_id"]: balanceId
      };
};

export default memo(() => {
  const {
    route: { name, params }
  } = useRoute();

  const adaptive = useAdaptive();

  const isCommon = name === PAGES.WALLET;
  const isCrypto = name === PAGES.WALLET_CRYPTO;
  const isSwap = name === PAGES.WALLET_SWAP;

  const dispatch = useDispatch();
  const status = useSelector(walletStatusSelector);
  const history = useSelector(walletHistorySelector);
  const cardReservation = useSelector(walletCardReservationSelector);
  const balance = useSelector(walletBalanceSelector(params.currency));
  const balanceId = !isSwap && balance?.id;

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
      {isCommon && <Addresses />}
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
