import React from 'react';
import { useRoute } from 'react-router5';

import SVG from 'utils/svg-wrap';
import * as PAGES from 'src/index/constants/pages';
import SidebarItem from './components/SidebarItem/SidebarItem';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import WalletsListItem from '../WalletsList/components/WalletsListItem/WalletsListItem';
import WalletsList from '../WalletsList/WalletsList';
import RateIndicator from 'src/ui/components/RateIndicator/RateIndicator';
import CabinetScrollBlock from '../CabinetScrollBlock/CabinetScrollBlock';
import { NumberFormat } from 'src/ui';
import web3Backend from 'services/web3-backend';

import './CabinetSidebar.less';

function CabinetSidebar({ className = '' }) {
  const { route, router } = useRoute();
  const [nrfxRate, setNrfxRate] = React.useState(0);

  React.useEffect(() => {
    web3Backend.getTokenRate('nrfx').then((data) => {
      setNrfxRate(data.price);
    });
  }, []);

  return (
    <div className={`CabinetSidebar ${className}`}>
      <div className="CabinetSidebar__container">
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
                active={route.name === PAGES.DAPP_EXCHANGE}
                onClick={() => router.navigate(PAGES.DAPP_EXCHANGE)}
              />
            </ul>
          </CabinetBlock>
          <CabinetBlock>
            <ul>
              <SidebarItem title="Trade" icon="trade" active>
                <ul>
                  <li
                    className={route.name === PAGES.DAPP_SWAP ? 'active' : ''}
                    onClick={() => router.navigate(PAGES.DAPP_SWAP)}
                  >
                    Swap
                  </li>
                  <li className="disabled">Pro DEX</li>
                </ul>
              </SidebarItem>
              <SidebarItem
                title="Liquidity"
                icon="liquidity"
                active={route.name === PAGES.LIQUIDITY}
                onClick={() => router.navigate(PAGES.LIQUIDITY)}
              />
              <SidebarItem
                title="Farm"
                icon="farm"
                active={route.name === PAGES.FARMING}
                onClick={() => router.navigate(PAGES.FARMING)}
              />
              <SidebarItem
                title="Validator"
                icon="validator"
                active={route.name === PAGES.VALIDATOR}
                onClick={() => router.navigate(PAGES.VALIDATOR)}
              />
            </ul>
          </CabinetBlock>
        </CabinetScrollBlock>
      </div>
      <WalletsList>
        <WalletsListItem
          icon={<SVG src={require('src/asset/icons/wallets/nrfx.svg')} />}
          startTexts={['Narfex', 'NRFX']}
          endTexts={[
            <br />,
            <>
              <RateIndicator number={12} type="up" procent />
              $<NumberFormat number={nrfxRate} />
            </>,
          ]}
          border
        />
      </WalletsList>
    </div>
  );
}

export default CabinetSidebar;
