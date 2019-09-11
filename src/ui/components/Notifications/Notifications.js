import './Notifications.less';
import React from 'react';
import UI from "../../index";
import { classNames } from '../../utils';
import PropTypes from "prop-types";

export function Notification(props) {
  return (
    <div className={classNames(props.classNames, "Notification", { unread: props.unread })}>
      <div
        className="Notification__icon"
        style={{backgroundImage: (props.icon && `url(${props.icon})`)}}
      ></div>
      <div className="Notification__body">
        <div className="Notification__message">{props.message}</div>
        {!!props.markText && <div className="Notification__text">{props.markText}</div>}
        {props.actions && props.actions.length &&
          <div className="Notification__body__buttons">{props.actions.map((action, key) => (
            <UI.Button
              key={key}
              type={action.type}
              size="small"
              onClick={() => props.onAction(action)}>
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
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickEsc = this.handleClickEsc.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener("keydown", this.handleClickEsc, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.removeEventListener("keydown", this.handleClickEsc, false);
  }

  handleClickEsc(e){
    if(e.keyCode === 27) {
      this.props.onClose && this.props.onClose();
    }
  }

  handleClickOutside(e) {
    if (this.refs.notifications && !this.refs.notifications.contains(e.target)) {
      this.props.onClose && this.props.onClose();
    }
  }

  render() {
    if (!this.props.visible) {
      return false;
    }
    return (
      <div className={classNames(this.props.classNames, "Notifications", {empty: !this.props.children})} ref="notifications">
        {this.props.children || <span className="Notifications__empty_text">You don’t have any notifications</span>}
      </div>
    )
  }
}

Notifications.propTypes = {
  visible: PropTypes.bool,
  classNames: PropTypes.string,
  onClose: PropTypes.func
};
