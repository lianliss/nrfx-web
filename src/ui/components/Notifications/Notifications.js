// styles
import './Notifications.less';
// external
import React from 'react';
import PropTypes from 'prop-types';
// internal
import UI from '../../index';
import {classNames} from '../../utils';

export function Notification(props) {
  return (
    <div className={classNames(props.classNames, "Notification", { unread: props.unread })}>
      <div
        className="Notification__icon"
        style={{backgroundImage: (props.icon && `url(${props.icon})`)}}
      >
      </div>
      <div className="Notification__body">
        <div className="Notification__message">{props.message}</div>
        {!!props.markText && <div className="Notification__text">{props.markText}</div>}
        {props.actions &&
        <div className="Notification__body__buttons">{props.actions.map((action, key) => (
          <UI.Button
            key={key}
            rounded
            type={action.type}
            size="ultra_small"
            onClick={(e) => props.onAction(action)}>
            {action.text}
          </UI.Button>
        ))}</div>
        }
      </div>
      <div className="Notification__date">{props.date}</div>
    </div>
  )
}

Notification.propTypes = {
  unread: PropTypes.bool,
  classNames: PropTypes.string,
  message: PropTypes.string,
  icon: PropTypes.string,
  markText: PropTypes.string,
  actions: PropTypes.array
};

export function NotificationSeparator(props) {
  return (
    <h4 className="NotificationSeparator">{props.title}</h4>
  )
}

NotificationSeparator.propTypes = {
  title: PropTypes.string
}

export default class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickEsc = this.handleClickEsc.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleClickEsc, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleClickEsc, false);
  }

  handleClickEsc(e){
    if(e.keyCode === 27) {
      this.props.onClose && this.props.onClose();
    }
  }

  render() {
    const empty = !this.props.pending && (!this.props.children || !this.props.children.length);
    return [
      <div key="notify_close_helper" className="Notification__close_helper" onClick={() => this.props.onClose && this.props.onClose()} />,
      <div key="notify_body" className={classNames(this.props.classNames, "Notifications", { empty: empty })} ref="notifications">
        {!empty ? this.props.children : <span className="Notifications__empty_text">{this.props.emptyText}</span>}
      </div>
    ]
  }
}

Notifications.propTypes = {
  classNames: PropTypes.string,
  onClose: PropTypes.func
};
