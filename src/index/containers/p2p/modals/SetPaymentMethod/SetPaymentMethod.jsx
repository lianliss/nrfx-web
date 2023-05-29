import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

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

function SetPaymentMethod({ onClose, mode, banks, banksList, offer, amount, fiatAmount, ...props }) {
  if (!mode) {
    onClose();
    return <></>;
  }

  const dispatch = useDispatch();
  const adaptive = useSelector(adaptiveSelector);
  const selected = useSelector(dappP2PPaymentSelector(mode));

  const clearSelected = () => {
    dispatch(setP2PPayment(mode, null));
  };

  const handleSelect = (newPayment) => {
    dispatch(setP2PPayment(mode, newPayment));
  };

  const handleModalClose = () => {
    if (selected) {
      clearSelected();
      return;
    }

    openStateModal('p2p_create_order', { mode, banks, banksList, offer, initialAmount: amount, initialFiatAmount: fiatAmount });
  };

  const handleFormConfirm = () => {
    openStateModal('p2p_create_order', { mode, banks, banksList, offer, initialAmount: amount, initialFiatAmount: fiatAmount });
  };
  
  if (mode === 'buy' && banks) {
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
        {banks.filter(b => !!b).map((bank, index) => {
          return <div className={styles.row} key={index} onClick={() => {
            handleSelect(bank);
            handleFormConfirm();
          }}>
            <div className={styles.field}>
              <b>Method:</b>
              <span>{_.get(bank, 'title')}</span>
            </div>
            <div className={styles.field}>
              <b>{bank.title === 'card' ? 'Card number' : 'Account number'}:</b>
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
            mode={mode}
          />
        ) : (
          <SelectMethod adaptive={adaptive} onSelect={handleSelect} />
        )}
      </div>
    </CabinetModal>
  );
}

SetPaymentMethod.propTypes = {
  mode: PropTypes.oneOf(Object.values(p2pMode)),
};

export default SetPaymentMethod;
