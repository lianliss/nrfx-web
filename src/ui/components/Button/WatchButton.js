import React from 'react';
import './Button.less';
import PropTypes from 'prop-types';

export default function WatchButton(props) {
  return (
    <div
      className="WatchButton"
      onClick={() => props.onClick && props.onClick()}
      style={props.style}
    >
      <div className="WatchButton__icon" />
      <div className="WatchButton__label">{props.children}</div>
    </div>
  )
}

WatchButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object
};
