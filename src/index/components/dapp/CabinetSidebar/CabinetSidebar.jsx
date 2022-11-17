import React from 'react';
import PropTypes from 'prop-types';
import { useRoute } from 'react-router5';

import * as PAGES from 'src/index/constants/pages';
import SidebarItem from './components/SidebarItem/SidebarItem';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import CabinetScrollBlock from '../CabinetScrollBlock/CabinetScrollBlock';
import NarfexRate from './components/NarfexRate/NarfexRate';
import ComingSoonItem from './components/ComingSoonItem/ComingSoonItem';
import { useSidebarContainerHeight } from './hooks/useSidebarContainerHeight';
import { getLang } from 'src/utils';

import './CabinetSidebar.less';

function CabinetSidebar({ className, adaptive }) {
  const { route, router } = useRoute();
  const containerSize = useSidebarContainerHeight(adaptive);

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

  return (
    <div className={`CabinetSidebar ${className}`}>
      <div
        className="CabinetSidebar__container"
        style={{ height: !adaptive && containerSize }}
      >
        <CabinetScrollBlock>
          <CabinetBlock>
            <ul>
              <SidebarItem
                title={getLang('dapp_sidebar_dashboard')}
                icon="dashboard"
                disabled
              />
              <SidebarItem
                title={getLang('dapp_sidebar_wallet')}
                icon="wallet"
                active={isPage(PAGES.DAPP_WALLET)}
                onClick={() => router.navigate(PAGES.DAPP_WALLET)}
                disabled
              />
              <SidebarItem
                title={getLang('dapp_sidebar_exchanger')}
                icon="exchange"
                active={isPage(PAGES.DAPP_EXCHANGE)}
                onClick={() => router.navigate(PAGES.DAPP_EXCHANGE)}
              />
              <SidebarItem
                title={getLang('dapp_sidebar_history')}
                icon="history"
                active={isPage(PAGES.DAPP_TRANSACTION_HISTORY)}
                onClick={() => router.navigate(PAGES.DAPP_TRANSACTION_HISTORY)}
              />
              <SidebarItem
                title={getLang('dapp_sidebar_referral_program')}
                icon="team-icon"
                active={isPage([
                  PAGES.DAPP_REFERRAL,
                  PAGES.DAPP_REFERRAL_EXCHANGER,
                  PAGES.DAPP_REFERRAL_FARMING,
                ])}
                onClick={() => router.navigate(PAGES.DAPP_REFERRAL)}
              />
            </ul>
          </CabinetBlock>
          <CabinetBlock>
            <ul>
              <SidebarItem
                title={getLang('dapp_sidebar_trade')}
                icon="trade"
                onClick={() => router.navigate(PAGES.DAPP_SWAP)}
                active
              >
                <ul>
                  <li
                    className={isPage(PAGES.DAPP_SWAP) ? 'active' : ''}
                    onClick={() => router.navigate(PAGES.DAPP_SWAP)}
                  >
                    {getLang('dapp_sidebar_swap')}
                  </li>
                  <ComingSoonItem text={getLang('dapp_sidebar_pro_dex')} />
                </ul>
              </SidebarItem>
              <SidebarItem
                title={getLang('dapp_sidebar_liquidity')}
                icon="liquidity"
                active={isPage(PAGES.LIQUIDITY)}
                onClick={() => router.navigate(PAGES.LIQUIDITY)}
              />
              <SidebarItem
                title={getLang('dapp_sidebar_farm')}
                icon="farm"
                active={isPage(PAGES.FARMING)}
                onClick={() => router.navigate(PAGES.FARMING)}
              />
              <SidebarItem
                title={getLang('dapp_sidebar_validator')}
                icon="validator"
                active={isPage(PAGES.VALIDATOR)}
                onClick={() => router.navigate(PAGES.VALIDATOR)}
              />
              <SidebarItem
                title={getLang('dapp_sidebar_about_nrfx')}
                icon="nrfx-blue-bg-icon"
                href="/token"
              />
              <SidebarItem
                title={getLang('dapp_sidebar_more')}
                icon="more-vertical-icon"
              >
                <ul>
                  <li>
                    <a href="http://docs.narfex.com/narfex" target="_blank">
                      {getLang('dapp_sidebar_more_docs')}
                    </a>
                  </li>
                  <li className="disabled">{getLang('dapp_sidebar_more_team')}</li>
                  <li
                    className="disabled"
                    onClick={() => router.navigate(PAGES.DAPP_SWAP)}
                  >
                    {getLang('dapp_sidebar_more_audit')}
                  </li>
                  <li>
                    <a href="/narfex_dao" target="_blank">
                    {getLang('dapp_sidebar_more_governance')}
                    </a>
                  </li>
                  <li onClick={() => router.navigate(PAGES.DAPP_SOCIAL_MEDIA)}>
                  {getLang('dapp_sidebar_more_social_media')}
                  </li>
                  <li>
                    <a href="https://medium.com/@narfex" target="_blank">
                    {getLang('dapp_sidebar_more_blog')}
                    </a>
                  </li>
                  <li className="disabled">
                    <a href="/terms-of-service">{getLang('dapp_sidebar_more_terms')}</a>
                  </li>
                </ul>
              </SidebarItem>
            </ul>
          </CabinetBlock>
          {adaptive && <NarfexRate />}
        </CabinetScrollBlock>
      </div>
      {!adaptive && <NarfexRate />}
    </div>
  );
}

CabinetSidebar.propTypes = {
  className: PropTypes.string,
  adaptive: PropTypes.bool,
};
CabinetSidebar.defaultProps = {
  className: '',
  adaptive: false,
};

export default CabinetSidebar;
