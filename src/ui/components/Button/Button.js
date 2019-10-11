// styles
import './Button.less';
// external
import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
// internal
import {classNames} from '../../utils';

function Button(props) {
  const className = classNames({
    Button: true,
    [props.size]: !!props.size,
    disabled: props.disabled || props.state === 'disabled',
    [props.type]: !!props.type,
    [props.newClass]: !!props.newClass,
    rounded: props.rounded,
    forCabinet: !!props.forCabinet,
    smallPadding: props.smallPadding,
    [props.currency]: !!props.currency,
    [props.state]: !!props.state
  });

  return (
    <button
      className={className}
      onClick={(e) => props.onClick && props.onClick(e)}
      style={props.style}
      type={props.btnType}
    >
      {props.state === 'loading' && <div className="Button__loader"><SVG src={require('../../asset/spinner.svg')} /></div>}
      <div className="Button__cont">
        {props.beforeContent}
        <div className="Button__label" style={props.fontSize ? {fontSize: props.fontSize} : {}}>{props.children}</div>
        {props.afterContent}
      </div>
      {(props.type === 'outline' || props.type === 'negative_outline') && <div className="Button__outline_helper" />}
    </button>
  )
}

Button.propTypes = {
  size: PropTypes.oneOf(['', 'small', 'large', 'ultra_small', 'middle']),
  type: PropTypes.oneOf(['', 'secondary', 'outline', 'negative', 'negative_outline', 'outline_white', 'sell', 'buy', 'primary']),
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  beforeContent: PropTypes.node,
  afterContent: PropTypes.node,
  smallPadding: PropTypes.bool,
  currency: PropTypes.string,
  state: PropTypes.oneOf(['', 'loading', 'disabled'])
};

export default React.memo(Button);