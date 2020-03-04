import './Clipboard.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import { classNames as cn } from '../../utils';

export default props => {
  return (
    <div onClick={() => props.onClick(props.text)} className={cn('Clipboard', props.className)}>
      {props.text}{!props.skipIcon && <SVG src={require('src/asset/24px/copy.svg')} />}
    </div>
  );
}
