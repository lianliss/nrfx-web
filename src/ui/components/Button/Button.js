import './Button.less';

import React from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils';


function Button(props) {
  const className = classNames({
    Button: true,
    [props.size]: !!props.size,
    disabled: props.disabled,
    [props.type]: !!props.type,
    [props.newClass]: !!props.newClass,
    rounded: props.rounded
  });

  return (
    <button
      className={className}
      onClick={() => props.onClick && props.onClick()}
      style={props.style}
      type={props.btnType}
    >
      <div className="Button__cont">
        {props.beforeContent}
        <div className="Button__label">{props.children}</div>
        {props.afterContent}
      </div>
      {(props.type === 'outline' || props.type === 'negative_outline') && <div className="Button__outline_helper" />}
    </button>
  )
}

Button.propTypes = {
  size: PropTypes.oneOf(['small']),
  type: PropTypes.oneOf(['secondary', 'outline', 'negative', 'negative_outline', 'outline_white']),
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  beforeContent: PropTypes.node,
  afterContent: PropTypes.node
};

export default React.memo(Button);