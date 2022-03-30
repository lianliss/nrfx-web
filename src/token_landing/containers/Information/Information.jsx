import React from 'react';

import './Information.less';
import TokenButton from '../../components/TokenButton/TokenButton';

function Information() {
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
            <TokenButton className="light-btn">Narfex Exchange</TokenButton>
          </div>
        </div>
        <div className="Information__column"></div>
      </div>
    </section>
  );
}

export default Information;
