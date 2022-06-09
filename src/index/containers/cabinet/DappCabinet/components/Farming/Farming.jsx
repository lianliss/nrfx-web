import React from 'react';
import { Web3Context } from 'services/web3Provider';

// Components
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import FarmingTable from './components/FarmingTable/FarmingTable';
import FarmingTableAdaptive from './components/FarmingTableAdaptive/FarmingTableAdaptive';

// Styles
import './Farming.less';

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

// Constants
const farms = [
  { value: 'all_farms', label: 'All Farms' },
  { value: 'my_farms', label: 'My Farms' },
];

const sortOptions = [
  { value: 'hot', label: 'Sort by Hot' },
  { value: 'liquidity', label: 'Sort by Liquidity' },
  { value: 'apr', label: 'Sort by APR' },
  { value: 'newest', label: 'Sort by Newest' },
];

function Farming({ adaptive }) {
  // States
  const context = React.useContext(Web3Context);
  const {farm, chainId, isConnected} = context;
  const [farmsValue, setFarmsValue] = React.useState(farms[0].value);
  const [sortBy, setSortBy] = React.useState(sortOptions[0].value);
  const [pools, setPools] = React.useState([]);

  const filters = {
    farmsValue,
    setFarmsValue,
    sortBy,
    setSortBy,
    farms,
    sortOptions,
  };

  React.useEffect(() => {
    const updatePool = async () => {
      const pools = await farm.getPoolsList();
      setPools(pools);
      const data = await Promise.all(Object.keys(pools).map(address => farm.getPoolData(pools[address])));
      const poolsWithData = {};
      data.map((pool, index) => {
        poolsWithData[pool.address] = data[index];
      });
      setPools(poolsWithData);
    };
    updatePool().catch(error => {
      console.error('[Farming][getPoolsList]', error);
    });
  }, [chainId, isConnected]);

  return (
    <CabinetBlock className="Farming">
      <div className="Farming__header">
        <div className="row">
          <h1>Farming</h1>
        </div>
        <div className="row">
          <p>
            Earn fees and rewards by depositing and staking your tokens to the
            platform.
          </p>
        </div>
      </div>
      {adaptive ? (
        <FarmingTableAdaptive items={farmingItems} pools={pools} {...filters} />
      ) : (
        <FarmingTable items={farmingItems} pools={pools} {...filters} />
      )}
    </CabinetBlock>
  );
}

Farming.defaultProps = {
  adaptive: false,
};

export default Farming;
