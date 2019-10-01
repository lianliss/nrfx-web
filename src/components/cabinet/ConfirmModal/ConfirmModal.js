import './ConfirmModal.less'

import React from 'react';
import UI from '../../../ui';
import * as utils from '../../../utils';

class ConfirmModal extends React.Component {
  render() {
    const { props } = this;

    return <UI.Modal isOpen={true} onClose={() => {props.close()}}>
      <UI.ModalHeader>{props.params.text}</UI.ModalHeader>
      <div className="ConfirmModal">
        <UI.Button type={props.params.type === "delete" ? "negative" : undefined} onClick={
          e => props.params.onAccept(this)
        }>
          { props.params.type === "delete" ? utils.getLang("global_delete") : utils.getLang("global_confirm")}
        </UI.Button>
        <UI.Button type="secondary" onClick={
          e => props.params.onCancel(this)
        }>
          {utils.getLang("global_cancel")}
        </UI.Button>
      </div>
    </UI.Modal>
  }
}

ConfirmModal.defaultProps = {
  params: {
    onAccept: e => {},
    onCancel: e => {},
  }
};

export default ConfirmModal;