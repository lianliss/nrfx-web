import React from 'react';
import CabinetBlock from '../CabinetBlock/CabinetBlock';

import './CabinetWallets.less';
import WalletsExists from './components/WalletsExists/WalletsExists';
import WalletsIsEmpty from './components/WalletsIsEmpty/WalletsIsEmpty';

function CabinetWallets() {
  const [isExists, setIsExists] = React.useState(false);

  const showWalletPage = () => {
    setIsExists(true);
  };

  return (
    <CabinetBlock className="CabinetWallets">
      {isExists ? (
        <WalletsExists />
      ) : (
        <WalletsIsEmpty showWalletPage={showWalletPage} />
      )}
    </CabinetBlock>
  );
}

export default CabinetWallets;
