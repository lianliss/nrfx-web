import './CheckNewEmailModal.less';

import React from 'react';
import UI from '../../../ui';

import * as modalGroupActions from "../../../actions/modalGroup";

export default class CheckNewEmailModal extends React.Component {
  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => {modalGroupActions.modalGroupClear()}} width={384}>
        <UI.ModalHeader>
          Check your email
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __renderContent() {
    return (
      <div>
        <div style={{textAlign:'center'}}>
          Check your email for confirmation
        </div>
        <div>
          {this.props.newEmail}
          <UI.Button onClick={this.__handleSubmit}>
            OK
          </UI.Button>
        </div>
      </div>
    )
  }

  __handleSubmit = () => {
    modalGroupActions.modalGroupClear();
  }
}

CheckNewEmailModal.defaultProps = {
  params: {
    newEmail: 'example@yourmail.domain'
  }
};