import React from 'react';
import { useRoute } from 'react-router5';

import SVG from "utils/svg-wrap";
import * as PAGES from 'src/index/constants/pages';
import SidebarItem from './components/SidebarItem/SidebarItem';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import WalletsListItem from '../WalletsList/components/WalletsListItem/WalletsListItem';
import WalletsList from '../WalletsList/WalletsList';
import RateIndicator from 'src/ui/components/RateIndicator/RateIndicator';
import CabinetScrollBlock from '../CabinetScrollBlock/CabinetScrollBlock';
import './CabinetWalletSidebar.less';

function CabinetWalletSidebar() {
  const { route, router } = useRoute();

  return (
    <div className="CabinetWalletSidebar">
      <div className="CabinetWalletSidebar__container">
        <CabinetScrollBlock>
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
              />
            </ul>
          </CabinetBlock>
          <CabinetBlock>
            <ul>
              <SidebarItem title="Trade" icon="trade">
                <ul>
                  <li>Pro Dex</li>
                  <li
                    active={route.name === PAGES.WALLET_SWAP}
                    onClick={() => router.navigate(PAGES.WALLET_SWAP)}
                  >
                    Swap
                  </li>
                </ul>
              </SidebarItem>
              <SidebarItem title="Liquidity" icon="liquidity" />
              <SidebarItem
                title="Farm"
                icon="farm"
                active={route.name === PAGES.FARMING}
                onClick={() => router.navigate(PAGES.FARMING)}
              />
              <SidebarItem title="Validator" icon="validator" />
            </ul>
          </CabinetBlock>
        </CabinetScrollBlock>
      </div>
      <WalletsList>
        <WalletsListItem
          icon={<SVG src={require('src/asset/icons/wallets/nrfx.svg')} />}
          startTexts={['Narfex', 'NRFX']}
          endTexts={[
            '$455.00',
            <>
              <RateIndicator number={12} type="up" procent />
              0.54
            </>,
          ]}
          border
        />
      </WalletsList>
    </div>
  );
}

export default CabinetWalletSidebar;
