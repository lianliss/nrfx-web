import React from 'react';

import SVG from 'utils/svg-wrap';
import quoteIcon from '../../assets/quote.svg';
import { getLang } from 'utils';

import './QuoteWindow.less';

function QuoteWindow({ defaultText, gradientText }) {
  return (
    <div className="QuoteWindow">
      <div className="QuoteWindow__container">
        <SVG src={quoteIcon} className="QuoteWindow__icon" />
        <p>
          {getLang(defaultText)}&nbsp;
          <span className="gradient-text">{getLang(gradientText)}</span>
        </p>
      </div>
    </div>
  );
}

export default QuoteWindow;
