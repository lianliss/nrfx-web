import React from 'react';

import './Information.less';
import TokenButton from '../../components/TokenButton/TokenButton';
import CopyText from './components/CopyText/CopyText';
import Card from './components/Card/Card';

// Card Images
import laptopImage from './assets/101.svg';
import tabletImage from './assets/100.svg';

function Information({ code }) {
  return (
    <section className="Information">
      <div className="Information__container">
        <div className="Information__column">
          <h2 className="Information__title">How buy token?</h2>
          <p className="Information__description">
            Buying NRFX is easy with Narfex Exchanger. We've created tutorials
            to show you how to buy NRFX from start to finish. You can buy Narfex
            Token on both Narfex and PancakeSwap.
          </p>
          <div className="Information__action">
            <CopyText text="0x86c86ffdc0482d8d" />
            <TokenButton className="light-btn">Narfex Exchange</TokenButton>
          </div>
        </div>
        <div className="Information__column">
          <Card
            title="Video /n Instruction"
            actionText="Watch video"
            src={tabletImage}
            position={{ left: -33, top: 28.12 }}
          />
          <Card
            title="Text /n Instruction"
            actionText="Read More"
            src={laptopImage}
            position={{ left: 7.83, top: -19.81 }}
          />
        </div>
      </div>
    </section>
  );
}

export default Information;
