import React from 'react';
import isTestnet from 'src/utils/isTestnet';
import { Web3Context } from 'services/web3Provider';
import {Button} from 'src/ui';

import './TestnetOverlay.less';

const TestnetOverlay = props => {
  const context = React.useContext(Web3Context);
  const {chainId, switchToChain, isConnected} = context;
  const {testnetOnly, mainnetOnly} = props;

  if (testnetOnly && isTestnet && chainId === 97) return <></>;
  if (mainnetOnly && !isTestnet && chainId === 56) return <></>;
  if ((!mainnetOnly && !testnetOnly) || !isConnected) return <></>;
  if (window.location.hostname === 'localhost') return <>
    Будет перенаправлено на {mainnetOnly ? 'mainnet' : 'testnet'} в продакшене
  </>;

  const changeLocation = () => {
    const {pathname, search} = window.location;
    if (isTestnet) {
      window.location.replace(`https://narfex.com${pathname}${search}`);
    } else {
      window.location.replace(`https://testnet.narfex.com${pathname}${search}`);
    }
  };

  changeLocation();

  return <div className="TestnetOverlay__wrap">
    <div className="TestnetOverlay__background">
    </div>
    <div className="TestnetOverlay__content">
      <h2>
        {testnetOnly
          ? 'Redirecting to testnet...'
          : 'Redirecting to mainnet...'}
      </h2>
      {/*<div className="TestnetOverlay__buttons">*/}
        {/*<Button onClick={() => switchToChain(testnetOnly ? 97 : 56)}>*/}
          {/*Switch your chain*/}
        {/*</Button>*/}
        {/*<Button onClick={() => changeLocation()}>*/}
          {/*{testnetOnly ? 'Go to Testnet' : 'Go to Mainnet'}*/}
        {/*</Button>*/}
      {/*</div>*/}
    </div>
  </div>
};

export default TestnetOverlay;
