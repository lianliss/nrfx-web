import React from 'react';

// Components
import CabinetScrollBlock from 'src/index/components/cabinet/CabinetScrollBlock/CabinetScrollBlock';
import FarmingTableHeader from '../FarmingTableHeader/FarmingTableHeader';

// Utils
import useHeightSize from './hooks/useHeightSize';

// Styles
import './FarmingTableAdaptive.less';
import FarmingAdaptiveItem from './components/FarmingAdaptiveItem/FarmingAdaptiveItem';

function FarmingTableAdaptive({ items, ...filters }) {
  // Sort filters from props
  const { farmsValue, setFarmsValue, sortBy, setSortBy, farms, sortOptions } =
    filters;

  const height = useHeightSize();

  return (
    <div className="FarmingTableAdaptive">
      <FarmingTableHeader
        farms={farms}
        farmsValue={farmsValue}
        setFarmsValue={setFarmsValue}
        sortOptions={sortOptions}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <CabinetScrollBlock style={{ height, minHeight: 200 }}>
        <div className="FarmingTableAdaptive__list">
          {items.map((item, key) => (
            <FarmingAdaptiveItem key={key} {...item} />
          ))}
        </div>
      </CabinetScrollBlock>
    </div>
  );
}

export default FarmingTableAdaptive;
