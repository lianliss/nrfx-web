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

  // Check - current page is exists or empty in pages.
  // @params pages (array or string). Page constant from PAGES.
  const isPage = (pages) => {
    if (Array.isArray(pages)) {
      for (let page of pages) {
        if (page === route.name) {
          return true;
        }
      }
    } else {
      return route.name === pages;
    }

    return false;
  };

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
                active={isPage(PAGES.DAPP_WALLET)}
                onClick={() => router.navigate(PAGES.DAPP_WALLET)}
              />
              <SidebarItem
                title="Exchanger"
                icon="exchange"
                active={isPage(PAGES.DAPP_EXCHANGE)}
                onClick={() => router.navigate(PAGES.DAPP_EXCHANGE)}
              />
            </ul>
          </CabinetBlock>
          <CabinetBlock>
            <ul>
              <SidebarItem title="Trade" icon="trade" active>
                <ul>
                  <li
                    className={isPage(PAGES.DAPP_SWAP) ? 'active' : ''}
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
                active={isPage(PAGES.LIQUIDITY)}
                onClick={() => router.navigate(PAGES.LIQUIDITY)}
              />
              <SidebarItem
                title="Farm"
                icon="farm"
                active={isPage(PAGES.FARMING)}
                onClick={() => router.navigate(PAGES.FARMING)}
              />
              <SidebarItem
                title="Validator"
                icon="validator"
                active={isPage(PAGES.VALIDATOR)}
                onClick={() => router.navigate(PAGES.VALIDATOR)}
              />
              <SidebarItem
                title="About NRFX"
                icon="nrfx-blue-bg-icon"
                href="/token"
              />
              <SidebarItem
                title="Referral Program"
                icon="team-icon"
                active={isPage([
                  PAGES.DAPP_REFERRAL,
                  PAGES.DAPP_REFERRAL_EXCHANGER,
                  PAGES.DAPP_REFERRAL_FARMING,
                ])}
                onClick={() => router.navigate(PAGES.DAPP_REFERRAL)}
              />
              <SidebarItem title="More" icon="more-vertical-icon">
                <ul>
                  <li>
                    <a href="http://docs.narfex.com/narfex" target="_blank">
                      Docs
                    </a>
                  </li>
                  <li
                    className="disabled"
                    onClick={() => router.navigate(PAGES.DAPP_SWAP)}
                  >
                    Team
                  </li>
                  <li
                    className="disabled"
                    onClick={() => router.navigate(PAGES.DAPP_SWAP)}
                  >
                    Audit
                  </li>
                  <li>
                    <a href="/narfex_dao" target="_blank">
                      Governance
                    </a>
                  </li>
                  <li onClick={() => router.navigate(PAGES.DAPP_SOCIAL_MEDIA)}>
                    Social media
                  </li>
                  <li>
                    <a href="https://medium.com/@narfex" target="_blank">
                      Blog
                    </a>
                  </li>
                </ul>
              </SidebarItem>
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
