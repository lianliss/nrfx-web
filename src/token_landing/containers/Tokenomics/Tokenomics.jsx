import React from 'react';
import PropTypes from 'prop-types';

import './Tokenomics.less';

import { getLang } from 'utils';
import SVG from 'utils/svg-wrap';
import tokenomicsCircle from './components/assets/tokenomics-modern.svg';
import { tokenomics } from '../../constants/tokenomics';

import Info from './components/Info/Info';

function Tokenomics({ adaptive }) {
  // Last tokenomics item to First.
  const lastTokenomicsItem = tokenomics.slice(-1);
  const adaptiveTokenomics = [...lastTokenomicsItem, ...tokenomics].slice(0, 6);

  return (
    <section className="Tokenomics">
      {!adaptive && (
        <div className="Tokenomics__container">
          <div className="Tokenomics__circle">
            <SVG src={tokenomicsCircle} />
            <h3 className="Tokenomics__title">
              {getLang('token_landing_tokenomics_title')}
            </h3>
            <div className="Tokenomics__items">
              {tokenomics &&
                tokenomics.map((item, key) => {
                  return <Info key={key} {...item} />;
                })}
            </div>
          </div>
        </div>
      )}
      {adaptive && (
        <div className="Tokenomics__container">
          <div className="Tokenomics__circle">
            <h3 className="Tokenomics__title">
              {getLang('token_landing_tokenomics_title')}
            </h3>
            <SVG src={tokenomicsCircle} className="Tokenomics__circle-image" />
            <div className="Tokenomics__items">
              {adaptiveTokenomics &&
                adaptiveTokenomics.map((item, key) => (
                  <Info key={key} {...item} adaptive={adaptive} />
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

Tokenomics.propTypes = {
  adaptive: PropTypes.bool,
};

Tokenomics.defaultProps = {
  adaptive: false,
};

export default Tokenomics;
