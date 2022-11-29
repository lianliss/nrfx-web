import React from 'react';
import { Web3Context } from 'services/web3Provider';
import wait from 'utils/wait';
import TestnetOverlay from 'src/index/components/dapp/TestnetOverlay/TestnetOverlay';

// Components
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import FarmingTable from './components/FarmingTable/FarmingTable';
import FarmingTableAdaptive from './components/FarmingTableAdaptive/FarmingTableAdaptive';
import LoadingStatus from 'src/index/components/cabinet/LoadingStatus/LoadingStatus';

// Utils
import useAdaptive from 'src/hooks/adaptive';
import { DESKTOP } from 'src/index/constants/breakpoints';
import { getLang } from 'src/utils';
import { openModal } from 'src/actions';

// Styles
import './Farming.less';

const AWAITING_DELAY = 2000;

// Test array
const farmingItems = [
  {
    id: 1,
    currencies: ['usdt', 'btc'],
    apy: 121.2,
    arp: 75.5,
    liquidity: 7000000,
    aviable: [0.005, 15],
    staked: [0.0, 0.0],
    earned: [0.0, 0.0],
    indicator: 'latest',
  },
  {
    id: 2,
    currencies: ['rub', 'nrfx'],
    apy: 70.2,
    arp: 40.5,
    liquidity: 4000000,
    aviable: [0.025, 65],
    staked: [7.0, 4.0],
    earned: [1.0, 4.0],
    indicator: 'hot',
  },
  {
    id: 3,
    currencies: ['rub'],
    apy: 70.2,
    arp: 40.5,
    liquidity: 4000000,
    aviable: [0.025, 65],
    staked: [7.0, 4.0],
    earned: [1.0, 4.0],
    indicator: 'hot',
  },
  {
    id: 4,
    currencies: ['rub', 'nrfx'],
    apy: 70.2,
    arp: 40.5,
    liquidity: 4000000,
    aviable: [0.025, 65],
    staked: [7.0, 4.0],
    earned: [1.0, 4.0],
    indicator: 'hot',
  },
  {
    id: 5,
    currencies: ['rub', 'nrfx'],
    apy: 70.2,
    arp: 40.5,
    liquidity: 4000000,
    aviable: [0.025, 65],
    staked: [7.0, 4.0],
    earned: [1.0, 4.0],
    indicator: 'hot',
  },
  {
    id: 6,
    currencies: ['rub', 'nrfx'],
    apy: 70.2,
    arp: 40.5,
    liquidity: 4000000,
    aviable: [0.025, 65],
    staked: [7.0, 4.0],
    earned: [1.0, 4.0],
    indicator: 'hot',
  },
  {
    id: 7,
    currencies: ['rub', 'nrfx'],
    apy: 70.2,
    arp: 40.5,
    liquidity: 4000000,
    aviable: [0.025, 65],
    staked: [7.0, 4.0],
    earned: [1.0, 4.0],
    indicator: 'hot',
  },
  {
    id: 8,
    currencies: ['rub', 'nrfx'],
    apy: 70.2,
    arp: 40.5,
    liquidity: 4000000,
    aviable: [0.025, 65],
    staked: [7.0, 4.0],
    earned: [1.0, 4.0],
    indicator: 'hot',
  },
  {
    id: 9,
    currencies: ['rub', 'nrfx'],
    apy: 70.2,
    arp: 40.5,
    liquidity: 4000000,
    aviable: [0.025, 65],
    staked: [7.0, 4.0],
    earned: [1.0, 4.0],
    indicator: 'hot',
  },
];

function Farming() {
  // Constants
  const farms = [
    { value: 'all_farms', label: getLang('dapp_farming_all_farms') },
    { value: 'my_farms', label: getLang('dapp_farming_my_farms') },
  ];
  
  const sortOptions = [
    { value: 'hot', label: getLang('dapp_sort_by_hot') },
    { value: 'liquidity', label: getLang('dapp_sort_by_liquidity') },
    { value: 'apr', label: getLang('dapp_sort_by_apr') },
    { value: 'newest', label: getLang('dapp_sort_by_newest') },
  ];

  // States
  const context = React.useContext(Web3Context);
  const {
    getFarmContract,
    chainId,
    isConnected,
    connectWallet,
    updatePoolsList,
    pools,
    switchToChain,
  } = context;
  const [farmsValue, setFarmsValue] = React.useState(farms[0].value);
  const [sortBy, setSortBy] = React.useState(sortOptions[0].value);
  const [requestedChain, setRequestedChain] = React.useState(null);
  const adaptive = useAdaptive(DESKTOP);

  const filters = {
    farmsValue,
    setFarmsValue,
    sortBy,
    setSortBy,
    farms,
    sortOptions,
  };

  React.useEffect(() => {
    if (!isConnected) return;
    // if (chainId !== 97 && requestedChain !== 97) {
    //   setRequestedChain(97);
    //   console.log('[Farming][switchToChain]', 97);
    //   switchToChain(97).then(() => {
    //     setRequestedChain(null);
    //   });
    // }
    if (chainId === 97) {
      updatePoolsList().catch((error) => {
        console.error('[Farming][getPoolsList]', error);
      });
    }
  }, [chainId, isConnected]);

  React.useEffect(() => {
    if (!isConnected) {
      openModal('connect_to_wallet');
    }
  }, [isConnected]);

  const TableComponent = adaptive ? FarmingTableAdaptive : FarmingTable;

  return (
    <CabinetBlock className="Farming">
      <div className="Farming__header">
        <div className="row">
          <h1>{getLang('dapp_farming_page_title')}</h1>
        </div>
        <div className="row">
          <p>
            {getLang('dapp_farming_page_subtitle')}
          </p>
        </div>
      </div>
      {isConnected && pools ? (
        <TableComponent
          items={farmingItems}
          {...{
            pools,
          }}
          {...filters}
        />
      ) : (
        <LoadingStatus status={'loading'} />
      )}
      <TestnetOverlay testnetOnly networks={[97]} />
    </CabinetBlock>
  );
}

export default Farming;
