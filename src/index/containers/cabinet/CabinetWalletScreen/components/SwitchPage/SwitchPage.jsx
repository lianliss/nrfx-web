import React from 'react';
import PropTypes from 'prop-types';
import { useRoute } from 'react-router5';

// Components
import { Switch, SwitchTabs, Button } from 'src/ui';
import DexSwap from '../../../DexSwap/DexSwap';
import Liquidity from '../../../Liquidity/Liquidity';
import SVG from 'utils/svg-wrap';
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import * as PAGES from 'src/index/constants/pages';

// Styles
import './SwitchPage.less';

// Main
function SwitchPage() {
  // States
  const [isPro, setIsPro] = React.useState(false); // Pro version

  // Constants
  const { route, router } = useRoute();
  const switchTabs = [
    { value: PAGES.WALLET_SWAP, label: 'Swap' },
    { value: PAGES.LIQUIDITY, label: 'Liquidity' },
    { value: 'transactions', label: 'Transactions' },
  ];
  // Current page is ...
  const page = route.name;
  const isSwap = page === PAGES.WALLET_SWAP;
  const isLiquidity = page === PAGES.LIQUIDITY;

  // Page Title.
  const title =
    (isSwap && 'Exchange') || (isLiquidity && 'Become a Liquidity provider');

  // Handlers.
  // Pro version toggler
  const togglePro = () => {
    setIsPro((prev) => !prev);
  };

  const handleSwitchTabs = (value) => {
    if (page === value) {
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
            {isSwap && (
              <>
                <Switch type="light-blue" on={isPro} onChange={togglePro} />
                <span className="switch-label">Pro Version</span>
              </>
            )}
          </div>
          {isLiquidity && (
            <div className="SwitchPage__row">
              <p className="SwitchPage__description">
                Earn high yields from transaction fees.
              </p>
            </div>
          )}
          <div className="SwitchPage__row">
            <SwitchTabs
              selected={page}
              tabs={switchTabs}
              onChange={handleSwitchTabs}
              type="light-blue"
            />
          </div>
        </div>
        <div className="SwitchPage__row">
          {isSwap && <DexSwap />}
          {isLiquidity && <Liquidity />}
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

export default SwitchPage;
