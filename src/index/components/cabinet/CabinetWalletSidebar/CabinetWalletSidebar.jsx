import React from 'react';

import SidebarItem from './SidebarItem/SidebarItem';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import './CabinetWalletSidebar.less';

function CabinetWalletSidebar(props) {
  return (
    <div className="CabinetWalletSidebar">
      <CabinetBlock>
        <ul>
          <SidebarItem title="Dashboard" icon="dashboard" />
          <SidebarItem title="Wallet" icon="wallet" active />
          <SidebarItem title="Exchanger" icon="exchange" />
        </ul>
      </CabinetBlock>
      <CabinetBlock>
        <ul>
          <SidebarItem title="Trade" icon="trade">
            <ul>
              <li>Pro Dex</li>
              <li>Pro Dex</li>
              <li>Pro Dex</li>
              <li>Swap</li>
            </ul>
          </SidebarItem>
          <SidebarItem title="Liquidity" icon="liquidity" />
          <SidebarItem title="Farm" icon="farm" />
          <SidebarItem title="Validator" icon="validator" />
        </ul>
      </CabinetBlock>
    </div>
  );
}

export default CabinetWalletSidebar;
