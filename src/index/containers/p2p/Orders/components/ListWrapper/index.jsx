import React from 'react';

// Components
import AdaptiveList from '../AdaptiveList';
import List from '../List';
import { CabinetBlock } from 'dapp';
import Filters from '../Filters';
import AdaptiveFilters from '../AdaptiveFilters';
import { Pagination } from 'src/index/components/p2p/components/UI';

// Utils
import useAdaptive from 'src/hooks/adaptive';
import { testRegions, testPayments } from '../Filters/testItems';
import KNOWN_FIATS from 'src/index/constants/knownFiats';

// Styles
import './index.less';

function ListWrapper({ adaptive, onOrderCreate, ...props }) {
  const isSmallDesktop = useAdaptive(1299, false);
  const [selectedPayment, setSelectedPayment] = React.useState(
    testPayments[0].code
  );
  const [selectedRegion, setSelectedRegion] = React.useState(
    testRegions[0].title
  );
  const [selectedFiat, setSelectedFiat] = React.useState(KNOWN_FIATS[0].symbol);

  const handlePaymentChange = (value) => {
    setSelectedPayment(value);
  };

  const handleRegionChange = (value) => {
    setSelectedRegion(value);
  };

  const handleFiatChange = (value) => {
    setSelectedFiat(value);
  };

  const listComponent = isSmallDesktop ? (
    <AdaptiveList {...props} onOrderCreate={onOrderCreate} />
  ) : (
    <List {...props} onOrderCreate={onOrderCreate} />
  );
  const filtersComponent = adaptive ? (
    <AdaptiveFilters
      mode={props.mode}
      payments={testPayments}
      selectedPayment={selectedPayment}
      setPayment={handlePaymentChange}
      selectedFiat={selectedFiat}
      fiats={KNOWN_FIATS}
      setFiat={handleFiatChange}
      regions={testRegions}
      selectedRegion={selectedRegion}
      setRegion={handleRegionChange}
    />
  ) : (
    <Filters
      mode={props.mode}
      payments={testPayments}
      selectedPayment={selectedPayment}
      setPayment={handlePaymentChange}
      selectedFiat={selectedFiat}
      fiats={KNOWN_FIATS}
      setFiat={handleFiatChange}
      regions={testRegions}
      selectedRegion={selectedRegion}
      setRegion={handleRegionChange}
    />
  );

  return (
    <CabinetBlock
      className={`orders-list__wrapper ${isSmallDesktop ? 'adaptive' : ''}`}
    >
      {filtersComponent}
      {listComponent}
      <Pagination />
    </CabinetBlock>
  );
}

export default ListWrapper;
