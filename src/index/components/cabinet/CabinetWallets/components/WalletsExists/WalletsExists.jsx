import React from 'react';
import { useSelector } from 'react-redux';

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
import { testItems } from './testItems.js';
import SVG from 'utils/svg-wrap';

// Constants
import currencies from 'src/currencies';

function WalletsExists() {
  const adaptive = useSelector((store) => store.default.adaptive);
  const [switchTab, setSwitchTab] = React.useState('tokens');
  const isTokens = switchTab === 'tokens' || !adaptive;
  const isNfts = switchTab === 'nfts' || !adaptive;

  const TokenItemControls = (
    { price, amount, currency } // Texts
  ) => (
    <div className="CabinetWallets__tokens-controls">
      <div>
        <p className="WalletsListItem__text-large">
          {price} {currency.toUpperCase()}
        </p>
        <p className="WalletsListItem__text-medium">{amount} USD</p>
      </div>
      <div>
        <SVG src={require('src/asset/icons/list-arrow-large.svg')} />
      </div>
    </div>
  );

  return (
    <div className="WalletsExists">
      <div className="WalletsExists__container">
        <WalletsHeader />
        {adaptive && (
          <div className="WalletsExists__switch">
            <SwitchTabs
              selected={switchTab}
              onChange={setSwitchTab}
              isAnimated={false}
              tabs={[
                { value: 'tokens', label: 'Tokens' },
                { value: 'nfts', label: 'NFT' },
              ]}
            />
          </div>
        )}
        <div className="WalletsExists__content">
          {isTokens && (
            <CabinetBlock className="wallets-list">
              {!adaptive && (
                <div className="WalletsExists__items_header">
                  <span>your tokens</span>
                  <div className="CabinetScrollBlock__headerTool">
                    <OpenPopupLink title="history" />
                  </div>
                </div>
              )}
              <CabinetScrollBlock>
                <WalletsList type="default">
                  {testItems.map((item, key) => {
                    // Testing values. Don't know what object maybe here.
                    const { name } = currencies[item.currency];
                    let icon = '';

                    // Set icon
                    try {
                      icon = require(`src/asset/icons/wallets/${item.currency}.svg`);
                    } catch {
                      console.log('Icon is not defined');
                    }

                    return (
                      <WalletsListItem
                        icon={<SVG src={icon} />}
                        startTexts={[
                          name,
                          <span className="CabinetWallets__tokens-content">
                            {item.price} USD
                            <RateIndicator type="up" number={12} procent />
                          </span>,
                        ]}
                        controls={
                          <TokenItemControls
                            amount={item.amount}
                            currency={item.currency}
                            price={item.price}
                          />
                        }
                        key={key}
                        type="reverse"
                      />
                    );
                  })}
                </WalletsList>
              </CabinetScrollBlock>
              {adaptive && (
                <div className="WalletsExists__items_footer">
                  <OpenPopupLink title="history" />
                </div>
              )}
            </CabinetBlock>
          )}
          {isNfts && (
            <CabinetBlock className="nfts">
              {!adaptive && (
                <div className="WalletsExists__items_header">
                  <span>your nft</span>
                  <div className="CabinetScrollBlock__headerTool">
                    <OpenPopupLink title="history" />
                  </div>
                </div>
              )}
              <CabinetScrollBlock disableTrackXMousewheelScrolling>
                <div className="WalletsNFT__cards">
                  <WalletsNFTCard title="Monkey" src={'1'} />
                  <WalletsNFTCard title="Hello Kitty 1445" src={'2'} />
                  <WalletsNFTCard title="Degen Ape 6" src={'4'} />
                  <WalletsNFTCard title="Degen Ape 6" src={'5'} />
                  <WalletsNFTCard title="Brod 45" src={'3'} />
                  <WalletsNFTCard title="Monkey" src={'1'} />
                  <WalletsNFTCard title="Hello Kitty 1445" src={'2'} />
                  <WalletsNFTCard title="Degen Ape 6" src={'4'} />
                  <WalletsNFTCard title="Degen Ape 6" src={'5'} />
                  <WalletsNFTCard title="Brod 45" src={'3'} />
                  <WalletsNFTCard title="Hello Kitty 1445" src={'2'} />
                  <WalletsNFTCard title="Degen Ape 6" src={'5'} />
                  <WalletsNFTCard title="Brod 45" src={'3'} />
                </div>
              </CabinetScrollBlock>
              {adaptive && (
                <div className="WalletsExists__items_footer">
                  <OpenPopupLink title="history" />
                </div>
              )}
            </CabinetBlock>
          )}
        </div>
      </div>
    </div>
  );
}

export default WalletsExists;
