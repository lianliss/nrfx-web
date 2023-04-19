import React from 'react';

import { BottomSheetSelect } from 'dapp/Select';
import { CustomButton } from 'dapp';
import { Row, Col, Button } from 'ui';
import SVG from 'utils/svg-wrap';

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
    classNames={{
      control: () => styles.Select__control,
    }}
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
    <Row className={styles.AdsFilters} alignItems="flex-end" gap={11} wrap>
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
            <span>2022-12-08</span>
            <span>—</span>
            <span>2022-12-08</span>
            <SVG src={require('src/asset/icons/cabinet/calendar.svg')} />
          </div>
        }
      />
      <Button type="lightBlue">
        <span>Filter</span>
      </Button>
      <Button type="secondary-light--light-blue">
        <span>Reset</span>
      </Button>
      <CustomButton>
        <span className="light-blue-gradient-color">Ad History</span>
      </CustomButton>
    </Row>
  );
};

export default AdsFilters;
