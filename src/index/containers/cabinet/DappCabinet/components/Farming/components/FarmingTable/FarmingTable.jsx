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
function FarmingTable({ adaptive, items, pools, ...filters }) {
  const { farmsValue, setFarmsValue, sortBy, setSortBy, farms, sortOptions } =
    filters;
  console.log('pools', pools);

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
          {Object.keys(pools).map((address, index) => {
            const pool = pools[address];
            return (
              <FarmingTableItem
                key={index}
                id={index}
                pool={pool}
                dark={index % 2 ? true : false}
                indicator={pool.indicator}
                apy={0}
                arp={0}
                liquidity={0}
                available={1}
                staked={1}
                earned={1}
              />
            );
          })}
        </Table>
      </div>
    </div>
  );
}

export default FarmingTable;
