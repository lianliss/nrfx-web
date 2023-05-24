import React from 'react';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
import wait from 'utils/wait';
import _ from 'lodash';

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

const banksByCurrency = {};
const zeroBank = {
  code: null,
  title: 'All payments',
};

function ListWrapper({ adaptive, onOrderCreate, ...props }) {
  const context = React.useContext(Web3Context);
  const {
    isConnected,
    accountAddress,
    chainId,
    getFiatsArray,
    getWeb3,
    network,
    getBSCScanLink,
    getTransactionReceipt,
    transaction,
    backendRequest,
  } = context;
  const {
    mode,
  } = props;
  const isSmallDesktop = useAdaptive(1299, false);
  const [banksList, setBanksList] = React.useState([zeroBank]);
  const [offersList, setOffersList] = React.useState([]);
  const [selectedPayment, setSelectedPayment] = React.useState(zeroBank);
  const [selectedRegion, setSelectedRegion] = React.useState(
    testRegions[0].title
  );
  const [amount, setAmount] = React.useState(0);
  const [selectedFiat, setSelectedFiat] = React.useState(_.get(getFiatsArray(), '[0]'));
  React.useEffect(() => {
    setSelectedFiat(_.get(getFiatsArray(), '[0]'));
  }, [chainId, isConnected]);
  React.useEffect(() => {
    if (banksByCurrency[selectedFiat.symbol]) {
      setBanksList([zeroBank, ...banksByCurrency[selectedFiat.symbol]]);
      setSelectedPayment(zeroBank);
      console.log('banksByCurrency', banksByCurrency, selectedFiat.symbol);
    } else {
      if (!isConnected) return;
      backendRequest({
        currency: selectedFiat.symbol,
      }, ``, 'offers/banks', 'get').then(data => {
        console.log('BANKS', data);
        setBanksList([zeroBank, ...data]);
        setSelectedPayment(zeroBank);
        banksByCurrency[selectedFiat.symbol] = data;
      }).catch(error => {
        console.error('[getBanks]', error);
      })
    }
  }, [selectedFiat, isConnected, chainId]);
  
  const updateList = async () => {
    if (!isConnected) return;
    const params = {
      currency: selectedFiat.address,
      side: mode,
    };
    if (selectedPayment.code) {
      params.bank = selectedPayment.code;
    }
    if (amount) {
      params.amount = amount;
    }
    const list = await backendRequest(params, ``, 'offers', 'get');
    console.log('OFFERS LIST', list);
    setOffersList(list.map(offer => {
      let settings;
      try {
        settings = JSON.parse(offer.settings);
      } catch (error) {
        settings = {};
      }
      return {
        ...offer,
        settings,
        fiat: selectedFiat,
      }
    }));
  };
  React.useEffect(() => {
    updateList();
  }, [selectedFiat, selectedPayment, amount, chainId, isConnected, mode]);
  
  const handlePaymentChange = (value) => {
    setSelectedPayment(value);
    updateList();
  };
  
  const handleRegionChange = (value) => {
    setSelectedRegion(value);
    updateList();
  };
  
  const handleFiatChange = (value) => {
    setSelectedFiat(value);
    updateList();
  };

  const listProps = {
    mode,
    selectedPayment,
    selectedFiat,
    amount,
    offersList,
    onOrderCreate,
    banksList,
    ...props,
  };
  const listComponent = isSmallDesktop ? (
    <AdaptiveList {...listProps} />
  ) : (
    <List {...listProps} />
  );
  
  const filterProps = {
    mode,
    payments: banksList,
    selectedPayment,
    setPayment: handlePaymentChange,
    selectedFiat,
    fiats: getFiatsArray(),
    setFiat: handleFiatChange,
    regions: testRegions,
    selectedRegion,
    setRegion: handleRegionChange,
    amount,
    setAmount,
    updateList,
  };
  const filtersComponent = adaptive ? (
    <AdaptiveFilters
      {...filterProps}
    />
  ) : (
    <Filters
      {...filterProps}
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
