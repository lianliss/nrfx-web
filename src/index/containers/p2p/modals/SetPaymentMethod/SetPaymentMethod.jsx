import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Web3Context } from 'services/web3Provider';

// Components
import { CabinetModal } from 'dapp';
import { SelectMethod, Form } from './components';

// Utils
import { adaptiveSelector } from 'src/selectors';
import { openStateModal } from 'src/actions';
import { setP2PPayment } from 'src/actions/dapp/p2p';
import { dappP2PPaymentSelector } from 'src/selectors';
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import styles from './SetPaymentMethod.module.less';

function SetPaymentMethod({ onClose, initialSelect, mode, banks, banksList, offer, amount, fiatAmount, setTimestamp, ...props }) {
  
  const context = React.useContext(Web3Context);
  const {getFiatsArray, accountAddress, backendRequest} = context;
  const dispatch = useDispatch();
  const adaptive = useSelector(adaptiveSelector);
  const [selected, setSelected] = React.useState(initialSelect);
  
  const clearSelected = () => setSelected(null);
  
  const key = `dh-key-${accountAddress}`;
  const [settings, setSettings] = React.useState({});
  React.useEffect(() => {
    (async () => {
      let settings;
      try {
        settings = JSON.parse(window.localStorage.getItem(key));
      } catch (error) {}
      if (!settings) {
        try {
          settings = JSON.parse(await this.backendRequest({}, ``, 'user/p2p/settings', 'get'));
        } catch (error) {
          settings = {};
        }
      }
      setSettings(settings);
    })()
  }, [accountAddress]);
  const userBankAccounts = _.get(settings, 'bankAccounts', []);
  
  const saveBankAccount = async account => {
    try {
      if (!settings.bankAccounts) settings.bankAccounts = userBankAccounts;
      settings.bankAccounts.push(account);
      window.localStorage.setItem(key, JSON.stringify(settings));
      backendRequest({settings}, ``, 'user/p2p/settings', 'post');
      setSettings(settings);
      setTimestamp(Date.now());
    } catch (error) {
      console.error('[saveBankAccount]', error, account);
    }
  };
  
  const handleModalClose = () => {
    if (offer) {
      openStateModal('p2p_create_order', { mode, banks, banksList, offer, initialAmount: amount, initialFiatAmount: fiatAmount, payment: initialSelect });
    }
  };
  
  const handleFormConfirm = _banks => {
    console.log('handleFormConfirm', _banks);
    if (offer) {
      openStateModal('p2p_create_order', { mode, banks: _banks || banks, banksList, offer, initialAmount: amount, initialFiatAmount: fiatAmount, payment: _banks[0] });
    } else {
      saveBankAccount(_banks[0]);
      setSelected(_banks[0]);
      onClose();
    }
  };
  
  if (!!offer) {
    console.log('SET PAYMENT', offer, banks, userBankAccounts);
    const offerBanks = _.get(offer, 'settings.banks', []);
    const currentBanks = mode === 'buy'
      ? banks.filter(b => !!b)
      : userBankAccounts.filter(ub => _.indexOf(offerBanks, ub.code) >= 0);
    return <CabinetModal
      className={styles.setPaymentMethod}
      closeOfRef={adaptive}
      onClose={handleModalClose}
      closeButton
      {...props}
    >
      <div className={styles.container}>
        <h2>
          Select payment method
        </h2>
        {currentBanks.map((bank, index) => {
          console.log('currentBank', bank);
          const isBankTransfer = _.get(bank, 'code') === 'BankTransfer';
          return <div className={styles.row} key={index} onClick={() => {
            setSelected(bank);
            handleFormConfirm([bank]);
          }}>
            <div className={styles.field}>
              <b>Method:</b>
              <span>
                {_.get(bank, 'title', bank.code)}
                {isBankTransfer && ` to ${_.get(bank, 'bankName')}`}
              </span>
            </div>
            <div className={styles.field}>
              <b>{bank.type === 'card' ? 'Card number' : 'Account number'}:</b>
              <span>{_.get(bank, 'account')}</span>
            </div>
            <div className={styles.field}>
              <b>Holder:</b>
              <span>{_.get(bank, 'holder')}</span>
            </div>
          </div>
        })}
      </div>
    </CabinetModal>
  }

  return (
    <CabinetModal
      className={styles.setPaymentMethod}
      closeOfRef={adaptive}
      onClose={handleModalClose}
      closeButton
      {...props}
    >
      <div className={styles.container}>
        {selected ? (
          <Form
            payment={selected}
            adaptive={adaptive}
            onCancel={clearSelected}
            onConfirm={handleFormConfirm}
            getFiatsArray={getFiatsArray}
            mode={mode}
            offer={offer}
          />
        ) : (
          <SelectMethod getFiatsArray={getFiatsArray}
                        adaptive={adaptive}
                        banksList={banksList}
                        onSelect={setSelected} />
        )}
      </div>
    </CabinetModal>
  );
}

SetPaymentMethod.propTypes = {
  mode: PropTypes.oneOf(Object.values(p2pMode)),
};

export default SetPaymentMethod;
