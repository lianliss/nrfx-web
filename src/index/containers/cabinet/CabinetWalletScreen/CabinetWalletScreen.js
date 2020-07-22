import React, { useEffect, useCallback } from "react";
import { useRoute } from "react-router5";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../../../components/cabinet/PageContainer/PageContainer";

import * as PAGES from "src/index/constants/pages";
import WalletList from "./components/WalletList/WalletList";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import HistoryTable from "./components/HistoryTable/HistoryTable";
import {
  loadHistory,
  loadWalletPage
} from "../../../../actions/cabinet/wallet";
import {
  walletBalanceSelector,
  walletStatusSelector
} from "../../../../selectors";
import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";

export default () => {
  const {
    route: { name, params }
  } = useRoute();

  const isCrypto = name === PAGES.WALLET_CRYPTO;

  const dispatch = useDispatch();
  const status = useSelector(walletStatusSelector);
  const balance = useSelector(walletBalanceSelector(params.currency));

  useEffect(() => {
    loadWalletPage()(dispatch);
  }, [dispatch]);

  // const fetchHistory = useCallback((options) => {
  //   loadHistory(options)(dispatch);
  // }, [dispatch]);

  useEffect(() => {
    loadHistory(
      balance && {
        [isCrypto ? "wallet_id" : "balance_id"]: balance.id
      }
    )(dispatch);
  }, [balance?.id, isCrypto]);

  if (status.main) {
    return <LoadingStatus status={status.main} />;
  }

  return (
    <PageContainer sideBar={<WalletList currency={params.currency} />}>
      {balance && <WalletHeader balance={balance} />}
      <HistoryTable status={status.history} />
    </PageContainer>
  );
};
