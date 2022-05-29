import React from 'react';
import PropTypes from 'prop-types';
import { useRoute } from 'react-router5';
import { getLang } from 'utils';

// Components
import { Switch, SwitchTabs, Button } from 'src/ui';
import DexSwap from '../../../DexSwap/DexSwap';
import Liquidity from '../../../Liquidity/Liquidity';
import SVG from 'utils/svg-wrap';
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
    { value: PAGES.WALLET_SWAP, label: 'Swap' },
    { value: PAGES.LIQUIDITY, label: 'Liquidity' },
    { value: PAGES.TRANSACTIONS, label: 'Transactions' },
  ];
  // Current page is ...
  const isSwap = route.name === PAGES.WALLET_SWAP;
  const isLiquidity = route.name === PAGES.LIQUIDITY;
  const isTransactions = route.name === PAGES.TRANSACTIONS;

  // Page Title.
  const title = getSwitchedTitle(route.name, adaptive);

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
    <div className="SwitchPage">
      <div className="SwitchPage__container">
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
                Earn high yields from transaction fees.
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
        <div className="SwitchPage__bg-center">
          <SVG
            src={require('src/asset/backgrounds/cabinet-swap/center-of-screen-fix.svg')}
          />
        </div>
      </div>
      <div className="SwitchPage__bg">
        <SVG
          src={require('src/asset/backgrounds/cabinet-swap/right-of-screen-fix.svg')}
        />
      </div>
    </div>
  );
}

// Get title for current page.
// For adaptive maybe another title.
// @param {string} route - Current PAGE name.
// @param {boolean} adaptive - Screen width is adaptive.
// return {string} - Title of route&adaptive.
function getSwitchedTitle(route, adaptive = false) {
  const isSwap = route.name === PAGES.WALLET_SWAP;
  const isLiquidity = route.name === PAGES.LIQUIDITY;
  if (route === PAGES.WALLET_SWAP) {
    return getLang('cabinet_wallet_exchange_title');
  }

  if (route === PAGES.TRANSACTIONS) {
    return 'Transactions';
  }

  if (route === PAGES.LIQUIDITY) {
    if (adaptive) {
      return 'Liquidity provider';
    }

    return 'Become a Liquidity provider';
  }

  return '';
}

export default SwitchPage;
