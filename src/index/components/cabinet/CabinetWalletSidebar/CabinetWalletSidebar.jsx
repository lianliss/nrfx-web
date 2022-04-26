import React from 'react';
import { useRoute } from "react-router5";

import * as PAGES from 'src/index/constants/pages';
import SidebarItem from './SidebarItem/SidebarItem';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import './CabinetWalletSidebar.less';

function CabinetWalletSidebar(props) {
  const { route, router } = useRoute();

  return (
    <div className="CabinetWalletSidebar">
      <CabinetBlock>
        <ul>
          <SidebarItem title="Dashboard" icon="dashboard" />
          <SidebarItem
            title="Wallet"
            icon="wallet"
            active={route.name === PAGES.WALLET}
            onClick={() => router.navigate(PAGES.WALLET)}
          />
          <SidebarItem
            title="Exchanger"
            icon="exchange"
            active={route.name === PAGES.WALLET_SWAP}
            onClick={() => router.navigate(PAGES.WALLET_SWAP)}
          />
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
