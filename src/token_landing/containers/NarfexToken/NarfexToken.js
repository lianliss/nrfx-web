import React from 'react';

import './NarfexToken.less';
import TokenButton from '../../components/TokenButton/TokenButton';
import SVG from 'utils/svg-wrap';
import * as actions from "actions/landing/buttons";
import {getLang} from 'utils';

const NarfexToken = props => {
  return (
    <section className="NarfexToken">
      <div className="NarfexToken__blocks">
        <div className="NarfexToken__block">
          <h1>
            {getLang('token_landing_narfex_token')}
          </h1>
          <p>
            {getLang('token_landing_narfex_token_text')}
          </p>
          <div className="NarfexToken__buttons">
            <TokenButton onClick={() => actions.swap()} className="light-btn">
              {getLang('token_landing_buy_on_narfex')}
            </TokenButton>
            <a href="https://pancakeswap.finance/swap?outputCurrency=0x3764Be118a1e09257851A3BD636D48DFeab5CAFE" target="_blank">
              <SVG src={require('asset/token/wallet.svg')} />
              <span>
                {getLang('token_landing_buy_on_pancake')}
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
