import React from 'react';

// Components
import AdaptiveList from '../AdaptiveList';
import List from '../List';
import SVG from 'utils/svg-wrap';
import { CabinetBlock, CustomButton } from 'dapp';
import Filters from '../Filters';
import AdaptiveFilters from '../AdaptiveFilters';

// Utils
import useAdaptive from 'src/hooks/adaptive';
import { testRegions, testPayments } from '../Filters/testItems';
import KNOWN_FIATS from 'src/index/constants/knownFiats';

// Styles
import './index.less';

function ListWrapper({ adaptive, ...props }) {
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
    <AdaptiveList {...props} />
  ) : (
    <List {...props} />
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

  const PaginationNumber = ({ number }) => (
    <CustomButton className="orders-list-pagination__number">
      {number}
    </CustomButton>
  );

  return (
    <CabinetBlock
      className={`orders-list__wrapper ${isSmallDesktop ? 'adaptive' : ''}`}
    >
      {filtersComponent}
      {listComponent}
      <div className="orders-list-pagination">
        <CustomButton className="orders-list-pagination__prev">
          <SVG
            src={require('src/asset/icons/arrows/arrow-pagination-left.svg')}
            flex
          />
        </CustomButton>
        <PaginationNumber number={1} />
        <PaginationNumber number={2} />
        <PaginationNumber number={3} />
        <div className="orders-list-pagination__skip">...</div>
        <PaginationNumber number={42} />
        <CustomButton className="orders-list-pagination__next">
          <SVG
            src={require('src/asset/icons/arrows/arrow-pagination-right.svg')}
            flex
          />
        </CustomButton>
      </div>
    </CabinetBlock>
  );
}

export default ListWrapper;
