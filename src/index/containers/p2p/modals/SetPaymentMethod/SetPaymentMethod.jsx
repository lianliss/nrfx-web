import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { CabinetModal } from 'dapp';
import { SelectMethod, Form } from './components';

// Utils
import { adaptiveSelector } from 'src/selectors';

// Styles
import styles from './SetPaymentMethod.module.less';

function SetPaymentMethod({ onClose, ...props }) {
  const adaptive = useSelector(adaptiveSelector);
  const [selected, setSelected] = React.useState(null);

  const clearSelected = () => {
    setSelected(null);
  };

  return (
    <CabinetModal
      className={styles.setPaymentMethod}
      closeOfRef={adaptive}
      closeButton
      onClose={selected ? clearSelected : onClose}
      {...props}
    >
      <div className={styles.container}>
        {selected ? (
          <Form
            payment={selected}
            adaptive={adaptive}
            onCancel={clearSelected}
          />
        ) : (
          <SelectMethod adaptive={adaptive} onSelect={setSelected} />
        )}
      </div>
    </CabinetModal>
  );
}

export default SetPaymentMethod;
