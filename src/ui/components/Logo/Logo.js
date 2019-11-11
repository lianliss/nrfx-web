import './Logo.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import { classNames as cn } from '../../utils/';

export default props => (
  <div className={cn("Logo", { currentColor: props.currentColor })}>
    <SVG src={require('../../../asset/logo_monochrome.svg')} />
  </div>
);