import './CabinetFiatScreen.less';
//
import React from 'react';
import { connect } from 'react-redux';
//
import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import WalletBalance from '../../../components/cabinet/WalletBalance/WalletBalance';
import Paging from '../../../components/cabinet/Paging/Paging';
import * as utils from '../../../../utils';
import {setTitle} from "../../../../actions";
import FiatMarketForm from "./components/FiatMarketForm/FiatMarketForm";
import FiatHistoryTable from "./components/FiatHistoryTable/FiatHistoryTable";
import {openModal} from "../../../../actions";
import * as actions from 'src/actions/cabinet/fiatWallets';

class CabinetFiatScreen extends CabinetBaseScreen {
  load = () => {
    this.props.getFiatWallets();
  };

  componentDidMount() {
    setTitle(utils.getLang("cabinet_header_fiatWallets"));
    this.load();
  }


  render() {
    if (this.props.loadingStatus.default) {
      return <LoadingStatus status={this.props.loadingStatus.default}/>;
    }

    const wallets = this.props.balances.map((balance, i) => (
      <WalletBox
        key={i}
        {...balance}
        isFiat
        onClick={() => this.__balanceSelect(balance)}
      />
    ));

    return (
      <div>
        <PageContainer
          leftContent={this.__renderRightContent()}
        >
          <div className="CabinetWalletScreen__wallets">
            {this.props.adaptive ? <div className="CabinetWalletsScreen__walletsContentBox">
              {wallets}
            </div> : wallets}
          </div>
          {this.props.adaptive && <>
            <FiatMarketForm/>
            <div className="CabinetProfileScreen__height24"/>
          </>}
          <Paging
            isCanMore={true}
            onMore={() => {
            }}
            moreButton={false}
            isLoading={false}
          >
            <FiatHistoryTable/>
          </Paging>


        </PageContainer>
        {/*{this.props.adaptive && <div className="floatingButtonPadding"> </div>}*/}
      </div>
    );
  }

  __renderRightContent = () => {
    return (
      <div>
        <WalletBalance
          title={utils.getLang('cabinet_walletFiatBalance_name')}
          adaptive={this.props.adaptive}
          isFiat
          wallets={this.props.balances}
        />

        { !this.props.adaptive && <>
          <div className="CabinetProfileScreen__height24" />
          <FiatMarketForm />
        </> }
      </div>
    );
  };


  __balanceSelect = wallet => {
    openModal('wallet', null, { wallet });
  }
}


export default connect(store => ({
  ...store.fiatWallets,
  adaptive: store.default.adaptive,
  translator: store.settings.translator
}), {
  getFiatWallets: actions.getFiatWallets
})(CabinetFiatScreen);

