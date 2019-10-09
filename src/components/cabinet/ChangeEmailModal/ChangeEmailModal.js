import './ChangeEmailModal.less';

import React from 'react';
import UI from '../../../ui';

import * as utils from '../../../utils';
import * as settingsActions from "../../../actions/cabinet/settings";
import * as modalGroupActions from "../../../actions/modalGroup";
import CheckNewEmailModal from "../CheckNewEmailModal/CheckNewEmailModal";
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import SVG from 'react-inlinesvg';

class ChangeEmailModal extends React.Component {
  state = {
    gaCode: '',
    errorGaCode: false,
    newEmail: this.props.params.newEmail || '',
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
            onChange={e => this.__handleChange(e, 'GA')}
            placeholder={utils.getLang('site__authModalGAPlaceholder')}
            onKeyPress={utils.InputNumberOnKeyPressHandler}
            error={this.state.errorGaCode}
            indicator={
              <SVG src={require('../../../asset/google_auth.svg')} />
            }
          />
        </div>
        <div className="ChangeEmailModal__submit_wrapper">
          <UI.Button onClick={this.__handleSubmit} disabled={this.state.gaCode.length < 6}>
            {utils.getLang('cabinet_settingsSave')}
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
          this.setState({gaCode: val}, e => {
            if (val.length === 6) {
              this.__handleSubmit();
            }
          });
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
      modalGroupActions.openModalPage(null, {}, {
        children: CheckNewEmailModal,
        params: {
          newEmail: this.state.newEmail
        }
      })
    }).catch((info) => {
      this.props.toastPush(info.message, "error");
      switch (info.code) {
        case "ga_auth_code_incorrect":
          return this.__inputError(this, 'errorGaCode');
        case "email_incorrect":
          return this.__inputError(this, 'errorNewEmail');
        default:
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

export default storeUtils.getWithState(
  CLASSES.CHANGE_EMAIL_MODAL,
  ChangeEmailModal
);