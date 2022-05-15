import React from 'react';

// Components
import {
  SwitchTabs,
  Search,
  Table,
  TableCell,
  TableColumn,
  Button,
} from 'src/ui';
import Select from 'src/index/components/cabinet/Select/Select';
import FarmingTableItem from '../FarmingTableItem/FarmingTableItem';
import {
  FarmingPopupStaked,
  FarmingPopupUnstaked,
} from '../FarmingPopup/FarmingPopup';
import { openModal } from 'src/actions';

// Styles
import './FarmingTable.less';

// Constants
// --Tabs array for component <SwitchTabs />
const headerTabs = [
  { value: 'all_farms', label: 'All Farms' },
  { value: 'my_farms', label: 'My Farms' },
];

const sortOptions = [{ value: 'hot', label: 'Sort by Hot' }];

// Main
function FarmingTable() {
  // States
  const [headerTabsValue, setHeaderTabsValue] = React.useState(
    headerTabs[0].value
  );
  const [sortBy, setSortBy] = React.useState(sortOptions[0].value);

  // Test array
  // When integrating, transfer to props items.
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
  ];

  // Handlers
  const onStake = (id, currency) => {
    // Open stake modal
    openModal('stake', {}, { id, currency });
  };

  // Open ROI Modal
  const openRoi = () => {
    openModal('farming_roi');
  };

  return (
    <div className="FarmingTable">
      <div className="FarmingTable__header">
        <SwitchTabs
          selected={headerTabsValue}
          onChange={setHeaderTabsValue}
          tabs={headerTabs}
          type="light-blue"
        />
        <Select value={sortBy} onChange={setSortBy} options={sortOptions} />
        <Search placeholder="Search" lite simple icon right />
      </div>
      <div className="FarmingTable__body">
        <Table
          headings={[
            <TableColumn sub="Tag" />,
            <TableColumn sub="Pool" />,
            <TableColumn sub="APY" />,
            <TableColumn sub="ARP" />,
            <TableColumn sub="Liquidity" />,
            <TableColumn sub="Earned" />,
          ]}
          className="FarmingTable__table"
        >
          {farmingItems.map((item, index) => {
            return (
              <FarmingTableItem
                key={item.id}
                id={item.id}
                dark={index % 2 ? true : false}
                indicator={item.indicator}
                currencies={item.currencies}
                apy={item.apy}
                arp={item.arp}
                liquidity={item.liquidity}
                aviable={item.aviable}
                staked={item.staked}
                earned={item.earned}
                onStake={onStake}
                openRoi={openRoi}
              />
            );
          })}
        </Table>
      </div>
      {/*Popups Staked & Unstaked*/}
      {/*<FarmingPopupStaked currency={'bnb'} number={0.15} />*/}
      {/*<FarmingPopupUnstaked currency={'bnb'} number={0.15} />*/}
    </div>
  );
}

export default FarmingTable;
