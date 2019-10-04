import './InternalNotification.less';
import React from 'react';
import SVG from 'react-inlinesvg';

export default props => {
  return (
    <div className="InternalNotification" onClick={props.onAccept}>
      <div className="InternalNotification__message">{props.message}</div>
      {!props.adaptive && <button onClick={props.onAccept} className="InternalNotification__button">{props.acceptText}</button>}
      <div onClick={e => {
        e.stopPropagation();
        props.onClose();
      }} className="InternalNotification__close">
        <SVG src={require('../../../asset/24px/close-small.svg')} />
      </div>
    </div>
  );
}