import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../../../components/cabinet/PageContainer/PageContainer";

import WalletList from "./components/WalletList/WalletList";
import HistoryTable from "./components/HistoryTable/HistoryTable";
import { loadWalletPage } from "../../../../actions/cabinet/wallet";
import { walletStatusSelector } from "../../../../selectors";
import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";

export default () => {
  const dispatch = useDispatch();
  const { main: status } = useSelector(walletStatusSelector);

  useEffect(() => {
    loadWalletPage()(dispatch);
  }, [dispatch]);

  if (status) {
    return <LoadingStatus status={status} />;
  }

  return (
    <PageContainer sideBar={<WalletList />}>
      <HistoryTable />
    </PageContainer>
  );
};
