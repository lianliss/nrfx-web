import React, { useEffect, useState, useCallback } from "react";
import { useRoute } from "react-router5";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../../../components/cabinet/PageContainer/PageContainer";

import * as PAGES from "src/index/constants/pages";
import WalletList from "./components/WalletList/WalletList";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import HistoryTable from "./components/HistoryTable/HistoryTable";
import {
  fetchWalletPage,
  walletFetchHistory,
  walletFetchHistoryMore
} from "../../../../actions/cabinet/wallet";
import {
  walletBalanceSelector,
  walletHistoryNextSelector,
  walletStatusSelector
} from "../../../../selectors";
import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";
import Paging from "../../../components/cabinet/Paging/Paging";
import CommonHeader from "./components/CommonHeader/CommonHeader";
import SwapForm from "./components/SwapForm/SwapForm";

export default () => {
  const {
    route: { name, params }
  } = useRoute();

  const isCommon = name === PAGES.WALLET;
  const isCrypto = name === PAGES.WALLET_CRYPTO;
  const isSwap = name === PAGES.WALLET_SWAP;

  const dispatch = useDispatch();
  const status = useSelector(walletStatusSelector);
  const next = useSelector(walletHistoryNextSelector);
  const balance = useSelector(walletBalanceSelector(params.currency));
  const [historyOptions, setHistoryOptions] = useState(null);

  useEffect(() => {
    dispatch(fetchWalletPage());
  }, [dispatch]);

  useEffect(() => {
    window.scroll(0, 0);

    setHistoryOptions(
      isSwap
        ? { operations: "swap" }
        : balance && {
            [isCrypto ? "wallet_id" : "balance_id"]: balance.id
          }
    );
  }, [balance, isCrypto, isSwap]);

  useEffect(() => {
    dispatch(walletFetchHistory(historyOptions));
  }, [historyOptions, dispatch]);

  const handleLoadMore = useCallback(() => {
    dispatch(walletFetchHistoryMore(historyOptions));
  }, [historyOptions, dispatch]);

  if (status.main) {
    return <LoadingStatus status={status.main} />;
  }

  return (
    <PageContainer sideBar={<WalletList currency={params.currency} />}>
      {isCommon && <CommonHeader />}
      {isSwap && <SwapForm />}
      {balance && <WalletHeader isCrypto={isCrypto} balance={balance} />}

      <Paging
        isCanMore={!!next && status.historyMore !== "loading"}
        onMore={handleLoadMore}
        moreButton={!!next && !status.history}
        isLoading={status.historyMore === "loading"}
      >
        <HistoryTable status={status.history} />
      </Paging>
    </PageContainer>
  );
};
