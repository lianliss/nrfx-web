import './SettingPersonal.less';
import React from 'react';

import * as modalGroupActions from "../../../../../../actions/modalGroup";
import * as settingsActions from '../../../../../../actions/cabinet/settings';
import * as CLASSES from "../../../../../constants/classes";
import * as storeUtils from "../../../../../storeUtils";
import * as utils from "../../../../../../utils";
import GAConfirmModal from '../../../../../components/cabinet/GAConfirmModal/GAConfirmModal';
import UI from '../../../../../../ui';

class SettingPersonal extends React.Component{

  state = {
    firstNameInputError: false,
    lastNameInputError: false,
    loginInputError: false
  };

  __inputError = (node, stateField) => {
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

  render() {
    const buttonType = this.props.adaptive ? undefined : "outline";

    return(
      <div className="CabinetSettingsScreen__main Content_box">
        <div className="CabinetSettingsScreen__header">
          {utils.getLang('cabinet_settingsPersonalInformation')}
        </div>
        <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
          <div className="CabinetSettingsScreen__form left">
            <div className="CabinetSettingsScreen__input_field">
              <UI.Input
                placeholder={utils.getLang('cabinet_settingsYourFirstName')}
                value={this.props.user.first_name}
                onTextChange={(value) => this.props.setUserFieldValue({field: 'first_name', value})}
                error={this.state.firstNameInputError}
              />
            </div>
            <div className="CabinetSettingsScreen__input_field">
              <UI.Input
                placeholder={utils.getLang('cabinet_settingsYourLastName')}
                value={this.props.user.last_name}
                onTextChange={(value) => this.props.setUserFieldValue({field: 'last_name', value})}
                error={this.state.lastNameInputError}
              />
            </div>
          </div>
          <div className="CabinetSettingsScreen__form right">
            <UI.Button
              type={buttonType}
              onClick={() => {
                if (!utils.isName(this.props.user.first_name)) {
                  return this.__inputError(this, 'firstNameInputError');
                } else if (!utils.isName(this.props.user.last_name)) {
                  return this.__inputError(this, 'lastNameInputError');
                }
                modalGroupActions.openModalPage(null, {}, {
                  children: GAConfirmModal,
                  params: {
                    onChangeHandler: (data, modal) => {
                      settingsActions.changeInfo({
                        first_name: this.props.user.first_name,
                        last_name: this.props.user.last_name,
                        ga_code: data.gaCode
                      }).then((data) => {
                        if (data.hasOwnProperty('response') && data.response === "ok") {
                          this.props.toastPush(utils.getLang("cabinet_nameChangedSuccessfully"), "success");
                          modal.this.props.close();
                        }
                      }).catch((info) => {
                        switch (info.code) {
                          case "ga_auth_code_incorrect":
                            return this.__inputError(modal, 'errorGaCode');
                            // TODO: Переделать на нормальные модалки, не прокидывать функции в redux
                          default:
                            this.props.toastPush(info.message, "error");
                            break;
                        }
                      });
                    }
                  }
                })}
              }
            >
              {utils.getLang('cabinet_settingsSave')}
            </UI.Button>
          </div>
        </div>
        <div className="CabinetSettingsScreen__space">
        </div>
        <div className="CabinetSettingsScreen__header">
          {utils.getLang('site__contactLogin')}
        </div>
        <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
          <div className="CabinetSettingsScreen__form left">
            <div className="CabinetSettingsScreen__input_field">
              <UI.Input
                placeholder={utils.getLang('cabinet_settingsYourLogin')} value={this.props.user.login}
                onTextChange={value => this.props.setUserFieldValue({field: 'login', value})}
                error={this.state.loginInputError}
              />
            </div>
          </div>
          <div className="CabinetSettingsScreen__form right">
            <UI.Button type={buttonType} onClick={() => {
              if (this.props.user.login.length < 1) {
                return this.__inputError(this, 'loginInputError');
              }
              modalGroupActions.openModalPage(false, {}, {
                children: GAConfirmModal,
                params: {
                  onChangeHandler: (data, modal) => {
                    settingsActions.changeLogin({
                      login: this.props.user.login,
                      ga_code: data.gaCode
                    }).then((data) => {
                      if (data.hasOwnProperty('response') && data.response === "ok") {
                        modal.this.props.close();
                        this.props.toastPush(utils.getLang("cabinet_loginChangedSuccessfully"), "success");
                      }
                    }).catch((info) => {
                      switch (info.code) {
                        case "ga_auth_code_incorrect":
                          return this.__inputError(modal, 'errorGaCode');
                        default:
                          this.props.toastPush(info.message, "error");
                          break;
                      }
                    });
                  }
                }
              })
            }}>
              {utils.getLang('cabinet_settingsChange')}
            </UI.Button>
          </div>
        </div>
        <div className="CabinetSettingsScreen__space">
        </div>
        <div className="CabinetSettingsScreen__header">
          {utils.getLang('cabinet_settingsPhoneNumber')}
        </div>
        <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
          <div className="CabinetSettingsScreen__form left">
            <div className="CabinetSettingsScreen__input_field">
              <UI.Input
                classNameWrapper="CabinetSettingsScreen__inputWithoutEffects"
                disabled={true}
                value={this.props.user.phone_number}
              />
            </div>
          </div>
          <div className="CabinetSettingsScreen__form right">
            <UI.Button type={buttonType} onClick={() => {modalGroupActions.openModalPage('change_number')}}>
              {utils.getLang('cabinet_settingsChange')}
            </UI.Button>
          </div>
        </div>
        <div className="CabinetSettingsScreen__header">
          {utils.getLang('cabinet_settingsEmail')}
        </div>
        <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
          <div className="CabinetSettingsScreen__form left">
            <div className="CabinetSettingsScreen__input_field">
              <UI.Input
                classNameWrapper="CabinetSettingsScreen__inputWithoutEffects"
                disabled={true}
                value={this.props.user.email}
              />
            </div>
          </div>
          <div className="CabinetSettingsScreen__form right">
            <UI.Button type={buttonType} onClick={() => {modalGroupActions.openModalPage('change_email')}}>
              {utils.getLang('cabinet_settingsChange')}
            </UI.Button>
          </div>
        </div>
      </div>
    )
  }
  
}


export default storeUtils.getWithState(
  CLASSES.COMPONENT_PROFILE_SIDEBAR,
  SettingPersonal
);
