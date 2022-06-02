import React, { Component } from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';

export class DappCabinet extends Component {
  render() {
    return (
      <PageContainer
        className="CabinetWalletScreen"
        sideBar={<CabinetWalletSidebar />}
      >
        {isCommon && <CabinetWallets />}
        {/* {isCommon && <Web3Wallets />} */}
        {/* {isCommon && <CommonHeader />} */}
        {isCrypto && <CryptoWallet />}
        {isSwitchPage && <SwitchPage route={name} adaptive={isAdaptive} />}
        {isFarming && <Farming adaptive={isAdaptive} />}
        {isValidator && <CabinetValidator />}
        {!isReservationExpire && <RefillBlock />}

        {/* <Paging
          isCanMore={!!history.next && status.historyMore !== "loading"}
          onMore={() => handleLoadMore(balanceId, isCrypto, isSwap)}
          moreButton={!!history.next && !status.history}
          isLoading={status.historyMore === "loading"}
        >
          <History />
        </Paging> */}
      </PageContainer>
    );
  }
}

export default DappCabinet;
