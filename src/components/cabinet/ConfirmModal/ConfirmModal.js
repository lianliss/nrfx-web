import React from 'react';
import UI from '../../../ui';

class ConfirmModal extends React.Component {
  state = {
    testField: 'Информация из модалки'
  };

  render() {
    const {props} = this;

    return <UI.Modal isOpen={true} onClose={() => {props.close()}} width={424}>
      <UI.ModalHeader>TITLE</UI.ModalHeader>
      <div className="ConfirmModal">
        <UI.Button onClick={
          e => props.params.onAccept(this.state, this)
        }>
          OK
        </UI.Button>
        <UI.Button onClick={
          e => props.params.onCancel(this.state, this)
        }>
          Cancel
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