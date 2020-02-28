import './CircleIcon.less';

import React from 'react';
import hexToRgba from 'hex-to-rgba';
import SVG from 'react-inlinesvg';

export default props => {
  const { currency, icon } = props;
  return <div
    className="CircleIcon"
    style={{
      background: currency.background,
      boxShadow: `0px 4px 8px ${hexToRgba(currency.color || '#AAA', .3)}`
    }}
  >
    {icon && <SVG src={icon}/>}
  </div>
}
