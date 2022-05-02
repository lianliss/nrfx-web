import React from 'react';
import { useRoute } from 'react-router5';

import * as PAGES from 'src/index/constants/pages';
import SidebarItem from './components/SidebarItem/SidebarItem';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import WalletsListItem from '../../../containers/cabinet/CabinetExchangeScreen/components/WalletsList/components/WalletsListItem/WalletsListItem';
import WalletsList from '../../../containers/cabinet/CabinetExchangeScreen/components/WalletsList/WalletsList';
import RateIndicator from 'src/ui/components/RateIndicator/RateIndicator';
import './CabinetWalletSidebar.less';

function CabinetWalletSidebar() {
  const { route, router } = useRoute();

  return (
    <div className="CabinetWalletSidebar">
      <div className="CabinetWalletSidebar__container">
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
      <WalletsList>
        <WalletsListItem
          icon={
            <img
              src="https://static.narfex.com/img/currencies/nrfx.svg"
              style={{
                background:
                  'linear-gradient(to bottom, #FABE4C 0%, #FA9751 100%)',
                border: '1px solid #fff',
              }}
            />
          }
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
