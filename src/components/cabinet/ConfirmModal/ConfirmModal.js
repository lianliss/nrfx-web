import React from 'react';
import UI from '../../../ui';

export default props => {
  return (
    <UI.Modal isOpen={true} onClose={() => {this.props.close()}} width={424}>
      <UI.ModalHeader>TITLE</UI.ModalHeader>
      <div className="ConfirmModal">
        <UI.Button onClick={() => { props.onAccept() }}>OK</UI.Button>
        <UI.Button onClick={() => { props.onCancel() }}>Cancel</UI.Button>
      </div>
    </UI.Modal>
  )
}