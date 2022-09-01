import React from 'react';
import PropTypes from 'prop-types';
import { useRoute } from 'react-router5';
import { getLang } from 'utils';

// Components
import { Switch, SwitchTabs, Button } from 'src/ui';
import CabinetContent from '../CabinetContent/CabinetContent';
import DexSwap from 'src/index/containers/dapp/DexSwap/DexSwap';
import Liquidity from 'src/index/containers/dapp/Liquidity/Liquidity';
import * as PAGES from 'src/index/constants/pages';

// Styles
import './SwitchPage.less';
import Transactions from '../Transactions/Transactions';

// Main
function SwitchPage({ adaptive }) {
  // States
  const [isPro, setIsPro] = React.useState(false); // Pro version

  // Constants
  const { route, router } = useRoute();
  const switchTabs = [
    { value: PAGES.DAPP_SWAP, label: getLang('dapp_sidebar_swap') },
    { value: PAGES.LIQUIDITY, label: getLang('dapp_sidebar_liquidity') },
    { value: PAGES.TRANSACTIONS, label: getLang('dapp_sidebar_transactions') },
  ];
  // Current page is ...
  const isSwap = route.name === PAGES.DAPP_SWAP;
  const isLiquidity = route.name === PAGES.LIQUIDITY;
  const isTransactions = route.name === PAGES.TRANSACTIONS;

  // Page Title.
  const titleLang = getSwitchedTitle(route.name, adaptive);
  const title = getLang(titleLang);

  // Handlers.
  // Pro version toggler
  const togglePro = () => {
    setIsPro((prev) => !prev);
  };

  // Page switch navigate
  const handleSwitchTabs = (value) => {
    if (route.name === value) {
      return;
    }

    router.navigate(value);
  };

  return (
    <CabinetContent className="SwitchPage">
      <div className="SwitchPage__header">
        <div className="SwitchPage__row">
          <h1>{title}</h1>
          {/* {isSwap && (
              <>
                <Switch type="light-blue" on={isPro} onChange={togglePro} />
                <span className="switch-label">Pro Version</span>
              </>
            )} */}
        </div>
        {!isLiquidity && <div className="SwitchPage__row" />}
        {isLiquidity && !adaptive && (
          <div className="SwitchPage__row">
            <p className="SwitchPage__description">
              {getLang('dapp_liquidity_page_subtitle')}
            </p>
          </div>
        )}
        <div className="SwitchPage__row">
          <SwitchTabs
            selected={route.name}
            tabs={switchTabs}
            onChange={handleSwitchTabs}
            type="light-blue"
          />
        </div>
      </div>
      <div className="SwitchPage__row">
        {isSwap && <DexSwap />}
        {isLiquidity && <Liquidity />}
        {isTransactions && <Transactions />}
      </div>
    </CabinetContent>
  );
}

// Get title for current page.
// For adaptive maybe another title.
// @param {string} route - Current PAGE name.
// @param {boolean} adaptive - Screen width is adaptive.
// return {string} - Title of route&adaptive.
function getSwitchedTitle(route, adaptive = false) {
  const isSwap = route.name === PAGES.DAPP_SWAP;
  const isLiquidity = route.name === PAGES.LIQUIDITY;
  if (route === PAGES.DAPP_SWAP) {
    return 'dapp_swap_page_title';
  }

  if (route === PAGES.TRANSACTIONS) {
    return 'dapp_sidebar_transactions';
  }

  if (route === PAGES.LIQUIDITY) {
    if (adaptive) {
      return 'dapp_liquidity_page_title_adaptive';
    }

    return 'dapp_liquidity_page_title';
  }

  return '';
}

export default SwitchPage;
