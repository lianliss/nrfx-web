import './Logo.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import { classNames as cn } from '../../utils/';


const Logo = props => {
  const images = {
    white: require('../../../asset/logo/white.svg'),
    gray: require('../../../asset/logo/gray.svg'),
    default: require('../../../asset/logo/default.svg'),
    flat: require('../../../asset/logo/flat.svg'),
    monochrome: require('../../../asset/logo/monochrome.svg'),
  }

  return (
    <div className={cn("Logo", {currentColor: props.currentColor})}>
      <SVG src={images[props.type]}/>
    </div>
  )
};

Logo.defaultProps = {
  type: 'default'
};


export default Logo;