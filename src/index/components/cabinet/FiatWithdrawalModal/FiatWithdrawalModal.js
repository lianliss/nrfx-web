import './FiatWithdrawalModal.less';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Modal, { ModalHeader } from '../../../../ui/components/Modal/Modal';
import NumberFormat from '../../../../ui/components/NumberFormat/NumberFormat';
import BankList from './components/BankList/BankList';
import { getBankList } from '../../../../actions/cabinet/fiatWallets';
import LoadingStatus from '../LoadingStatus/LoadingStatus';

const FiatWithdrawalModal = props => {

  useEffect(() => {
    props.getBankList();
  }, []);

  return (
    <Modal noSpacing isOpen={true} onClose={props.onClose}>
      {/*<ModalHeader>ModalHeader</ModalHeader>*/}
      <div className="FiatWithdrawalModal">
        <div className="FiatWithdrawalModal__sideBar">
          <div className="FiatWithdrawalModal__header">Вывод средств</div>
          <div className="FiatWithdrawalModal__sideBar__content">
            <h3>Имя Фамилия</h3>
            <h2><NumberFormat number={100000000} currency="idr" /></h2>
            <small>Estimated at <NumberFormat number={73000} currency="usd" /></small>
          </div>
        </div>
        <div className="FiatWithdrawalModal__body">
          <div>
            <div className="FiatWithdrawalModal__header">Выберите банк</div>
            { !props.loadingStatus ? <BankList items={['bni']} /> : <LoadingStatus status="loading" /> }
          </div>
        </div>
      </div>
    </Modal>
  );
}


export default connect(state => ({
  loadingStatus: state.fiatWallets.loadingStatus.bankList
}), {
  getBankList
})(FiatWithdrawalModal);
