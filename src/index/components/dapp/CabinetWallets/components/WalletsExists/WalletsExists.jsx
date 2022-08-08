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

function WalletsExists() {
  // Design
  const { router } = useRoute();
  const adaptive = useSelector((store) => store.default.adaptive);

  // Tabs
  const [switchTab, setSwitchTab] = React.useState('tokens');
  const isTokens = switchTab === 'tokens';
  const isFiat = switchTab === 'fiat';
  const isNfts = switchTab === 'nfts' || !adaptive;

  // Main
  const { accountAddress, balances, loadAccountBalances } =
    React.useContext(Web3Context);

  const { tokens } = balances;

  React.useEffect(() => {
    if (!accountAddress) return;

    loadAccountBalances(accountAddress);
  }, [accountAddress]);

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
                { value: 'tokens', label: 'Tokens' },
                { value: 'nfts', label: 'NFT' },
                { value: 'fiat', label: 'Fiat' },
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
                  { value: 'tokens', label: 'Tokens' },
                  { value: 'fiat', label: 'Fiat' },
                ]}
              />
            </div>
            <div />
          </div>
        )}
        <div className="WalletsExists__content WalletsExists__row">
          {isTokens && (
            <BalancesBlock
              balances={tokens}
              type="tokens"
              title="Tokens"
              adaptive={adaptive}
            />
          )}
          {isFiat && (
            <BalancesBlock
              balances={testFiats}
              type="fiats"
              title="fiat"
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
