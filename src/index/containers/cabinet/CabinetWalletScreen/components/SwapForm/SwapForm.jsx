import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Switch, SwitchTabs } from 'src/ui';
import SVG from 'utils/svg-wrap';
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';

// Styles
import './SwapForm.less';

function SwapForm() {
  const [isPro, setIsPro] = React.useState(false); // Pro version

  const togglePro = () => {
    setIsPro((prev) => !prev);
  };

  return (
    <div className="SwapForm">
      <div className="SwapForm__container">
        <div className="SwapForm__header">
          <div className="SwapForm__row">
            <h1>Exchange</h1>
            <Switch type="light-blue" on={isPro} onChange={togglePro} />
            <span className="switch-label">Pro Version</span>
          </div>
          <div className="SwapForm__row">
            <p className="SwapForm__description">
              The Narfex token facilitates multiple tokenomics, serving as a
              utility token and governance token.
            </p>
          </div>
          <div className="SwapForm__row">
            <SwitchTabs
              selected="swap"
              tabs={[
                { value: 'swap', label: 'Swap' },
                { value: 'liquidity', label: 'Liquidity' },
                { value: 'transactions', label: 'Transactions' },
              ]}
              onChange={() => {}}
              type="light-blue"
            />
          </div>
          <div className="SwapForm__row">
            <CabinetBlock>
              <div className="SwapForm__form">e</div>
            </CabinetBlock>
          </div>
        </div>
      </div>
      <div className="SwapForm__bg">
        {/*<SVG src={require('src/asset/backgrounds/cabinet-swap/center-of-screen-fix.svg')} />*/}
        <SVG
          src={require('src/asset/backgrounds/cabinet-swap/right-of-screen-fix.svg')}
        />
      </div>
    </div>
  );
}

export default SwapForm;
