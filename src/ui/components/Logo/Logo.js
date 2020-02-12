import './Logo.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import PropTypes from 'prop-types';
import { classNames as cn } from '../../utils/';

const Logo = props => {
  const images = {
    white: require('../../../asset/logo/white.svg'),
    gray: require('../../../asset/logo/gray.svg'),
    default: require('../../../asset/logo/default.svg'),
    flat: require('../../../asset/logo/flat.svg'),
    monochrome: require('../../../asset/logo/monochrome.svg'),
    christmas: require('../../../asset/logo/christmas.svg'),
  };

  let type = props.type;

  // if (type === 'default') {
  //   type = 'christmas';
  // }

  return (
    <div className={cn("Logo", props.size, {currentColor: props.currentColor})}>
      <SVG src={images[type]} />
    </div>
  )
};

Logo.defaultProps = {
  type: 'default',
  size: 'middle'
};


Logo.propTypes = {
  size: PropTypes.oneOf(['middle', 'large']),
};


export default React.memo(Logo);
