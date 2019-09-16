import './CheckNewEmailModal.less';

import React from 'react';
import UI from '../../../ui';

import * as modalGroupActions from "../../../actions/modalGroup";
import * as utils from "../../../utils";

export default class CheckNewEmailModal extends React.Component {
  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => {modalGroupActions.modalGroupClear()}} width={384}>
        <UI.ModalHeader>
          {utils.getLang('cabinet_checkNewEmailModal_name')}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __renderContent() {
    return (
      <div>
        <div style={{textAlign:'center'}}>
          {utils.getLang('cabinet_checkNewEmailModal_checkYourEmail')}
        </div>
        <div>
          {this.props.newEmail}
          <UI.Button onClick={this.__handleSubmit}>
            {utils.getLang('cabinet_checkNewEmailModal_ok')}
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