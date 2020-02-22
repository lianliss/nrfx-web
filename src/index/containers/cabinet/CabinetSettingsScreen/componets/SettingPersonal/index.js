import './SettingPersonal.less';
import React from 'react';
import { connect } from 'react-redux';

import * as modalGroupActions from "../../../../../../actions/modalGroup";
import * as settingsActions from '../../../../../../actions/cabinet/settings';
import * as utils from "../../../../../../utils";
import * as UI from '../../../../../../ui';
import VerificationBlock from '../VerificationBlock/VerificationBlock';
// import VerificationBlock from '../VerificationBlock/VerificationBlock';
import * as actions from 'src/actions/index';
import * as toasts from 'src/actions/toasts';

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
      <>
        <VerificationBlock />
        { this.props.profile.user.applicant_id && <UI.ContentBox className="CabinetSettingsScreen__main">
          <div className="CabinetSettingsScreen__header">applicant_id</div>
          <pre>{this.props.profile.user.applicant_id}</pre>
        </UI.ContentBox> }
        <UI.ContentBox className="CabinetSettingsScreen__main">
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
                  actions.gaCode().then(code => {
                    settingsActions.changeInfo({
                      first_name: this.props.user.first_name,
                      last_name: this.props.user.last_name,
                      ga_code: code
                    }).then((data) => {
                      toasts.success(utils.getLang("cabinet_nameChangedSuccessfully"));
                    }).catch(error => {
                      toasts.error(error.message);
                    });
                  });
                }}>
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
                if (!utils.isLogin(this.props.user.login)) {
                  return this.__inputError(this, 'loginInputError');
                }

                actions.gaCode().then(code => {
                  settingsActions.changeLogin({
                    login: this.props.user.login,
                    ga_code: code
                  }).then(()=> {
                    toasts.success(utils.getLang("cabinet_loginChangedSuccessfully"));
                  }).catch((info) => {
                    toasts.error(info.message);
                  });
                })
              }}>
                {utils.getLang('cabinet_settingsChange')}
              </UI.Button>
            </div>
          </div>
          <div className="CabinetSettingsScreen__space" />
          {/*<div className="CabinetSettingsScreen__header">*/}
          {/*  {utils.getLang('cabinet_settingsPhoneNumber')}*/}
          {/*</div>*/}
          {/*<div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">*/}
          {/*  <div className="CabinetSettingsScreen__form left">*/}
          {/*    <div className="CabinetSettingsScreen__input_field">*/}
          {/*      <UI.Input*/}
          {/*        classNameWrapper="CabinetSettingsScreen__inputWithoutEffects"*/}
          {/*        disabled={true}*/}
          {/*        value={this.props.user.phone_number}*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="CabinetSettingsScreen__form right">*/}
          {/*    <UI.Button type={buttonType} onClick={() => {modalGroupActions.openModalPage('change_number')}}>*/}
          {/*      {utils.getLang('cabinet_settingsChange')}*/}
          {/*    </UI.Button>*/}
          {/*  </div>*/}
          {/*</div>*/}
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
        </UI.ContentBox>
      </>
    )
  }

}

export default connect(state => ({
  profile: state.default.profile
}))(SettingPersonal);
