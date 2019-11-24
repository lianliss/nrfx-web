import './ConfirmModal.less'

import React from 'react';
import UI from '../../../../ui';
import * as utils from '../../../../utils';
import * as emitter from '../../../../services/emitter';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.__handleClose = this.__handleClose.bind(this);
    this.__handleAccept = this.__handleAccept.bind(this);
  }

  __handleClose () {
    emitter.emit('confirm_cancel');
    this.props.onClose();
  }

  __handleAccept () {
    emitter.emit('confirm_accept');
    this.props.onClose();
  }

  render() {
    const { props } = this;

    return <UI.Modal isOpen={true} onClose={this.__handleClose}>
      <UI.ModalHeader>{props.title}</UI.ModalHeader>
      <div className="ConfirmModal">
        {!!props.content && <p className="ConfirmModal__content">{props.content}</p>}
        <div className="ConfirmModal__buttons">
          <UI.Button
            type={props.type === "delete" ? "negative" : undefined}
            onClick={this.__handleAccept}>
            { props.okText || utils.getLang("global_confirm") }
          </UI.Button>
          <UI.Button type="secondary" onClick={this.__handleClose}>
            { props.cancelText || utils.getLang("global_cancel")}
          </UI.Button>
        </div>
      </div>
    </UI.Modal>
  }
}

export default ConfirmModal;