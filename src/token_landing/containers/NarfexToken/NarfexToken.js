import React from 'react';

import './NarfexToken.less';
import TokenButton from '../../components/TokenButton/TokenButton';
import SVG from 'utils/svg-wrap';
import router from 'src/router';
import { DAPP_PRO_DEX } from 'src/index/constants/pages';
import { getLang } from 'utils';

const NarfexToken = (props) => {
  return (
    <section className="NarfexToken">
      <div className="NarfexToken__blocks">
        <div className="NarfexToken__block">
          <h1>{getLang('token_landing_narfex_token')}</h1>
          <p>{getLang('token_landing_narfex_token_text')}</p>
          <div className="NarfexToken__buttons">
            <TokenButton
              onClick={() => router.navigate(DAPP_PRO_DEX)}
              className="light-btn"
            >
              {getLang('token_landing_buy_on_narfex')}
            </TokenButton>
            <a
              href={
                'https://app.uniswap.org/#/swap' +
                '?inputCurrency=' +
                '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' +
                '&outputCurrency=0xCc17e34794B6c160a0F61B58CF30AA6a2a268625' +
                '&slippage=3000'
              }
              target="_blank"
            >
              <SVG src={require('asset/token/wallet.svg')} />
              <span>{getLang('token_landing_buy_on_pancake')}</span>
            </a>
          </div>
        </div>
        <div className="NarfexToken__block">
          <img src={require('src/asset/NarfexTokenEcosystem.svg').default} />
        </div>
      </div>
    </section>
  );
};

export default NarfexToken;
