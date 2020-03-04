import './FiatRefillModal.less';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Modal, { ModalHeader } from '../../../../ui/components/Modal/Modal';
import NumberFormat from '../../../../ui/components/NumberFormat/NumberFormat';
import BankList from './components/BankList/BankList';
import MethodsList from './components/MethodsList/MethodsList';
import { refillBanksGet } from '../../../../actions/cabinet/fiatWallets';
import LoadingStatus from '../LoadingStatus/LoadingStatus';
import BankLogo from '../../../../ui/components/BankLogo/BankLogo';
import Clipboard from 'src/index/components/cabinet/Clipboard/Clipboard';
import Button, { ButtonWrapper } from '../../../../ui/components/Button/Button';
import {getLang} from '../../../../utils';

const WithdrawalRefillModal = props => {
  const { amount, balance, adaptive, bankList } = props;
  const [bank, changeBank] = useState(null);

  useEffect(() => {
    props.refillBanksGet();

    if (!amount || !balance) {
      props.onClose();
    }
    // eslint-disable-next-line
  }, []);

  if (!amount || !balance) {
    return null;
  }

  const amountUsd = amount * balance.to_usd;

  return (
    <Modal noSpacing isOpen={true} onClose={props.onClose}>
      { adaptive && <ModalHeader>{getLang('cabinet_fiatWithdrawalModal_chooseBank')}Z</ModalHeader> }
      <div className="FiatRefillModal">
        <div className="FiatRefillModal__sideBar">
          <div className="FiatRefillModal__header">{getLang('cabinet_balanceDeposit')}</div>
          <div className="FiatRefillModal__sideBar__content">
            <h2><NumberFormat number={amount} currency={balance.currency} /></h2>
            <small>{getLang('cabinet_fiatWithdrawalModal_estimatedAt')} <NumberFormat number={amountUsd} currency="usd" /></small>
          </div>
        </div>
        <div className="FiatRefillModal__body">
          { !bank ? (
            <div>
              <div className="FiatRefillModal__header">{getLang('cabinet_fiatWithdrawalModal_chooseBank')}</div>
              { (bankList && !props.loadingStatus) ? <BankList onChange={changeBank} items={bankList} /> : <LoadingStatus status="loading" /> }
            </div>
          ) : (
            <>
              <div className="FiatRefillModal__body__content">
                <div className="FiatRefillModal__header">{bank.name}</div>
                <p><BankLogo name={bank.code} /></p>
                <ul className="FiatRefillModal__accountInfo">
                  <li>{getLang('cabinet_virtualAccount')} # <span><Clipboard text={bank.virtual_number} /></span></li>
                </ul>
                <p>{getLang('cabinet_fiatWithdrawalModal__infoText')}</p>

                {/*<pre>{JSON.stringify(bank.methods, null, 2)}</pre>*/}
                <MethodsList accountNumber={bank.virtual_number} methods={bank.methods} />
              </div>

              <ButtonWrapper align="right" className="FiatRefillModal__body__footer">
                <Button onClick={() => {
                  changeBank(null);
                }} type="secondary">{getLang('global_back')}</Button>
              </ButtonWrapper>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}


export default connect(state => ({
  accountName: [state.default.profile.user.first_name, state.default.profile.user.last_name].join(' '),
  adaptive: state.default.adaptive,
  loadingStatus: state.fiatWallets.loadingStatus.bankList,
  withdrawalStatus: state.fiatWallets.loadingStatus.withdrawal,
  bankList: state.fiatWallets.refillBankList
}), {
  refillBanksGet: refillBanksGet,
})(WithdrawalRefillModal);
