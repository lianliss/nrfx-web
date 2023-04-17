import React from 'react';
import { Web3Context } from 'services/web3Provider';

// Components
import CabinetScrollBlock from 'src/index/components/dapp/CabinetScrollBlock/CabinetScrollBlock';
import FarmingTableHeader from '../FarmingTableHeader/FarmingTableHeader';

// Utils
import useHeightSize from './hooks/useHeightSize';

// Styles
import './FarmingTableAdaptive.less';
import FarmingAdaptiveItem from './components/FarmingAdaptiveItem/FarmingAdaptiveItem';
import useGetTokenRate from 'src/hooks/useGetTokenRate';

function FarmingTableAdaptive({ items, ...filters }) {
  // Sort filters from props
  const { farmsValue, setFarmsValue, sortBy, setSortBy, farms, sortOptions } =
    filters;

  const context = React.useContext(Web3Context);
  const {chainId} = context;
  const nrfxPrice = useGetTokenRate('NRFX', chainId || 1);
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
      <div className="FarmingTableAdaptive__list">
        {!!pools && Object.keys(pools).map((address, index) => {
          const pool = pools[address];
          return <FarmingAdaptiveItem key={index} pool={pool} nrfxPrice={nrfxPrice} />;
        })}
      </div>
    </div>
  );
}

export default FarmingTableAdaptive;
