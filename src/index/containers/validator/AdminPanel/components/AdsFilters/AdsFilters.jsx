import React from 'react';

import { BottomSheetSelect } from 'dapp/Select';
import { Row, Col } from 'ui';

import { classNames as cn } from 'utils';
import KNOWN_FIATS from 'src/index/constants/knownFiats';
import { p2pMode, orderAdStatuses } from 'src/index/constants/dapp/types';

import styles from './AdsFilters.module.less';

const Column = ({ title, content, isSelect }) => (
  <Col className={cn(styles.Column, { [styles.Column__isSelect]: isSelect })}>
    <span className={styles.Column__title}>{title}</span>
    <div className={styles.Column__content}>{content}</div>
  </Col>
);

const SelectComponent = ({ value, onChange, options }) => (
  <BottomSheetSelect
    value={value}
    options={options}
    onChange={onChange}
    listHeight={215}
    width="100%"
    className={styles.Select}
  />
);

const AdsFilters = () => {
  const fiatsOptions = KNOWN_FIATS.map((fiat) =>
    BottomSheetSelect.option(fiat.symbol, fiat.symbol, fiat.logoURI)
  );
  const typesOptions = Object.values(p2pMode).map((mode) =>
    BottomSheetSelect.option(mode, mode)
  );
  const statusesOptions = Object.values(orderAdStatuses).map((status) =>
    BottomSheetSelect.option(status, status)
  );

  return (
    <Row className={styles.AdsFilters} gap={11}>
      <Column
        title="Asset/Fiat"
        content={<SelectComponent options={fiatsOptions} />}
        isSelect
      />
      <Column
        title="Type"
        content={<SelectComponent options={typesOptions} />}
        isSelect
      />
      <Column
        title="Status"
        content={<SelectComponent options={statusesOptions} />}
        isSelect
      />
      <Column
        title="Created time"
        content={
          <div className={styles.DatePicker}>
            <div></div>
          </div>
        }
      />
    </Row>
  );
};

export default AdsFilters;
