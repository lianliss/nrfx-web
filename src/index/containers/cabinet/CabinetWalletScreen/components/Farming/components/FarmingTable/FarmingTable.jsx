import React from 'react';

// Components
import { SwitchTabs, Search } from 'src/ui';
import Select from 'src/index/components/cabinet/Select/Select';

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
      <div className="FarmingTable__body"></div>
    </div>
  );
}

export default FarmingTable;
