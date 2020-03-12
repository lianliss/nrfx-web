import './FiatWithdrawalModal.less';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Modal, { ModalHeader } from '../../../../ui/components/Modal/Modal';
import NumberFormat from '../../../../ui/components/NumberFormat/NumberFormat';
import BankList from './components/BankList/BankList';
import { withdrawalBanksGet, fiatWithdrawal } from '../../../../actions/cabinet/fiatWallets';
import LoadingStatus from '../LoadingStatus/LoadingStatus';
import BankLogo from '../../../../ui/components/BankLogo/BankLogo';
import Input from '../../../../ui/components/Input/Input';
import Button, { ButtonWrapper } from '../../../../ui/components/Button/Button';
import Message from '../../../../ui/components/Message/Message';
import Form from '../../../../ui/components/Form/Form';
import {getLang, isEmail} from '../../../../utils';

const FiatWithdrawalModal = props => {
  const { amount, balance, adaptive, bankList, fee } = props;
  const [bank, changeBank] = useState(null);
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [email, setEmail] = useState('');
  const [touched, touch] = useState(false);
  const [filled, fill] = useState(false);

  useEffect(() => {
    props.withdrawalBanksGet();

    if (!amount || !balance) {
      props.onClose();
    }
    // eslint-disable-next-line
  }, []);

  if (!amount || !balance) {
    return null;
  }

  const handleNext = () => {
    touch(true);
    if (isEmail(email) && accountHolderName ) {
      fill(true);
    }
  };

  const handleSubmit = () => {
    props.fiatWithdrawal({
      bank,
      accountHolderName,
      accountNumber,
      email,
      amount,
      balance
    });
  };

  const total = amount + fee;
  const amountUsd = total * balance.to_usd;

  const headerText = !bank ? getLang('cabinet_fiatWithdrawalModal_chooseBank') :
    ( !filled ? <span>{getLang('cabinet_fiatWithdrawalModal__toBankAccount')} {bank.name}</span> : getLang('cabinet_fiatWithdrawalModal_confirmWithdrawal') );

  return (
    <Modal noSpacing isOpen={true} onClose={props.onClose}>
      { adaptive && <ModalHeader>{headerText}</ModalHeader> }
      <div className="FiatWithdrawalModal">
        <div className="FiatWithdrawalModal__sideBar">
          <div className="FiatWithdrawalModal__header">{getLang('cabinet_fiatWithdrawalModal_title')}</div>
          <div className="FiatWithdrawalModal__sideBar__content">
            <div className="FiatWithdrawalModal__sideBar__fee">
              <small><NumberFormat number={amount} currency={balance.currency} /></small>
              <small>{getLang('global_fee')}: <NumberFormat number={fee} currency={balance.currency} /></small>
            </div>
            <div className="FiatWithdrawalModal__sideBar__total">
              <h2>{getLang('global_total')}</h2>
              <h2><NumberFormat number={total} currency={balance.currency} /></h2>
              <small>{getLang('cabinet_fiatWithdrawalModal_estimatedAt')} <NumberFormat number={amountUsd} currency="usd" /></small>
            </div>
          </div>
        </div>
        <div className="FiatWithdrawalModal__body">
          { !bank ? (
            <>
              { (bankList && !props.loadingStatus) ? <>
                <div className="FiatWithdrawalModal__body__content">
                  <div className="FiatWithdrawalModal__header">{headerText}</div>
                  <BankList onChange={changeBank} items={bankList} />
                </div>
                <ButtonWrapper align="right" className="FiatRefillModal__body__footer">
                  <Button onClick={props.onBack} type="secondary">{getLang('global_back')}</Button>
                </ButtonWrapper>
              </> : <LoadingStatus status="loading" /> }
            </>
          ) : (
            !filled ? (
              <>
                <div className="FiatWithdrawalModal__body__content">
                  <div className="FiatWithdrawalModal__header">{headerText}</div>

                  <p><BankLogo name={bank.code} /></p>

                  <p>{getLang('cabinet_fiatWithdrawalModal__infoText')}</p>

                  {/*<Message title={getLang('global_attention')} type="error">{getLang('cabinet_fiatWithdrawalModal__warningText')}</Message>*/}

                  {/*<p className="FiatWithdrawalModal__accountName">*/}
                  {/*  Account Name: <span onClick={() => setAccountName(props.accountName)}>{props.accountName}</span>*/}
                  {/*</p>*/}

                  <Form>
                    <Input error={touched && !accountHolderName} value={accountHolderName} onTextChange={setAccountHolderName} placeholder={getLang('cabinet_fiatWithdrawalModal__accountHolderName')} />
                    <Input error={touched && !accountNumber} value={accountNumber} onTextChange={setAccountNumber} placeholder={getLang('cabinet_fiatWithdrawalModal__accountNumber')} type="number" />
                    <Input error={touched && !isEmail(email)} value={email} onTextChange={setEmail} placeholder={getLang('global_emailAddress')} description={getLang('cabinet_fiatWithdrawalModal__emailInfo')} />
                  </Form>
                </div>

                <ButtonWrapper align="right" className="FiatWithdrawalModal__body__footer">
                  <Button onClick={() => {
                    changeBank(null);
                    touch(false);
                  }} type="secondary">{getLang('global_back')}</Button>
                  <Button onClick={handleNext}>{getLang('global_next')}</Button>
                </ButtonWrapper>
              </>
            ) : (
              <>
                <div className="FiatWithdrawalModal__body__content">
                  <div className="FiatWithdrawalModal__header">{headerText}</div>
                  <p><BankLogo name={bank.code} /></p>
                  <ul className="FiatWithdrawalModal__dataList">
                    <li>{getLang('global_bank')}: <span className="value">{bank.name}</span></li>
                    <li>{getLang('global_amount')}: <span className="value"><NumberFormat number={amount} currency="idr" /></span></li>
                    <li>{getLang('cabinet_fiatWithdrawalModal__accountHolderName')}: <span className="value">{accountHolderName}</span></li>
                    <li>{getLang('cabinet_fiatWithdrawalModal__accountNumber')}: <span className="value">{accountNumber}</span></li>
                    <li>{getLang('global_emailAddress')}: <span className="value">{email}</span></li>
                  </ul>
                </div>
                <ButtonWrapper align="right" className="FiatWithdrawalModal__body__footer">
                  <Button onClick={() => fill(false)} type="secondary">{getLang('global_back')}</Button>
                  <Button state={props.withdrawalStatus} onClick={handleSubmit}>{getLang('global_confirm')}</Button>
                </ButtonWrapper>
              </>
            )
          )}
        </div>
      </div>
    </Modal>
  );
}


export default connect(state => ({
  accountName: [state.default.profile.user.first_name, state.default.profile.user.last_name].join(' '),
  adaptive: state.default.adaptive,
  loadingStatus: state.fiatWallets.loadingStatus.withdrawalBankList,
  withdrawalStatus: state.fiatWallets.loadingStatus.withdrawal,
  bankList: state.fiatWallets.withdrawalBankList
}), {
  withdrawalBanksGet,
  fiatWithdrawal
})(FiatWithdrawalModal);
