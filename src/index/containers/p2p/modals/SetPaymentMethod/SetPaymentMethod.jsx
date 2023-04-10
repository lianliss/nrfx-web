import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

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

function SetPaymentMethod({ onClose, mode, ...props }) {
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

    openStateModal('p2p_create_order', { mode });
  };

  const handleFormConfirm = () => {
    openStateModal('p2p_create_order', { mode });
  };

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
