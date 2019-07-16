import './CabinetWalletScreen.less';

import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';

import { getWallets } from '../../../actions/cabinet/wallets';
import CabinetWrapper from '../../../wrappers/Cabinet/CabinetWrapper';
import ProfileSidebar from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import WalletBox from '../../../components/cabinet/WalletBox/WalletBox';
import WalletBalance from './components/WalletBalance';
import Table from '../../../components/cabinet/Table/Table';
import NewWalletModal from '../../../components/cabinet/NewWalletModal/NewWalletModal';
import BuyCurrency from './components/BuyCurrency';
import TransactionModal from '../../../components/cabinet/TransactionModal/TransactionModal';

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

const getRows = (history) => {
  if (!history) {
    return [];
  }

  return history.map(item => (
    [
      <span className="Table__item Table__item_center">
        <span className="Table__dot" style={{ background: 'red' }}></span>
      </span>,
      <span className="Table__item">
        {item.from}
      </span>,
      <span className="Table__item Table__item_right">
        {item.amount}
      </span>,
      <span className="Table__item">
        {item.currency.toUpperCase()}
      </span>,
      <span className="Table__item">
        {item.action_type === 'send' 
          ? <span className="Table__item__type_sent">Sended</span> 
          : <span className="Table__item__type_received">Received</span>}
      </span>,
      <span className="Table__item">
        {item.date}
      </span>,
    ]
  ))
}


function CabinetWalletScreen({ wallets, history }) {
  const [isModalOpen, toggleModalOpen] = useState(false);
  // const [currentModalData, changeModalData] = useState();

  React.useEffect(() => {
    getWallets();
  }, []);

  const handleRowClick = () => {
    toggleModalOpen(true);
  }

  const _renderWallets = () => {
    return (
      <div className="CabinetWalletScreen__wallets">
        {!!wallets.length && wallets.map(crypto => (
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
              {history
                ? <Table headings={headings} rows={getRows(history)} onRowClick={handleRowClick} />
                : (
                  <div className="CabinetWalletScreen__transactions_empty Content_box">
                    <div className="Empty_box">
                      <SVG src={require('../../../asset/cabinet/transactions_colorful.svg')} />
                      <h3>
                        Here will be your transactions
                      </h3>
                    </div>
                  </div>
                )}
            </div>
          </div>

          <div>
            <WalletBalance wallets={wallets} />

            <BuyCurrency />
          </div>
        </div>

        <TransactionModal isOpen={isModalOpen} onChange={toggleModalOpen} />
      </div>
    </CabinetWrapper>
  )
}

const mapStateToProps = (state) => ({
  wallets: state.cabinet.wallets,
  history: state.cabinet.history,
});

export default connect(mapStateToProps)(CabinetWalletScreen);