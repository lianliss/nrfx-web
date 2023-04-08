import React from 'react';

// Components
import { DappInput } from 'dapp';

// Utils
import { classNames as cn } from 'utils';

// Styles
import styles from './FormInput.module.less';

function FormInput({ label, className, ...props }) {
  return (
    <div className={cn(styles.formInput, className)}>
      {label && <p className={styles.label}>{label}</p>}
      <DappInput className={styles.input} {...props} />
    </div>
  );
}

export default FormInput;
