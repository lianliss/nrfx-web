import React from 'react';

import { CustomButton } from 'dapp';
import SVG from 'utils/svg-wrap';

import styles from './Pagination.module.less';

const Pagination = (props) => {
  const NumberButton = ({ number }) => (
    <CustomButton className={styles.NumberButton}>{number}</CustomButton>
  );

  return (
    <div className={styles.Pagination} {...props}>
      <CustomButton className={styles.Pagination__prev}>
        <SVG
          src={require('src/asset/icons/arrows/arrow-pagination-left.svg')}
          flex
        />
      </CustomButton>
      <NumberButton number={1} />
      <NumberButton number={2} />
      <NumberButton number={3} />
      <div className={styles.Pagination__skip}>...</div>
      <NumberButton number={42} />
      <CustomButton className={styles.Pagination__next}>
        <SVG
          src={require('src/asset/icons/arrows/arrow-pagination-right.svg')}
          flex
        />
      </CustomButton>
    </div>
  );
};

export default Pagination;
