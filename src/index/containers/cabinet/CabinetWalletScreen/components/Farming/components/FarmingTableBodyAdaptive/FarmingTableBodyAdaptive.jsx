import React from 'react';
import { Scrollbar } from 'react-scrollbars-custom';
import CabinetScrollBlock from 'src/index/components/cabinet/CabinetScrollBlock/CabinetScrollBlock';

function FarmingTableBodyAdaptive() {
  const [height, setHeight] = React.useState(345);

  React.useEffect(() => {
    const farmingContainerHeight = document.querySelector('.Farming').clientHeight;
    const farmingHeaderHeight = document.querySelector('.Farming__header').clientHeight;
    const tableHeaderHeight = document.querySelector('.FarmingTableHeader').clientHeight;

    setHeight(farmingContainerHeight - (farmingHeaderHeight + tableHeaderHeight + 24 + 23));
  }, []);

  return (
    <div className="FarmingTableBodyAdaptive">
      <CabinetScrollBlock style={{height}}>
        <ul>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
          <li>asdasd</li>
        </ul>
      </CabinetScrollBlock>
    </div>
  );
}

export default FarmingTableBodyAdaptive;
