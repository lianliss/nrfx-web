import './Label.less';

import React from 'react';
import SVG from 'react-inlinesvg';

export default props => (
  <div className="Label">
    <div className="Label__name">{props.name}</div>
    <div className="Label__value">{typeof props.value === 'object' ? props.value.join('; ') : props.value}</div>
    <div className="Label__cancel" onClick={props.onCancel}>
      <SVG src={require('../../../asset/24px/close-xs.svg')} />
    </div>
  </div>
)