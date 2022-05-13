import React from 'react';

// Components
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import LiquidityList from './components/LiquidityList/LiquidityList';
import { Button } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './Liquidity.less';

const items = [
  {
    id: 0,
    currencies: ['bnb', 'bsw'],
    amounts: [2.005, 15.005],
    pool: { tokens: 2, share: 55 },
  },
  {
    id: 1,
    currencies: ['usdt', 'nrfx'],
    amounts: [2.005, 15.005],
    pool: { tokens: 2, share: 55 },
  },
  {
    id: 2,
    currencies: ['bnb', 'usd'],
    amounts: [2.005, 15.005],
    pool: { tokens: 2, share: 55 },
  },
  {
    id: 3,
    currencies: ['rub', 'idr'],
    amounts: [2.005, 15.005],
    pool: { tokens: 2, share: 55 },
  },
];

// Main
function Liquidity() {
  return (
    <CabinetBlock className="Liquidity">
      <div className="Liquidity__header">
        <div className="Liquidity__title">Liquidity</div>
        <p className="default-text">Add liquidity to receive LP tokens</p>
        <Button type="lightBlue">
          Add Liquidity <span>+</span>
        </Button>
      </div>
      <div className="Liquidity__body">
        <div className="Liquidity__subtitle">
          <span>Your Liquidity</span>
          <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
        </div>
        <LiquidityList items={items} />
      </div>
      <div className="Liquidity__footer">
        <p className="default-text">
          Don't see a pool you joined? <a href="/">Import it.</a>
        </p>
        <p className="default-text">
          Or, if you staked your LP tokens in a farm, unstake them to see
          them&nbsp;
          <a href="/">here.</a>
        </p>
      </div>
    </CabinetBlock>
  );
}

export default Liquidity;
