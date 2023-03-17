import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Row, Button } from 'ui';
import { BottomSheetSelect } from 'dapp/Select';
import { CustomButton } from 'dapp';
import SwitchTheMode from '../SwitchTheMode';
import ListPayment from '../ListPayment';
import DappInput from 'dapp/DappInput/DappInput';
import SVG from 'utils/svg-wrap';

// Utils
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './index.less';

function Filters({
  mode,
  payments,
  selectedPayment,
  setPayment,
  fiats,
  selectedFiat,
  setFiat,
  regions,
  selectedRegion,
  setRegion,
}) {
  const fiatsOptions = fiats.map((fiat) =>
    BottomSheetSelect.option(fiat.symbol, fiat.symbol, fiat.logoURI)
  );
  const paymentsOptions = payments.map((payment) =>
    BottomSheetSelect.option(
      <ListPayment title={payment.title} color={payment.color} />,
      payment.code,
      null,
      false,
      'div'
    )
  );
  const regionsOptions = regions.map((region) =>
    BottomSheetSelect.option(region.title, region.title, region.flag)
  );

  const Column = ({ title, content }) => (
    <div className="orders-list-filters-column">
      <div className="orders-list-filters-column__title">{title}</div>
      <div className="orders-list-filters-column__content">{content}</div>
    </div>
  );

  const AmountSearch = () => {
    const [value, setValue] = React.useState('5543334');

    return (
      <div className="orders-list-filters-amount">
        <DappInput
          value={value}
          onChange={setValue}
          indicator={selectedFiat}
          type="number"
          inputMode="decimals"
        />
        <Button type="lightBlue">Search</Button>
      </div>
    );
  };

  return (
    <div className="orders-list-filters">
      <Row className="orders-list-filters__columns" alignItems="stretch" wrap>
        <Column
          title="Function selection"
          content={<SwitchTheMode mode={mode} size="small" />}
        />
        <Column
          title="Fiat"
          content={
            <BottomSheetSelect
              options={fiatsOptions}
              value={selectedFiat}
              onChange={setFiat}
              listHeight={215}
              width={131}
              isSearchable
            />
          }
        />
        <Column
          title="Payment"
          content={
            <BottomSheetSelect
              options={paymentsOptions}
              value={selectedPayment}
              onChange={setPayment}
              listHeight={215}
              width={164}
              isSearchable
            />
          }
        />
        <Column
          title="Available Region(s)"
          content={
            <BottomSheetSelect
              options={regionsOptions}
              value={selectedRegion}
              onChange={setRegion}
              width={164}
              isSearchable
            />
          }
        />
        <Column title="Amount" content={<AmountSearch />} />
        <Column
          content={
            <CustomButton className="orders-list-filters-refresh">
              <SVG src={require('src/asset/icons/action/reload.svg')} />
            </CustomButton>
          }
        />
      </Row>
    </div>
  );
}

Filters.propTypes = {
  mode: PropTypes.oneOf(p2pMode),
  payments: PropTypes.array,
  selectedPayment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setPayment: PropTypes.func,
  fiats: PropTypes.array,
  selectedFiat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setFiat: PropTypes.func,
  regions: PropTypes.array,
  selectedRegion: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setRegion: PropTypes.func,
};

Filters.defaultProps = {
  mode: p2pMode.buy,
  payments: [],
  selectedPayment: '',
  setPayment: () => {},
  fiats: [],
  selectedFiat: '',
  setFiat: () => {},
  regions: [],
  selectedRegion: '',
  setRegion: () => {},
};

export default Filters;
