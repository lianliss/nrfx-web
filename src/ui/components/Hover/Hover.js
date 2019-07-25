import './Hover.less';

import React from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils';

export default function Hover({ bordered, children, className, tagName, onClick }) {
  const TagName = tagName || 'div';
  return (
    <TagName
      className={classNames({
        Hover: true,
        bordered: !!bordered,
        [className]: !!className
      })}
      onClick={onClick}
    >
      {children}
    </TagName>
  )
}

Hover.propTypes = {
  bordered: PropTypes.bool,
  className: PropTypes.string,
  tagName: PropTypes.string,
  onClick: PropTypes.func
};
