import React from 'react';

// Components
import SwitchTheMode from '../SwitchTheMode';
import { Row } from 'ui';
import { CustomButton, WalletIcon, AdaptiveTop, DappInput } from 'dapp';
import SVG from 'utils/svg-wrap';
import { ButtonsSelect } from 'dapp/Select';

// Utils

// Styles
import './index.less';

const paymentsExample = [
  { label: 'All', value: 0 },
  { label: 'Monobank', value: 1 },
  { label: 'Privat Bank (Universal Card)', value: 2 },
  { label: 'PUMB', value: 3 },
  { label: 'A-Bank', value: 4 },
  { label: 'Izibank', value: 5 },
  { label: 'All', value: 6 },
  { label: 'Monobank', value: 7 },
  { label: 'Privat Bank (Universal Card)', value: 8 },
  { label: 'PUMB', value: 9 },
  { label: 'A-Bank', value: 10 },
  { label: 'Izibank', value: 11 },
];

function AdaptiveFilters({ mode }) {
  const [modal, setModal] = React.useState(true);
  const [selectedPayment, setSelectedPayment] = React.useState(
    paymentsExample[0].value
  );

  return (
    <div className="orders-list-filters--adaptive">
      <SwitchTheMode mode={mode} size="small" />
      <Row
        className="orders-list-filters--adaptive-content"
        alignItems="center"
      >
        <CustomButton>
          <WalletIcon currency="IDR" size={16.9} />
          IDR
          <SVG
            src={require('src/asset/icons/arrows/form-dropdown.svg')}
            className="dark-dropdown-icon"
            style={{ marginLeft: 5 }}
            flex
          />
        </CustomButton>
        <CustomButton onClick={() => setModal(true)}>
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
      {modal && (
        <AdaptiveTop title="Filter" onClose={() => setModal(false)}>
          <div>
            <AdaptiveTop.title title="Amount" />
            <DappInput placeholder="Enter amount" indicator="IDR" />
          </div>
          <ButtonsSelect
            value={selectedPayment}
            onChange={(value) => setSelectedPayment(value)}
            title="Payment"
            options={paymentsExample}
          />
        </AdaptiveTop>
      )}
    </div>
  );
}

export default AdaptiveFilters;
