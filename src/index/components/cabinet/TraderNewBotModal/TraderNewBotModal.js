import React from 'react';

import Modal from '../../../../ui/components/Modal/Modal';
import UI from '../../../../ui';

function FiatOperationModal(props) {
  return (
    <Modal isOpen={true} onClose={props.onBack} width={400}>
      <UI.ModalHeader>
        New Bot
      </UI.ModalHeader>
      <div>
        <UI.Input
          placeholder="Enter Bot Name"
        />
        <UI.Button>Create</UI.Button>
      </div>
    </Modal>
  )
}

export default FiatOperationModal;
