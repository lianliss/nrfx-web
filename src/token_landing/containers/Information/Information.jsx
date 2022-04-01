import React from 'react';
import PropTypes from 'prop-types';

import './Information.less';
import Lang from "src/components/Lang/Lang";
import TokenButton from '../../components/TokenButton/TokenButton';
import CopyText from './components/CopyText/CopyText';
import Card from './components/Card/Card';

// Card Images
import laptopImage from './assets/101.svg';
import tabletImage from './assets/100.svg';
import laptopImageMobile from './assets/101m.svg';
import tabletImageMobile from './assets/100m.svg';

function Information({ code, adaptive }) {
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
          {!adaptive && (
            <div className="Information__action">
              <CopyText text={code} />
              <TokenButton className="light-btn">Narfex Exchange</TokenButton>
            </div>
          )}
        </div>
        <div className="Information__column">
          <Card
            title="Video /n Instruction"
            actionText="Watch video"
            src={adaptive ? tabletImageMobile : tabletImage}
            position={{ left: -33, top: 28.12 }}
          />
          <Card
            title="Text /n Instruction"
            actionText="Read More"
            src={adaptive ? laptopImageMobile : laptopImage}
            position={{ left: 7.83, top: -19.81 }}
          />
        </div>
        {adaptive && (
          <div className="Information__action">
            <CopyText text={code} />
            <TokenButton className="light-btn">Narfex Exchange</TokenButton>
          </div>
        )}
      </div>
    </section>
  );
}

Information.defaultProps = {
  code: '',
  adaptive: false,
};

Information.propTypes = {
  code: PropTypes.string,
  adaptive: PropTypes.bool,
};

export default Information;
