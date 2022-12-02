import React from 'react';

// Components
import { AnswerPopup } from 'dapp';
import SVG from 'utils/svg-wrap';

// Utils
import { getLang } from 'utils';
import _ from 'lodash';

// Styles
import './DexRoute.less';

function DexRoute({ route = [], tokens = [] }) {
  return (
    <div className="DexRoute">
      <h3>
        <span>{getLang('dex_route')}</span>
        <AnswerPopup>{getLang('dex_route_hint')}</AnswerPopup>
      </h3>
      <div className="DexRoute-container">
        {route &&
          route.map((symbol, index) => {
            const token = tokens.find((t) => t.symbol === symbol);
            const logo = _.get(token, 'logoURI', '');
            return (
              <div className="DexRoute-symbol" key={`${symbol}-${index}`}>
                {!!index && (
                  <SVG
                    src={require('src/asset/icons/triangle-right.svg')}
                    className="DexRoute-arrow"
                  />
                )}
                <div
                  className="DexRoute-logo"
                  style={{ backgroundImage: `url('${logo}')` }}
                />
                <span>{symbol}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DexRoute;
