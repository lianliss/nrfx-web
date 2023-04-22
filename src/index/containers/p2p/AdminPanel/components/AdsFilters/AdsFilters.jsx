import React from 'react';

import { BottomSheetSelect, ButtonsSelect } from 'dapp/Select';
import { CustomButton, AdaptiveTop } from 'dapp';
import { Row, Col, Button } from 'ui';
import SVG from 'utils/svg-wrap';

import { classNames as cn, ucfirst } from 'utils';
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

const AdsFilters = ({ adaptive }) => {
  // States
  const [isModal, setIsModal] = React.useState(false);

  // Constants
  const fiatsOptions = KNOWN_FIATS.map((fiat) =>
    BottomSheetSelect.option(ucfirst(fiat.symbol), fiat.symbol, fiat.logoURI)
  );
  const typesOptions = Object.values(p2pMode).map((mode) =>
    BottomSheetSelect.option(ucfirst(mode), mode)
  );
  const statusesOptions = Object.values(orderAdStatuses).map((status) =>
    BottomSheetSelect.option(ucfirst(status), status)
  );

  // Design
  const buttonSize = adaptive ? 'big' : 'moderate';

  const renderBody = () => (
    <Row
      className={styles.AdsFilters}
      alignItems="flex-end"
      gap={adaptive ? 20 : 11}
      wrap
    >
      {adaptive ? (
        <ButtonsSelect
          title="Asset/Fiat"
          options={fiatsOptions}
          className={styles.ButtonsSelect}
        />
      ) : (
        <Column
          title="Asset/Fiat"
          content={<SelectComponent options={fiatsOptions} />}
          isSelect
        />
      )}
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
      <Row gap={adaptive ? 15 : 11} wrap className={styles.AdsFilters__buttons}>
        {adaptive ? (
          <Button type="lightBlue" size={buttonSize}>
            <span>Search</span>
          </Button>
        ) : (
          <Button type="lightBlue" size={buttonSize}>
            <span>Filter</span>
          </Button>
        )}
        <Button type="secondary-light--light-blue" size={buttonSize}>
          <span>Reset</span>
        </Button>
        {!adaptive && (
          <CustomButton>
            <span className="light-blue-gradient-color">Ad History</span>
          </CustomButton>
        )}
      </Row>
    </Row>
  );

  if (adaptive) {
    return (
      <div className={styles.AdsFilters__wrapper}>
        <Row className={styles.AdsFilters__closedFilters} alignItems="center">
          <CustomButton>Ad history</CustomButton>
          <CustomButton onClick={() => setIsModal(true)}>
            Filter
            <SVG
              src={require('src/asset/icons/action/filter.svg')}
              style={{ marginLeft: 3 }}
              flex
            />
          </CustomButton>
          <CustomButton>
            Refresh
            <SVG
              src={require('src/asset/icons/action/reload-gray.svg')}
              style={{ marginLeft: 3 }}
              flex
            />
          </CustomButton>
        </Row>
        {isModal && (
          <AdaptiveTop title="Filter" onClose={() => setIsModal(false)}>
            {renderBody()}
          </AdaptiveTop>
        )}
      </div>
    );
  }

  return renderBody();
};

export default AdsFilters;
