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

// Styles
import './FarmingTable.less';

// Constants
// --Tabs array for component <SwitchTabs />
const headerTabs = [
  { value: 'all_farms', label: 'All Farms' },
  { value: 'my_farms', label: 'My Farms' },
];

const sortOptions = [{ value: 'hot', label: 'Sort by Hot' }];

function FarmingTable() {
  // States
  const [headerTabsValue, setHeaderTabsValue] = React.useState(
    headerTabs[0].value
  );
  const [sortBy, setSortBy] = React.useState(sortOptions[0].value);
  const numbers = [1, 2, 3, 4, 5, 6, 7];

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
        <Search placeholder="Search..." lite simple icon right />
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
          {numbers.map((el, index) => {
            return (
              <FarmingTableItem key={index} dark={index % 2} indicator="hot" />
            );
          })}
        </Table>
      </div>
    </div>
  );
}

export default FarmingTable;
