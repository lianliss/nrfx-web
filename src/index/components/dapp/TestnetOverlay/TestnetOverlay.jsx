import React from 'react';
import isTestnet from 'src/utils/isTestnet';
import { Web3Context } from 'services/web3Provider';
import { Button } from 'src/ui';
import { getLang } from 'src/utils';

import './TestnetOverlay.less';

const TestnetOverlay = (props) => {
  const context = React.useContext(Web3Context);
  const { chainId, switchToChain, isConnected } = context;
  const { testnetOnly, mainnetOnly } = props;

  const changeLocation = () => {
    const { pathname, search } = window.location;
    if (isTestnet) {
      window.location.replace(`https://narfex.com${pathname}${search}`);
    } else {
      window.location.replace(`https://testnet.narfex.com${pathname}${search}`);
    }
  };

  const Body = ({ isChainChanger, isLocationChanger }) => {
    return (
      <div className="TestnetOverlay__wrap">
        <div className="TestnetOverlay__background"></div>
        <div className="TestnetOverlay__content">
          <h2>
            {getLang('dapp_page_for')}&nbsp;
            {testnetOnly ? 'Testnet' : 'Mainnet'}
          </h2>
          {isLocationChanger && (
            <div className="TestnetOverlay__buttons">
              <Button onClick={changeLocation} type="lightBlue" shadow>
                {getLang('dapp_go_to_page')}&nbsp;
                {testnetOnly ? 'Testnet' : 'Mainnet'}
              </Button>
            </div>
          )}
          {isChainChanger && (
            <div className="TestnetOverlay__buttons">
              <Button
                onClick={() => switchToChain(testnetOnly ? 97 : 56)}
                type="lightBlue"
                shadow
              >
                {getLang('dapp_switch_your_chain')}
              </Button>
            </div>
          )}
          {/*<Button onClick={() => changeLocation()}>*/}
          {/*{testnetOnly ? 'Go to Testnet' : 'Go to Mainnet'}*/}
          {/*</Button>*/}
        </div>
      </div>
    );
  };

  if ((!mainnetOnly && !testnetOnly) || !isConnected) return <></>;
  if (window.location.hostname === 'localhost')
    return (
      <>
        Будет перенаправлено на {mainnetOnly ? 'mainnet' : 'testnet'} в
        продакшене
      </>
    );

  if (testnetOnly && isTestnet) {
    if (chainId !== 97) {
      return <Body isChainChanger />;
    }

    return <></>;
  }

  if (mainnetOnly && !isTestnet) {
    if (chainId !== 56) {
      return <Body isChainChanger />;
    }

    return <></>;
  }

  return <Body isLocationChanger />;
};

export default TestnetOverlay;
