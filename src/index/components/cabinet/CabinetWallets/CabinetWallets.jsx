import React from 'react';
import CabinetBlock from '../CabinetBlock/CabinetBlock';

import './CabinetWallets.less';
import WalletsExists from './components/WalletsExists/WalletsExists';
import WalletsIsEmpty from './components/WalletsIsEmpty/WalletsIsEmpty';

function CabinetWallets() {
  // [testStart]
  const [isExists, setIsExists] = React.useState(true);

  const handleExists = (newState) => {
    setIsExists(newState);
  };
  // [testEnd]

  return (
    <CabinetBlock className="CabinetWallets">
      {isExists ? (
        <WalletsExists />
      ) : (
        <WalletsIsEmpty
          // [testStart]
          onClick={handleExists}
          // [testEnd]
        />
      )}
    </CabinetBlock>
  );
}

export default CabinetWallets;
