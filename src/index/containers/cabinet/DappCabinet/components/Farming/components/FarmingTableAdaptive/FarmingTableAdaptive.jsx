import React from 'react';
import { Web3Context } from 'services/web3Provider';

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
  const context = React.useContext(Web3Context);
  const {pools} = context;

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
          {!!pools && Object.keys(pools).map((address, index) => {
            const pool = pools[address];
            return <FarmingAdaptiveItem key={index} pool={pool} />;
          })}
        </div>
      </CabinetScrollBlock>
    </div>
  );
}

export default FarmingTableAdaptive;
