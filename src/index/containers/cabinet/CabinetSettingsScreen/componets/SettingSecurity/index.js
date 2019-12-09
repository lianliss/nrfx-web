import './SettingSecurity.less';
import React from 'react';

import * as modalGroupActions from "../../../../../../actions/modalGroup";
import * as settingsActions from '../../../../../../actions/cabinet/settings';
import * as utils from "../../../../../../utils";
import GAConfirmModal from '../../../../../components/cabinet/GAConfirmModal/GAConfirmModal';
import UI from '../../../../../../ui';

export default function SettingSecurity({props}) {
  const { user } = props;

  const __handleChangePassword = () => {
    
    if (user.new_password && user.new_password.length < 6) {
      props.toastPush(utils.getLang('global_passwordMustBe'), "error");
      return false;
    }

    if (
      user.new_password &&
      user.re_password &&
      user.new_password !== user.re_password
    ) {
      props.toastPush(utils.getLang('global_passwordsMustBeSame'), "error");
      return false;
    }
    modalGroupActions.openModalPage(null, {}, {
      children: GAConfirmModal,
      params: {
        onChangeHandler: (data, modal) => {
          settingsActions.changeNewPassword({
            old_password: props.user.old_password,
            password: props.user.new_password,
            ga_code: data.gaCode
          }).then(() => {
            modal.props.close();
            props.toastPush(utils.getLang("cabinet_passwordUpdateSuccess"), "success");
            props.setUserFieldValue({field: 'old_password', value: ""});
            props.setUserFieldValue({field: 'new_password', value: ""});
            props.setUserFieldValue({field: 're_password', value: ""});
          }).catch(err => {
            props.toastPush(err.message, "error");
          });
          return this.__inputError(modal, 'errorGaCode');
        }
      }
    })
  }


  return (
    <div className="CabinetSettingsScreen__main Content_box">
      <div className="CabinetSettingsScreen__header">
        {utils.getLang("cabinet_changePassword")}
      </div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input
              type="password"
              placeholder={utils.getLang("cabinet_oldPassword")}
              value={user.old_password}
              onTextChange={(value) => props.setUserFieldValue({field: 'old_password', value})}
            />
          </div>
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input
              type="password"
              placeholder={utils.getLang("cabinet_newPassword")}
              value={user.new_password}
              onTextChange={(value) => props.setUserFieldValue({field: 'new_password', value})}
            />
          </div>
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input
              type="password"
              placeholder={utils.getLang("cabinet_reEnterNewPassword")}
              value={user.re_password}
              onTextChange={(value) => props.setUserFieldValue({field: 're_password', value})}
            />
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
          <UI.Button
            disabled={!user.old_password || !user.new_password || !user.re_password}
            type={'outline'}
            onClick={__handleChangePassword}
          >
            {utils.getLang("cabinet_settingsSave")}
          </UI.Button>
        </div>
      </div>
      <div className="CabinetSettingsScreen__space"></div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__input_field">
            <UI.Button onClick={() => {modalGroupActions.openModalPage('secret_key_info')}}>
              {utils.getLang("global_update")}
            </UI.Button>
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
        </div>
      </div>
      {/*<div className="CabinetSettingsScreen__space"></div>
      <div className="CabinetSettingsScreen__header">{utils.getLang('cabinet_settings2FA')}</div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__switch_field">
            <span>{utils.getLang('global_ga')}</span>
            <span>
              <UI.Switch on={true} disabled />
            </span>
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
        </div>
      </div>
      <div className="CabinetSettingsScreen__space"></div>
      <div className="CabinetSettingsScreen__header">
        {utils.getLang("site__authModalSecretKey")}
      </div>
      <div className="CabinetSettingsScreen__space"></div>
      <div className="CabinetSettingsScreen__header">{utils.getLang('cabinet_sessionTimeout')}</div>
      <div className="CabinetSettingsScreen__relative">
        <p>Session timeout represents the event occuring when a user do not perform any action on a web site during a interval (defined by web server). The event, on server side, change the status of the user session to 'invalid' (ie. "not used anymore") and instruct the web server to destroy it (deleting all data contained into it).</p>
        <UI.Range min={0} max={12} formatLabel={value => value + " Hour"} value={3} />
      </div>*/}
    </div>
  )
}