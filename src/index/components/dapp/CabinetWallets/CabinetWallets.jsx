import React from 'react';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import ShowPageOn from '../ShowPageOn/ShowPageOn';
import './CabinetWallets.less';
import WalletsExists from './components/WalletsExists/WalletsExists';
import WalletsIsEmpty from './components/WalletsIsEmpty/WalletsIsEmpty';
import { Web3Context } from 'src/services/web3Provider';

function CabinetWallets() {
  const { isConnected } = React.useContext(Web3Context);

  return (
    <CabinetBlock className="CabinetWallets">
      {isConnected ? <WalletsExists /> : <WalletsIsEmpty />}
    </CabinetBlock>
  );
}

export default CabinetWallets;
