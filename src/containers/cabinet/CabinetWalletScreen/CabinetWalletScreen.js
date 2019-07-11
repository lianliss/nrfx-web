import './CabinetWalletScreen.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';

import { getWallets, getTransactionHistory } from '../../../actions/cabinet/wallets';
import CabinetWrapper from '../../../wrappers/Cabinet/CabinetWrapper';
import ProfileSidebar from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import WalletBalance from './components/WalletBalance';
import Table from '../../../components/cabinet/Table/Table';
import NewWalletModal from '../../../components/cabinet/NewWalletModal/NewWalletModal';
import BuyCurrency from './components/BuyCurrency';

const headings = [
  <span className="Table__item Table__item_center Table__item_highlighted">
    <SVG src={require('../../../asset/cabinet/filter.svg')} />
  </span>,
  <span className="Table__item">Address/Login</span>,
  <span className="Table__item Table__item_right">
    <SVG src={require('../../../asset/cabinet/arrow_small_up.svg')} />
    Amount
  </span>,
  <span className="Table__item">
    Wallet
  </span>,
  <span className="Table__item">
    Type
  </span>,
  <span className="Table__item">
    <span className="Table__item_highlighted">
      Date
    </span>
    <SVG src={require('../../../asset/cabinet/arrow_small_down.svg')} />
  </span>,
]

const rows = [
  [
    <span className="Table__item Table__item_center">
      <span className="Table__dot" style={{background: 'red'}}></span>
    </span>,
    <span className="Table__item">
      code
    </span>,
    <span className="Table__item Table__item_right">
      12
    </span>,
    <span className="Table__item">
      BTC
    </span>,
    <span className="Table__item">
      <span className="Table__item__type_sent">Sended</span>
    </span>,
    <span className="Table__item">
      17:33
    </span>,
  ],
  [
    <span className="Table__item Table__item_center">
      <span className="Table__dot" style={{ background: 'red' }}></span>
    </span>,
    <span className="Table__item">
      <SVG src={require('../../../asset/logo.svg')} />      
      code
    </span>,
    <span className="Table__item Table__item_right">
      17.99
    </span>,
    <span className="Table__item">
      ETH
    </span>,
    <span className="Table__item">
      <span className="Table__item__type_received">Received</span>
    </span>,
    <span className="Table__item">
      12:45
    </span>,
  ],
  [
    <span className="Table__item Table__item_center">
      <span className="Table__dot" style={{ background: 'red' }}></span>
    </span>,
    <span className="Table__item">
      code
    </span>,
    <span className="Table__item Table__item_right">
      12
    </span>,
    <span className="Table__item">
      BTC
    </span>,
    <span className="Table__item">
      <span className="Table__item__type_sent">Sended</span>
    </span>,
    <span className="Table__item">
      17:33
    </span>,
  ],
]


function CabinetWalletScreen({ wallets }) {
  React.useEffect(() => {
    getWallets();
    getTransactionHistory(4132);
  }, []);

  const _renderWallets = () => {
    return (
      <div className="CabinetWalletScreen__wallets">
        {wallets.length && wallets.map(crypto => (
          <WalletBox key={crypto.id} crypto={crypto} />
        ))}

        <NewWalletModal>
          <div className="CabinetWalletScreen__new_wallet">
            <h3>Create new wallet</h3>
          </div>
        </NewWalletModal>
      </div>
    )
  }

  return (
    <CabinetWrapper>
      <div className="CabinetWalletScreen">
        <ProfileSidebar />

        <div className="CabinetWalletScreen__content">
          <div>
            {_renderWallets()}

            <div className="CabinetWalletScreen__table">
              <Table headings={headings} rows={rows} />
            </div>
          </div>

          <div>
            <WalletBalance />

            <BuyCurrency />
          </div>
        </div>
      </div>
    </CabinetWrapper>
  )
}

const mapStateToProps = (state) => ({
  wallets: state.cabinet.wallets,
});

export default connect(mapStateToProps)(CabinetWalletScreen);