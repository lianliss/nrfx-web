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

function WalletsExists() {
  // Design
  const { router } = useRoute();
  const adaptive = useSelector((store) => store.default.adaptive);
  const rates = useSelector(web3RatesSelector);

  // Tabs
  const [switchTab, setSwitchTab] = React.useState('tokens');
  const isTokens = switchTab === 'tokens';
  const isFiat = switchTab === 'fiat';
  const isNfts = switchTab === 'nfts' || !adaptive;

  // Main
  const {
    accountAddress,
    balances,
    loadAccountBalances,
    updateFiats,
    tokens,
  } = React.useContext(Web3Context);
  const fineTokens = tokens.filter((t) => t.balance && t.balance !== '0');

  React.useEffect(() => {
    if (!accountAddress) return;

    updateFiats(null, rates);
    loadAccountBalances(accountAddress);
  }, [accountAddress]);

  React.useEffect(() => {
    setSwitchTab('tokens');
  }, [adaptive]);

  return (
    <div className="WalletsExists">
      <div className="WalletsExists__container">
        <WalletsHeader isFiat={isFiat} />
        {adaptive && (
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
        {!adaptive && (
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
              adaptive={adaptive}
            />
          )}
          {isFiat && (
            <BalancesBlock
              balances={balances.fiats}
              type="fiats"
              title={getLang('dapp_global_fiats')}
              adaptive={adaptive}
            />
          )}
          {isNfts && <NftsBlock />}
        </div>
      </div>
    </div>
  );
}

export default WalletsExists;
