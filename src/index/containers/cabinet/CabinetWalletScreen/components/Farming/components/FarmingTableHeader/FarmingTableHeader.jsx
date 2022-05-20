import React from 'react';

import { SwitchTabs, Search } from 'src/ui';
import Select from 'src/index/components/cabinet/Select/Select';

// Styles
import './FarmingTableHeader.less';

function FarmingTableHeader({
  headerTabsValue,
  setHeaderTabsValue,
  headerTabs,
  sortBy,
  setSortBy,
  sortOptions,
}) {
  return (
    <div className="FarmingTableHeader">
      <SwitchTabs
        selected={headerTabsValue}
        onChange={setHeaderTabsValue}
        tabs={headerTabs}
        type="light-blue"
      />
      <Select value={sortBy} onChange={setSortBy} options={sortOptions} />
      <Search placeholder="Search" lite simple icon right />
    </div>
  );
}

export default FarmingTableHeader;
