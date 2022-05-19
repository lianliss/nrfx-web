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
import { FarmingPopup } from '../FarmingPopup/FarmingPopup';
import { openModal } from 'src/actions';
import FarmingTableHeader from '../FarmingTableHeader/FarmingTableHeader';
import FarmingTableBodyAdaptive from '../FarmingTableBodyAdaptive/FarmingTableBodyAdaptive';

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
function FarmingTable({ adaptive }) {
  // States
  const [headerTabsValue, setHeaderTabsValue] = React.useState(
    headerTabs[0].value
  );
  const [sortBy, setSortBy] = React.useState(sortOptions[0].value);

  // Test popups display
  const [unstaked, setUnstake] = React.useState({
    visible: false,
    currency: '',
    amount: 0,
  });

  const [hadrwest, setHardwest] = React.useState({
    visible: false,
    currency: 'nrfx',
    amount: 0,
  });

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
      <FarmingTableHeader
        headerTabs={headerTabs}
        headerTabsValue={headerTabsValue}
        setHeaderTabsValue={setHeaderTabsValue}
        sortOptions={sortOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      {adaptive ? (
        <FarmingTableBodyAdaptive />
      ) : (
        <div className="FarmingTable__body">
          <Table
            headings={[
              <TableColumn sub="Tag" />,
              <TableColumn sub="Pool" />,
              <TableColumn sub="APY" />,
              <TableColumn sub="ARP" />,
              <TableColumn sub="Liquidity" />,
              <TableColumn sub="Earned" />,
              <TableColumn />,
              <TableColumn />,
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
                  onUnstake={(currency, amount) => {
                    // Test display
                    setUnstake({
                      visible: true,
                      currency,
                      amount,
                    });
                  }}
                  onHardwest={(currency, amount) => {
                    // Test display
                    setHardwest({
                      visible: true,
                      currency,
                      amount,
                    });
                  }}
                />
              );
            })}
          </Table>
        </div>
      )}
      {/*Test popups display*/}
      {unstaked.visible && (
        <FarmingPopup
          title="Unstaked"
          currency={unstaked.currency}
          number={unstaked.amount}
          onClose={() => setUnstake((prev) => ({ ...prev, visible: false }))}
        />
      )}
      {hadrwest.visible && (
        <FarmingPopup
          title="Hadrwest"
          currency={hadrwest.currency}
          number={hadrwest.amount}
          onClose={() => setHardwest((prev) => ({ ...prev, visible: false }))}
        />
      )}
    </div>
  );
}

export default FarmingTable;
