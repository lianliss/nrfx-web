import React from 'react';

import './NarfexToken.less';
import TokenButton from '../../components/TokenButton/TokenButton';
import SVG from 'utils/svg-wrap';
import * as actions from "actions/landing/buttons";

const NarfexToken = props => {
  return (
    <section className="NarfexToken">
      <div className="NarfexToken__blocks">
        <div className="NarfexToken__block">
          <h1>
            Narfex Token
          </h1>
          <p>
            The Narfex token facilitates multiple tokenomics, serving as a utility token and governance token.
          </p>
          <div className="NarfexToken__buttons">
            <TokenButton onClick={() => actions.swap()} className="light-btn">Buy on Narfex</TokenButton>
            <a href="https://pancakeswap.finance/swap" target="_blank">
              <SVG src={require('asset/token/wallet.svg')} />
              <span>
                Buy on<br/>Pancakeswap
              </span>
            </a>
          </div>
        </div>
        <div className="NarfexToken__block">
          <img src="https://static.narfex.com/img/NarfexTokenEcosystem.svg" />
        </div>
      </div>
    </section>
  );
};

export default NarfexToken;
