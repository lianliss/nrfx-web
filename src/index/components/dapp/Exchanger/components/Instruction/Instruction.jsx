import React from 'react';

// Components
import { ContentBox } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import { openModal } from 'src/actions';
import { REGISTRATION } from 'src/components/AuthModal/fixtures.js';

// Styles
import './Instruction.less';

function Instruction() {
  const SVGContainer = ({ icon }) => {
    return (
      <div className={`${icon} Exchanger__Instruction__bg-icon`}>
        <SVG src={require(`../../asset/${icon}.svg`)} />
      </div>
    );
  };

  return (
    <ContentBox className="Exchanger__Instruction">
      <SVGContainer icon="wallets-bg" />
      <SVGContainer icon="usd-coin" />
      <SVGContainer icon="narfex-usdt-coins" />
      <SVGContainer icon="narfex-usdt-coins-adaptive" />
      <SVGContainer icon="narfex-coin" />
      <div className="Exchanger__Instruction__content">
        <div className="row">
          <div className="col">
            <div className="title">1. Sign up</div>
            <div className="description">
              Registration is required only to work with the exchanger. We are
              in the process of fixing this and switching to smart contracts.
            </div>
            <div
              className="link"
              onClick={() => {
                openModal('auth', { type: REGISTRATION });
              }}
            >
              Sign up ›
            </div>
          </div>
          <div className="col">
            <div className="title">2. Fill your balance</div>
            <div className="description">
              Choose your preferred method of payment to deposit directly into
              your account by bank transfer: by credit card or a bank transfer.
            </div>
            <div className="link">Top up balance ›</div>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className="title">3. Exchange currencies</div>
            <div className="description">
              Buy Bitcoin, Ethereum, Litecoin and other crypto with fiats
              directly on your wallet. Send it out to friends, stake it, or
              trade on the DEX exchange.
            </div>
            <div
              className="link"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Exchange ›
            </div>
          </div>
        </div>
      </div>
    </ContentBox>
  );
}

export default Instruction;
