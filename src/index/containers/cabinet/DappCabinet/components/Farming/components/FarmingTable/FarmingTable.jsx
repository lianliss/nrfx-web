import React from 'react';

// Components
import {
  Table,
  TableColumn,
} from 'src/ui';
import FarmingTableItem from '../FarmingTableItem/FarmingTableItem';
import FarmingTableHeader from '../FarmingTableHeader/FarmingTableHeader';

// Styles
import './FarmingTable.less';

// Main
function FarmingTable({ adaptive, items, ...filters }) {
  const { farmsValue, setFarmsValue, sortBy, setSortBy, farms, sortOptions } =
    filters;

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
              />
            );
          })}
        </Table>
      </div>
    </div>
  );
}

export default FarmingTable;
