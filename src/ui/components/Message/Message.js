import './Message.less';

import React  from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils';


export default function Message(props) {
  const isAlert = props.alert;
  const className = classNames({
    Message: true,
    [props.type]: !!props.type,
    alert: isAlert
  });

  return (
    <div className={className}>
      {isAlert && <div className="Message__icon" />}
      <div className="Message__label">{props.children}</div>
      {isAlert && <div className="Message__close" onClick={props.onHide} />}
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.oneOf(['error', 'warning', 'success']),
  alert: PropTypes.bool,
  onHide: PropTypes.func
};
