import React from 'react';
import PropTypes from 'prop-types';

// Components
import SwitchTheMode from '../SwitchTheMode';
import { Row } from 'ui';
import { CustomButton, WalletIcon, AdaptiveTop, DappInput } from 'dapp';
import SVG from 'utils/svg-wrap';
import { ButtonsSelect } from 'dapp/Select';
import BottomSheetSelect from 'dapp/Select/containers/BottomSheet';

// Utils
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './index.less';

function AdaptiveFilters({
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
  amount,
  setAmount,
  updateList,
}) {
  const [filtersModal, setFiltersModal] = React.useState(false);
  const [fiatsModal, setFiatsModal] = React.useState(false);
  const paymentsOptions = payments.map((payment) => ({
    label: payment.title,
    value: payment.code,
  }));
  const fiatsOptions = fiats.map((fiat) => ({
    label: fiat.symbol,
    value: fiat,
    icon: fiat.logoURI,
  }));
  const [value, setValue] = React.useState(amount);
  const regionsOptions = regions.map((region) =>
    BottomSheetSelect.option(region.title, region.title, region.flag)
  );

  const handleOpenFiltersModal = () => {
    setFiltersModal(true);
  };

  const handleCloseFiltersModal = () => {
    setFiltersModal(false);
    setAmount(value);
    updateList();
  };
  console.log('amount', amount);

  const handleOpenFiatsModal = () => {
    setFiatsModal(true);
  };

  const handleCloseFiatsModal = () => {
    setFiatsModal(false);
  };
  
  const updateAmount = () => {
    setAmount(value);
    updateList();
  };

  return (
    <div className="orders-list-filters--adaptive">
      <SwitchTheMode mode={mode} size="small" />
      <Row
        className="orders-list-filters--adaptive-content"
        alignItems="center"
      >
        <CustomButton onClick={handleOpenFiatsModal}>
          <WalletIcon currency={selectedFiat} size={16.9} />
          {selectedFiat.symbol}
          <SVG
            src={require('src/asset/icons/arrows/form-dropdown.svg')}
            className="dark-dropdown-icon"
            style={{ marginLeft: 5 }}
            flex
          />
        </CustomButton>
        <CustomButton onClick={handleOpenFiltersModal}>
          Filter
          <SVG
            src={require('src/asset/icons/action/filter.svg')}
            style={{ marginLeft: 3 }}
            flex
          />
        </CustomButton>
        <CustomButton onClick={updateList}>
          Refresh
          <SVG
            src={require('src/asset/icons/action/reload-gray.svg')}
            style={{ marginLeft: 3 }}
            flex
          />
        </CustomButton>
      </Row>
      {fiatsModal && (
        <AdaptiveTop title="Select fiat" onClose={handleCloseFiatsModal}>
          <ButtonsSelect
            options={fiatsOptions}
            value={selectedFiat}
            onChange={fiat => {
              setFiat(fiat);
            }}
            title="Fiat"
            initDisplayNumber={12}
          />
        </AdaptiveTop>
      )}
      {filtersModal && (
        <AdaptiveTop title="Filter" onClose={handleCloseFiltersModal}>
          <div>
            <AdaptiveTop.title title="Amount" />
            <DappInput
              placeholder="Enter amount"
              indicator={selectedFiat.symbol}
              inputMode="decimals"
              type="number"
              value={value}
              onChange={setValue}
              onEnter={updateAmount}
            />
          </div>
          <ButtonsSelect
            options={paymentsOptions}
            value={selectedPayment}
            onChange={setPayment}
            title="Payment"
            highlightedOptions={[0]}
          />
          <ButtonsSelect
            options={fiatsOptions}
            value={selectedFiat}
            onChange={setFiat}
            title="Fiat"
            initDisplayNumber={6}
          />
        </AdaptiveTop>
      )}
    </div>
  );
}

AdaptiveFilters.propTypes = {
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

AdaptiveFilters.defaultProps = {
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

export default AdaptiveFilters;
