import './ChangeEmailModal.less';

import React from 'react';
import UI from '../../../ui';

import * as utils from '../../../utils';
import * as settingsActions from "../../../actions/cabinet/settings";
import * as modalGroupActions from "../../../actions/modalGroup";
import CheckNewEmailModal from "../CheckNewEmailModal/CheckNewEmailModal";

export default class ChangeEmailModal extends React.Component {
  state = {
    gaCode: '',
    errorGaCode: false,
    newEmail: '',
    errorNewEmail: false,
  };

  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => {this.props.close()}} width={424}>
        <UI.ModalHeader>
          {utils.getLang('cabinet_changeEmailModal_name')}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __renderContent() {
    return (
      <div>
        <div className="ChangeEmailModal__input_wrapper">
          <UI.Input
            placeholder={'Enter New Email'}
            autoComplete="off"
            value={this.state.newEmail}
            onChange={(e) => this.__handleChange(e, 'EMAIL')}
            error={this.state.errorNewEmail}
          />
          <UI.Input
            type="number"
            autoComplete="off"
            value={this.state.gaCode}
            onChange={(e) => this.__handleChange(e, 'GA')}
            placeholder={utils.getLang('site__authModalGAPlaceholder')}
            onKeyPress={(e) => (e.key === 'Enter' && this.state.gaCode.length < 6) ? this.__handleSubmit() : null}
            error={this.state.errorGaCode}
          />

          <img src={require('../../../asset/google_auth.svg')} alt="Google Auth" />
        </div>
        <div className="ChangeEmailModal__submit_wrapper">
          <UI.Button onClick={this.__handleSubmit} disabled={this.state.gaCode.length < 6}>
            {utils.getLang('cabinet_changeEmailModal_save')}
          </UI.Button>
        </div>
      </div>
    )
  }

  __handleChange = (e, type) => {
    switch (type) {
      case 'EMAIL':
        this.setState({newEmail: e.target.value});
        break;
      case 'GA':
        const val = e.target.value;
        if (val.length <= 6) {
          this.setState({gaCode: val});
        }
        break;
      default: break;
    }
  };

  __handleSubmit = () => {
    if (!utils.isEmail(this.state.newEmail)) {
      return this.__inputError(this, 'errorNewEmail');
    }
    settingsActions.changeEmail({
      email: this.state.newEmail,
      ga_code: this.state.gaCode
    }).then((data) => {
      if (data.hasOwnProperty('response') && data.response === "ok") {
        modalGroupActions.openModalPage('ga_confirm', {}, {
          children: CheckNewEmailModal,
          params: {
            newEmail: this.state.newEmail
          }
        })
      }
    }).catch((info) => {
      switch (info.code) {
        case "ga_auth_code_incorrect":
          return this.__inputError(this, 'errorGaCode');
        case "email_incorrect":
          return this.__inputError(this, 'errorNewEmail');
        default:
          alert(info.message);
          break;
      }
    });
  };

  __inputError(node, stateField) {
    node.setState({
      [stateField]: true
    }, () => {
      setTimeout(() => {
        node.setState({
          [stateField]: false
        });
      }, 1000)
    });
  }
}