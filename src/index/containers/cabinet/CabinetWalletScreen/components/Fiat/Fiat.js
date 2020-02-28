// import './CabinetWalletScreen.less';
//
import React from 'react';
import { connect } from 'react-redux';
//
import * as utils from '../../../../../../utils';
import { setTitle, openModal } from '../../../../../../actions';
import * as actions from '../../../../../../actions/cabinet/fiatWallets';
import WalletBox from '../../../../../components/cabinet/WalletBox/WalletBox';
import FiatHistoryTable from '../FiatHistoryTable/FiatHistoryTable';
import FiatMarketForm from '../FiatMarketForm/FiatMarketForm';
import Paging from '../../../../../components/cabinet/Paging/Paging';
import WalletBalance from '../../../../../components/cabinet/WalletBalance/WalletBalance';
import LoadingStatus from '../../../../../components/cabinet/LoadingStatus/LoadingStatus';

class CabinetWalletFiatScreen extends React.Component {
  load = () => {
    this.props.getFiatWallets();
  };

  componentDidMount() {
    setTitle(utils.getLang("cabinet_header_fiatWallets"));
    this.load();
  }

  render() {
    if (this.props.loadingStatus.default) {
      return <LoadingStatus status={this.props.loadingStatus.default} />;
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
      <div className="PageContainer__content CabinetWalletScreen__fiat">
        <div className="PageContainer__content__primary">
          <div className="CabinetWalletScreen__wallets">
            {this.props.adaptive ? <div className="CabinetWalletsScreen__walletsContentBox">
              {wallets}
            </div> : wallets}
          </div>
          { this.props.adaptive && <>
            <FiatMarketForm />
            <div className="CabinetProfileScreen__height24" />
          </>}
          <Paging
            isCanMore={true}
            onMore={() => {}}
            moreButton={false}
            isLoading={false}
          >
            <FiatHistoryTable />
          </Paging>
        </div>
        <div className="PageContainer__content__secondary">
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
      </div>
    );
  }

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
})(CabinetWalletFiatScreen);
