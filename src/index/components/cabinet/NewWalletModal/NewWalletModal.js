import './NewWalletModal.less';

import React from 'react';
import UI from '../../../../ui';

import Currency from './components/Currency';
import EmptyContentBlock from '../../cabinet/EmptyContentBlock/EmptyContentBlock';
import * as walletsActions from '../../../../actions/cabinet/wallets';
import * as utils from "../../../../utils";

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
          icon={require('../../../../asset/120/no_deposits.svg')}
          message={utils.getLang("cabinet_noWalletsAvailable")}
          skipContentClass
        />
      )
    }
  };

  return (
    <UI.Modal noSpacing isOpen={true} onClose={() => {arguments[0].close()}}>
      <UI.ModalHeader>
        {utils.getLang('cabinet_walletBox_create')}
      </UI.ModalHeader>
      <div className="NewWalletModal__content">
        {getContent()}
      </div>
    </UI.Modal>
  )
}

export default NewWalletModal;