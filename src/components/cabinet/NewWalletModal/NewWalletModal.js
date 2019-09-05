import './NewWalletModal.less';

import React from 'react';
import UI from '../../../ui';

import Currency from './components/Currency';
import EmptyContentBlock from '../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as walletsActions from '../../../actions/cabinet/wallets';

function NewWalletModal() {
  let currencies = walletsActions.getNoGeneratedCurrencies();
  const getContent = () => {
    if (currencies.length) {
      return (
        <div className="NewWalletModal__currencies">
          {currencies.map((currency, i) =>  <Currency key={i} {...currency} />)}
        </div>
      )
    } else {
      return (
        <EmptyContentBlock
          icon={require('../../../asset/120/no_deposits.svg')}
          message="No wallets available"
          skipContentClass
        />
      )
    }
  };

  return (
    <UI.Modal noSpacing isOpen={true} onClose={() => {arguments[0].close()}}>
      <UI.ModalHeader>
        Create New Wallet
      </UI.ModalHeader>
      <div className="NewWalletModal__content">
        {getContent()}
      </div>
    </UI.Modal>
  )
}

export default NewWalletModal;
