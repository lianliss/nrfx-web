import React from 'react';

import { SwitchTabs, Search } from 'src/ui';
import { Select } from 'dapp';
import { getLang } from 'utils';

// Styles
import './FarmingTableHeader.less';

function FarmingTableHeader({
  farmsValue,
  setFarmsValue,
  farms,
  sortBy,
  setSortBy,
  sortOptions,
}) {
  return (
    <div className="FarmingTableHeader">
      <SwitchTabs
        selected={farmsValue}
        onChange={setFarmsValue}
        tabs={farms}
        type="light-blue"
      />
      <Select value={sortBy} onChange={setSortBy} options={sortOptions} />
      <Search
        placeholder={getLang('dapp_global_search')}
        lite
        simple
        icon
        right
      />
    </div>
  );
}

export default FarmingTableHeader;
