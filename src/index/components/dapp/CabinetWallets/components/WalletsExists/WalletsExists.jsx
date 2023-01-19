import React from 'react';
import { useSelector } from 'react-redux';
import { useRoute } from 'react-router5';

// Components
import './WalletsExists.less';
import WalletsHeader from '../WalletsHeader/WalletsHeader';
import { SwitchTabs } from 'src/ui';

// Utils
import { Web3Context } from 'src/services/web3Provider';
import BalancesBlock from './components/BalancesBlock/BalancesBlock';
import NftsBlock from './components/NftsBlock/NftsBlock';
import { getLang } from 'src/utils';
import { web3RatesSelector } from 'src/selectors';
import useAdaptive from 'src/hooks/adaptive';
import { DESKTOP } from 'src/index/constants/breakpoints';

const WalletsExists = React.memo(
  ({
    accountAddress,
    chainId,
    tokensChain,
    balances,
    loadAccountBalances,
    updateFiats,
    getTokens,
    tokens,
  }) => {
    // Design
    const { router } = useRoute();
    const isSmallDisplay = useAdaptive(DESKTOP, false);
    const rates = useSelector(web3RatesSelector);

    // Tabs
    const [switchTab, setSwitchTab] = React.useState('tokens');
    const isTokens = switchTab === 'tokens';
    const isFiat = switchTab === 'fiat';
    const isNfts = switchTab === 'nfts' || !isSmallDisplay;

    const fineTokens = tokens.filter((t) => t.balance && t.balance !== '0');

    React.useEffect(() => {
      if (!accountAddress) return;

      updateFiats(null, rates);
      if (tokensChain !== chainId) {
        getTokens().then(() => {
          loadAccountBalances(accountAddress);
        });
      } else {
        loadAccountBalances(accountAddress);
      }
    }, [accountAddress, chainId]);

    React.useEffect(() => {
      setSwitchTab('tokens');
    }, [isSmallDisplay]);

    return (
      <div className="WalletsExists">
        <div className="WalletsExists__container">
          <WalletsHeader isFiat={isFiat} />
          {isSmallDisplay && (
            <div className="WalletsExists__switch">
              <SwitchTabs
                selected={switchTab}
                onChange={setSwitchTab}
                isAnimated={false}
                tabs={[
                  { value: 'tokens', label: getLang('dapp_global_tokens') },
                  { value: 'nfts', label: 'NFT' },
                  { value: 'fiat', label: getLang('dapp_global_fiats') },
                ]}
              />
            </div>
          )}
          {!isSmallDisplay && (
            <div className="WalletsExists__row">
              <div>
                <SwitchTabs
                  type="light-blue"
                  selected={switchTab}
                  onChange={setSwitchTab}
                  isAnimated={false}
                  tabs={[
                    { value: 'tokens', label: getLang('dapp_global_tokens') },
                    { value: 'fiat', label: getLang('dapp_global_fiats') },
                  ]}
                />
              </div>
              <div />
            </div>
          )}
          <div className="WalletsExists__content WalletsExists__row">
            {isTokens && (
              <BalancesBlock
                balances={fineTokens}
                type="tokens"
                title={getLang('dapp_global_tokens')}
                adaptive={isSmallDisplay}
              />
            )}
            {isFiat && (
              <BalancesBlock
                balances={balances.fiats.sort((a, b) => b.balance - a.balance)}
                type="fiats"
                title={getLang('dapp_global_fiats')}
                adaptive={isSmallDisplay}
              />
            )}
            {isNfts && <NftsBlock />}
          </div>
        </div>
      </div>
    );
  }
);

function WalletsExistsWrapper() {
  // Main
  const {
    accountAddress,
    chainId,
    tokensChain,
    balances,
    loadAccountBalances,
    updateFiats,
    getTokens,
    tokens,
  } = React.useContext(Web3Context);

  const useGetTokens = React.useCallback(getTokens, [
    chainId,
    accountAddress,
    tokensChain,
  ]);
  const useUpdateFiats = React.useCallback(updateFiats, [
    chainId,
    accountAddress,
  ]);
  const useLoadAccountBalances = React.useCallback(loadAccountBalances, [
    chainId,
    accountAddress,
  ]);

  return (
    <WalletsExists
      accountAddress={accountAddress}
      chainId={chainId}
      tokensChain={tokensChain}
      balances={balances}
      loadAccountBalances={useLoadAccountBalances}
      updateFiats={useUpdateFiats}
      getTokens={useGetTokens}
      tokens={tokens}
    />
  );
}

export default WalletsExistsWrapper;
