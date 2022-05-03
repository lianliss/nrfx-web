import React from 'react';
import CabinetBlock from '../CabinetBlock/CabinetBlock';

import './CabinetWallets.less';
import WalletsExists from './components/WalletsExists/WalletsExists';
import WalletsIsEmpty from './components/WalletsIsEmpty/WalletsIsEmpty';

function CabinetWallets() {
  return (
    <CabinetBlock className="CabinetWallets">
      {/*<WalletsIsEmpty /> */}
      <WalletsExists />
    </CabinetBlock>
  );
}

export default CabinetWallets;
