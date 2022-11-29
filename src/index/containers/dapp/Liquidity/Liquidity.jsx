import React from 'react';

// Components
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import LiquidityAdd from './components/LiquidityAdd/LiquidityAdd';
import LiquidityRemove from './components/LiquidityRemove/LiquidityRemove';
import LiquidityMain from './components/LiquidityMain/LiquidityMain';
import _ from 'lodash';
import { Web3Context } from 'services/web3Provider';
import router from 'src/router';
import TestnetOverlay from 'src/index/components/dapp/TestnetOverlay/TestnetOverlay';

// Styles
import './Liquidity.less';

const POOLS_LIST_KEY = 'narfex-pools-list';

// Main
function Liquidity() {
  const routerParams = router.getState().params;
  const routerTokens = {
    token0: routerParams.token0,
    token1: routerParams.token1,
    isExists: !!routerParams.token0 && !!routerParams.token1,
  };

  // Display oneOf["add", "remove", "main"] page
  const [currentPool, setCurrentPool] = React.useState(null);
  const [currentDisplay, setCurrentDisplay] = React.useState('main');
  const context = React.useContext(Web3Context);
  let storagePools;
  try {
    storagePools =
      JSON.parse(window.localStorage.getItem(POOLS_LIST_KEY)) || [];
  } catch (error) {
    storagePools = [];
  }
  const [userPools, setUserPools] = React.useState(storagePools);
  const poolsList = _.uniq([...context.poolsList, ...userPools]);

  const addPool = (_poolAddress) => {
    const poolAddress = _poolAddress.toLowerCase();
    if (
      context.poolsList.indexOf(poolAddress) >= 0 ||
      userPools.indexOf(poolAddress) >= 0
    )
      return;
    const newList = [...userPools, poolAddress];
    window.localStorage.setItem(POOLS_LIST_KEY, JSON.stringify(newList));
    setUserPools(newList);
  };

  const removePool = (_poolAddress) => {
    const poolAddress = _poolAddress.toLowerCase();
    if (
      context.poolsList.indexOf(poolAddress) >= 0 ||
      userPools.indexOf(poolAddress) < 0
    )
      return;
    const newList = userPools.filter((p) => p !== poolAddress);
    window.localStorage.setItem(POOLS_LIST_KEY, JSON.stringify(newList));
    setUserPools(newList);
  };

  React.useEffect(() => {
    if(context.isConnected && routerTokens.isExists) {
      setCurrentDisplay('add');
    }
  }, []);

  return (
    <CabinetBlock className={`Liquidity ${currentDisplay}`}>
      {currentDisplay === 'main' && (
        <LiquidityMain
          poolsList={poolsList}
          onAddClick={(pairAddress) => {
            setCurrentPool(pairAddress);
            setCurrentDisplay('add');
          }}
          onRemoveClick={(pairAddress) => {
            setCurrentPool(pairAddress);
            setCurrentDisplay('remove');
          }}
          onImportClick={() => setCurrentDisplay('import')}
        />
      )}
      {currentDisplay === 'add' && (
        <LiquidityAdd
          routerTokens={routerTokens}
          currentPool={currentPool}
          onClose={() => {
            setCurrentDisplay('main');
          }}
        />
      )}
      {currentDisplay === 'remove' && (
        <LiquidityRemove
          removePool={removePool}
          currentPool={currentPool}
          onClose={() => {
            setCurrentDisplay('main');
          }}
        />
      )}
      {currentDisplay === 'import' && (
        <LiquidityAdd
          addPool={addPool}
          onClose={() => {
            setCurrentDisplay('main');
          }}
          type="import"
        />
      )}
      <TestnetOverlay mainnetOnly networks={[56]} />
    </CabinetBlock>
  );
}

export default Liquidity;
