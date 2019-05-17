import React from 'react';
import { classNames } from '../../utils';
import './Button.less';
import PropTypes from 'prop-types';

export default function Button(props) {
  const className = classNames({
    Button: true,
    [props.size]: !!props.size,
    disabled: props.disabled,
    [props.type]: !!props.type,
    rounded: props.rounded
  });
  return (
    <div
      className={className}
      onClick={() => props.onClick && props.onClick()}
    >
      <div className="Button__label">{props.children}</div>
      {(props.type === 'outline' || props.type === 'negative_outline') && <div className="Button__outline_helper" />}
      </div>
  )
}

Button.propTypes = {
  size: PropTypes.oneOf(['small']),
  type: PropTypes.oneOf(['secondary', 'outline', 'negative', 'negative_outline']),
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  onClick: PropTypes.func
};
