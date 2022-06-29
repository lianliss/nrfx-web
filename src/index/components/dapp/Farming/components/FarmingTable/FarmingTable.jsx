import React from 'react';
import { Web3Context } from 'services/web3Provider';

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
function FarmingTable({
                        ...filters }) {
  const { farmsValue, setFarmsValue, sortBy, setSortBy, farms, sortOptions } =
    filters;
  const context = React.useContext(Web3Context);
  const {pools} = context;

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
            <TableColumn sub="APR" />,
            <TableColumn sub="Liquidity" />,
            <TableColumn sub="Earned" />,
            <TableColumn />,
            <TableColumn />,
          ]}
          className="FarmingTable__table"
        >
          {!!pools && Object.keys(pools).map((address, index) => {
            const pool = pools[address];
            return (
              <FarmingTableItem
                key={index}
                id={index}
                pool={pool}
                dark={index % 2 ? true : false}
              />
            );
          })}
        </Table>
      </div>
    </div>
  );
}

export default FarmingTable;