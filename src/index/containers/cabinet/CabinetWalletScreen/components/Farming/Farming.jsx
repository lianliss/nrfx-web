import React from 'react';
import PropTypes from 'prop-types';

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

const sortOptions = [{ value: 'hot', label: 'Sort by Hot' }];

function Farming({ adaptive }) {
  // States
  const [farmsValue, setFarmsValue] = React.useState(farms[0].value);
  const [sortBy, setSortBy] = React.useState(sortOptions[0].value);

  const filters = {
    farmsValue,
    setFarmsValue,
    sortBy,
    setSortBy,
    farms,
    sortOptions,
  };

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
        <FarmingTableAdaptive items={farmingItems} {...filters} />
      ) : (
        <FarmingTable items={farmingItems} {...filters} />
      )}
    </CabinetBlock>
  );
}

Farming.defaultProps = {
  adaptive: false,
};

export default Farming;
