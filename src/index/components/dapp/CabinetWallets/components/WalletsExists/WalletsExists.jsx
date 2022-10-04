import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute } from 'react-router5';

// Components
import './WalletsExists.less';
import WalletsHeader from '../WalletsHeader/WalletsHeader';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import CabinetScrollBlock from '../../../CabinetScrollBlock/CabinetScrollBlock';
import WalletsList from '../../../WalletsList/WalletsList';
import WalletsListItem from '../../../WalletsList/components/WalletsListItem/WalletsListItem';
import WalletsNFTCard from '../WalletsNFTCard/WalletsNFTCard';
import OpenPopupLink from '../../../OpenPopupLink/OpenPopupLink';
import { RateIndicator, SwitchTabs } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import * as PAGES from 'src/index/constants/pages';
import { testFiats } from './testItems.js';
import currencies from 'src/currencies';
import { Web3Context } from 'src/services/web3Provider';
import BalancesBlock from './components/BalancesBlock/BalancesBlock';
import NftsBlock from './components/NftsBlock/NftsBlock';
import { getLang } from 'src/utils';
import { web3RatesSelector } from 'src/selectors';
import { marketCoins } from 'src/services/coingeckoApi';
import { setWalletTokens } from 'src/actions/dapp/wallet';

function WalletsExists() {
  // Design
  const { router } = useRoute();
  const dispatch = useDispatch();
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
    isConnected,
    balances,
    loadAccountBalances,
    updateFiats,
    tokens,
  } = React.useContext(Web3Context);

  React.useEffect(() => {
    if (!accountAddress) return;

    updateFiats(null, rates);
    // loadAccountBalances(accountAddress);
  }, [accountAddress]);

  React.useEffect(() => {
    if (!isConnected) return;

    setCoins();
  }, [isConnected]);

  const setCoins = async () => {
    const topCoingeckoCoins = await marketCoins();
    const topCoinsSymbols = topCoingeckoCoins.map((coin) => coin.symbol);
    const pancakeTokens = tokens;

    const topCoins = pancakeTokens.filter((token) => {
      return topCoinsSymbols.find(
        (coinSymbol) => token.symbol.toLowerCase() === coinSymbol.toLowerCase()
      );
    });

    
    dispatch(setWalletTokens([pancakeTokens[0], ...topCoins]));
  };

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
              balances={balances.tokens}
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
