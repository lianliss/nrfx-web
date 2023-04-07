import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { CabinetModal } from 'dapp';
import { SelectMethod } from './components';

// Utils
import { adaptiveSelector } from 'src/selectors';

// Styles
import styles from './SetPaymentMethod.module.less';

function SetPaymentMethod(props) {
  const adaptive = useSelector(adaptiveSelector);
  const selected = null;

  return (
    <CabinetModal
      className={styles.setPaymentMethod}
      closeOfRef={adaptive}
      closeButton
      {...props}
    >
      <div className={styles.container}>
        <SelectMethod adaptive={adaptive} />
      </div>
    </CabinetModal>
  );
}

export default SetPaymentMethod;
