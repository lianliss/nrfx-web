import React from 'react';

import './WalletsExists.less';
import WalletsHeader from '../WalletsHeader/WalletsHeader';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import CabinetScrollBlock from '../../../CabinetScrollBlock/CabinetScrollBlock';
import WalletsList from '../../../WalletsList/WalletsList';
import WalletsListItem from '../../../WalletsList/components/WalletsListItem/WalletsListItem';
import WalletsNFTCard from '../WalletsNFTCard/WalletsNFTCard';
import OpenPopupLink from '../../../OpenPopupLink/OpenPopupLink';
import { RateIndicator } from 'src/ui';
import { testItems } from './testItems.js';
import SVG from 'utils/svg-wrap';
import currencies from 'src/currencies';

function WalletsExists() {
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
        <div className="WalletsExists__content">
          <CabinetBlock>
            <div className="WalletsExists__items_header">
              <span>your tokens</span>
              <div className="CabinetScrollBlock__headerTool">
                <OpenPopupLink title="history" />
              </div>
            </div>
            <CabinetScrollBlock>
              <WalletsList type="default">
                {testItems.map((item, key) => {
                  // Testing values. Don't know what object maybe here.
                  const { name, icon, gradient } = currencies[item.currency];
                  const iconGradient = `linear-gradient(to bottom, ${gradient[0]} 0%, ${gradient[1]} 100%)`;

                  return (
                    <WalletsListItem
                      icon={
                        <img src={icon} style={{ background: iconGradient }} />
                      }
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
          </CabinetBlock>
          <CabinetBlock>
            <div className="WalletsExists__items_header">
              <span>your nft</span>
              <div className="CabinetScrollBlock__headerTool">
                <OpenPopupLink title="history" />
              </div>
            </div>
            <CabinetScrollBlock disableTrackXMousewheelScrolling>
              <div className="WalletsNFT__cards">
                <WalletsNFTCard title="Monkey" src={1} />
                <WalletsNFTCard title="Hello Kitty 1445" src={2} />
                <WalletsNFTCard title="Degen Ape 6" src={4} />
                <WalletsNFTCard title="Degen Ape 6" src={5} />
                <WalletsNFTCard title="Brod 45" src={3} />
                <WalletsNFTCard title="Monkey" src={1} />
                <WalletsNFTCard title="Hello Kitty 1445" src={2} />
                <WalletsNFTCard title="Degen Ape 6" src={4} />
                <WalletsNFTCard title="Degen Ape 6" src={5} />
                <WalletsNFTCard title="Brod 45" src={3} />
                <WalletsNFTCard title="Hello Kitty 1445" src={2} />
                <WalletsNFTCard title="Degen Ape 6" src={5} />
                <WalletsNFTCard title="Brod 45" src={3} />
              </div>
            </CabinetScrollBlock>
          </CabinetBlock>
        </div>
      </div>
    </div>
  );
}

export default WalletsExists;
