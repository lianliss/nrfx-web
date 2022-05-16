import React from 'react';

// Components
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import LiquidityAdd from './components/LiquidityAdd/LiquidityAdd';
import LiquidityRemove from './components/LiquidityRemove/LiquidityRemove';
import LiquidityMain from './components/LiquidityMain/LiquidityMain';

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
  // Display oneOf["add", "remove", "main"] page
  const [currentDisplay, setCurrentDisplay] = React.useState('main');

  return (
    <CabinetBlock className="Liquidity">
      {currentDisplay === 'main' && (
        <LiquidityMain
          items={items}
          onAddClick={() => setCurrentDisplay('add')}
          onRemoveClick={() => setCurrentDisplay('remove')}
        />
      )}
      {currentDisplay === 'add' && (
        <LiquidityAdd
          onClose={() => {
            setCurrentDisplay('main');
          }}
        />
      )}
      {currentDisplay === 'remove' && (
        <LiquidityRemove
          onClose={() => {
            setCurrentDisplay('main');
          }}
        />
      )}
    </CabinetBlock>
  );
}

export default Liquidity;
