import React from 'react';

// Components
import { Row } from 'ui';
import { BottomSheetSelect } from 'dapp/Select';
import SwitchTheMode from '../SwitchTheMode';

// Utils
import KNOWN_FIATS from 'src/index/constants/knownFiats';
import { testRegions, testPayments } from './testItems';

// Styles
import './index.less';

function Filters({ mode }) {
  const fiatsOptions = KNOWN_FIATS.map((fiat) =>
    BottomSheetSelect.option(fiat.symbol, fiat.address, fiat.logoURI)
  );
  const paymentsOptions = testPayments.map((payment, i) =>
    BottomSheetSelect.option(payment.title, i + 1, payment.color)
  );
  const regionsOptions = testRegions.map((region, i) =>
    BottomSheetSelect.option(region.title, i + 1, region.flag)
  );

  const Column = ({ title, content }) => (
    <div className="orders-list-filters-column">
      <div className="orders-list-filters-column__title">{title}</div>
      <div className="orders-list-filters-column__content">{content}</div>
    </div>
  );

  return (
    <div className="orders-list-filters">
      <Row alignItems="stretch">
        <Column
          title="Function selection"
          content={<SwitchTheMode mode={mode} size="small" />}
        />
        <Column
          title="Fiat"
          content={
            <BottomSheetSelect
              options={fiatsOptions}
              value={fiatsOptions[0].value}
              listHeight={215}
              width={131}
              isSearchable
              menuIsOpen
            />
          }
        />
        <Column
          title="Payment"
          content={
            <BottomSheetSelect
              options={paymentsOptions}
              value={paymentsOptions[0].value}
              listHeight={215}
              width={164}
              isSearchable
              menuIsOpen
            />
          }
        />
        <Column
          title="Available Region(s)"
          content={
            <BottomSheetSelect
              options={regionsOptions}
              value={regionsOptions[0].value}
              width={164}
              isSearchable
              menuIsOpen
            />
          }
        />
        <Column
          title="Amount"
          content={<SwitchTheMode mode={mode} size="small" />}
        />
      </Row>
    </div>
  );
}

export default Filters;
