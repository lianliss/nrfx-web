import React from 'react';

// Components
import CabinetScrollBlock from 'src/index/components/cabinet/CabinetScrollBlock/CabinetScrollBlock';
import FarmingTableHeader from '../FarmingTableHeader/FarmingTableHeader';

// Styles
import './FarmingTableAdaptive.less';

function FarmingTableAdaptive({ items, ...filters }) {
  // Sort filters from props
  const { farmsValue, setFarmsValue, sortBy, setSortBy, farms, sortOptions } =
    filters;

  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const adaptiveTableHeightSetter = () => {
      setHeight(0);
      const farmingContainerHeight =
        document.querySelector('.Farming').clientHeight;
      const farmingHeaderHeight =
        document.querySelector('.Farming__header').clientHeight;
      const tableHeaderHeight = document.querySelector(
        '.FarmingTableHeader'
      ).clientHeight;

      setHeight(
        farmingContainerHeight -
          (farmingHeaderHeight + tableHeaderHeight + 24 + 23)
      );
    };

    adaptiveTableHeightSetter();

    window.addEventListener('resize', adaptiveTableHeightSetter);

    return () => {
      window.removeEventListener('resize', adaptiveTableHeightSetter);
    };
  }, []);

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
          <div className="FarmingTableAdaptive__item">
            <div className="row">
              <div className="row">
                
              </div>
              <div className="row"></div>
            </div>
            <div className="row">
              <div className="FarmingTableAdaptive__options"></div>
            </div>
          </div>
        </div>
      </CabinetScrollBlock>
    </div>
  );
}

export default FarmingTableAdaptive;
