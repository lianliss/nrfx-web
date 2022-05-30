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
import FarmingTableBodyAdaptive from '../FarmingTableAdaptive/FarmingTableAdaptive';

// Styles
import './FarmingTable.less';

// Main
function FarmingTable({ adaptive, items, ...filters }) {
  const { farmsValue, setFarmsValue, sortBy, setSortBy, farms, sortOptions } =
    filters;

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
        farms={farms}
        farmsValue={farmsValue}
        setFarmsValue={setFarmsValue}
        sortOptions={sortOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
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
          {items.map((item, index) => {
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
