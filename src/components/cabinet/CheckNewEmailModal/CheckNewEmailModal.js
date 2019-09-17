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
      <div className="CheckNewEmailModal">
        <div className="CheckNewEmailModal__icon" style={{background: `url(${require('../../../asset/120/email_success.svg')})`}} />
        <div className="CheckNewEmailModal__content">
          <div>{utils.getLang('cabinet_checkNewEmailModal_pleaseCheck')}</div>
          <div className="CheckNewEmailModal__new_email">{this.props.params.newEmail}</div>
          <div>{utils.getLang('cabinet_checkNewEmailModal_toComplete')}</div>
        </div>
        <div className={"CheckNewEmailModal__resend_button"}>
          <span onClick={() => {
            modalGroupActions.openModalPage('change_email',  {
              params: { newEmail: this.props.params.newEmail }
            })
          }}>{utils.getLang('cabinet_checkNewEmailModal_reSendEmail')}</span>
        </div>
        <div className="CheckNewEmailModal__button_wrapper">
          <UI.Button onClick={this.__handleSubmit}>
            {utils.getLang('site__authModalOk')}
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