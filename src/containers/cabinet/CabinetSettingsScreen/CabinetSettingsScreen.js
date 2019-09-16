import './CabinetSettingsScreen.less';

import React from 'react';
import moment from 'moment'

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import GAConfirmModal from '../../../components/cabinet/GAConfirmModal/GAConfirmModal';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';

import UI from '../../../ui';

import * as modalGroupActions from "../../../actions/modalGroup";
import * as storeUtils from "../../../storeUtils";
import * as utils from "../../../utils";
import * as CLASSES from "../../../constants/classes";
import * as settingsActions from '../../../actions/cabinet/settings';
import * as emitter from '../../../services/emitter';

import { ReactComponent as IdBadgeSvg } from '../../../asset/24px/id-badge.svg';

class CabinetSettingsScreen extends CabinetBaseScreen {
  get section() {
    return this.props.routerParams.section || 'default';
  }

  get isLoading() {
    return !!this.props.loadingStatus[this.section];
  }

  componentDidMount() {
    this.__load();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.routerParams.section !== this.props.routerParams.section) {
      this.__load(nextProps.routerParams.section || 'default');
    }
  }

  componentWillUnmount() {
    emitter.removeListener(this.loadSettingsListener);
  }

  __load = (section = null) => {
    this.loadSettingsListener = emitter.addListener('loadSettings', this.props.loadSettings);
    switch (section || this.props.routerParams.section) {
      default: {
        emitter.emit('loadSettings');
      }
    }
  };

  state = {
    firstNameInputError: false,
    lastNameInputError: false,
    loginInputError: false
  };

  render() {
    if (this.isLoading) {
      return <LoadingStatus status={this.props.loadingStatus[this.section]} onRetry={() => this.__load()} />;
    }

    return (<div>
      <PageContainer
        leftContent={this.__renderRightContent()}
        sidebarOptions={[
          <ProfileSidebarItem
            icon={<IdBadgeSvg />}
            label="Personal"
            baselink={true}
          />,
          /*<ProfileSidebarItem
            icon={require('../../../asset/24px/shield.svg')}
            label="Security"
            section="security"
            active={this.props.routerParams.section === 'security'}
          />,
          <ProfileSidebarItem
            icon={require('../../../asset/24px/user.svg')}
            label="Notifications"
            section="notifications"
            active={this.props.routerParams.section === 'notifications'}
          />*/
        ]}
      >
        {this.__renderContent()}
      </PageContainer>
    </div>);
  }

  __renderContent = () => {
    switch (this.props.routerParams.section) {
      case 'security': {
        return this.__getSecurityPageContent();
      }
      case 'notifications': {
        return this.__getNotificationsPageContent();
      }
      default:
        return this.__getPersonalPageContent();
    }
  };

  __getSecurityPageContent = () => {
    return <div className="CabinetSettingsScreen__main Content_box">
      <div className="CabinetSettingsScreen__header">
        Change Password
      </div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input
              placeholder={'Old Password'}
              value={this.props.old_password}
              onTextChange={(value) => this.props.setUserFieldValue({field: 'old_password', value})}
            />
          </div>
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input
              placeholder={'New Password'}
              value={this.props.new_password}
              onTextChange={(value) => this.props.setUserFieldValue({field: 'new_password', value})}
            />
          </div>
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input
              placeholder={'Re-enter New Password'}
              value={this.props.re_password}
              onTextChange={(value) => this.props.setUserFieldValue({field: 're_password', value})}
            />
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
          <UI.Button type={'outline'} onClick={() => {
            modalGroupActions.openModalPage('ga_confirm')}}
          >
            Save
          </UI.Button>
        </div>
      </div>
      <div className="CabinetSettingsScreen__space">
      </div>
      <div className="CabinetSettingsScreen__header">
        Secret Key
      </div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__input_field">
            <UI.Button onClick={() => {modalGroupActions.openModalPage('ga_confirm')}}>
              Update
            </UI.Button>
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
        </div>
      </div>
      <div className="CabinetSettingsScreen__header">
        2FA Authorization
      </div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__switch_field">
            <span>Google Authenticator</span>
            <span>
              <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
            </span>
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
        </div>
      </div>
    </div>
  };

  __getNotificationsPageContent = () => {
    return <div>
      <div className="CabinetSettingsScreen__padding_box Content_box">
        <div className="CabinetSettingsScreen__header withPadding">
          Вход
        </div>
        <div className="CabinetSettingsScreen__switch_item">
          <span className="text_span">
            Сообщить о входе
          </span>
          <span className="switch_span">
            <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
          </span>
        </div>
        <div className="CabinetSettingsScreen__switch_item">
          <span className="text_span">
            Сообщить о входе в аккаунт с нового IP
          </span>
          <span className="switch_span">
            <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
          </span>
        </div>
      </div>
      <div className="CabinetSettingsScreen__padding_box Content_box">
        <div className="CabinetSettingsScreen__header withPadding">
          Кошелек
        </div>
        <div className="CabinetSettingsScreen__switch_item">
          <span className="text_span">
            Поступление средств
          </span>
          <span className="switch_span">
            <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
          </span>
        </div>
        <div className="CabinetSettingsScreen__switch_item">
          <span className="text_span">
            Запрос на вывод средств с кошелька
          </span>
          <span className="switch_span">
            <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
          </span>
        </div>
        <div className="CabinetSettingsScreen__switch_item">
          <span className="text_span">
            Вывод средств с кошелька
          </span>
          <span className="switch_span">
            <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
          </span>
        </div>
      </div>
      <div className="CabinetSettingsScreen__padding_box Content_box">
        <div className="CabinetSettingsScreen__header withPadding">
          Инвестиции
        </div>
        <div className="CabinetSettingsScreen__switch_item">
          <span className="text_span">
            Открытие депозита
          </span>
          <span className="switch_span">
            <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
          </span>
        </div>
        <div className="CabinetSettingsScreen__switch_item">
          <span className="text_span">
            Запрос на вывод инвестиций
          </span>
          <span className="switch_span">
            <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
          </span>
        </div>
        <div className="CabinetSettingsScreen__switch_item">
          <span className="text_span">
            Подтерждение вывода инвестиций
          </span>
          <span className="switch_span">
            <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
          </span>
        </div>
        <div className="CabinetSettingsScreen__switch_item">
          <span className="text_span">
            Окончание депозита
          </span>
          <span className="switch_span">
            <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
          </span>
        </div>
        <div className="CabinetSettingsScreen__switch_item">
          <span className="text_span">
            Поступление дохода с депозита
          </span>
          <span className="switch_span">
            <UI.Switch on={Math.random() >= 0.5} onChange={(e) => {console.log(e)}}/>
          </span>
        </div>
      </div>
    </div>
  };

  __getPersonalPageContent = () => {
    return <div className="CabinetSettingsScreen__main Content_box">
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
            type={'outline'}
            onClick={() => {
              if (this.props.user.first_name.length < 1) {
                return this.__inputError(this, 'firstNameInputError');
              } else if (this.props.user.last_name.length < 1) {
                return this.__inputError(this, 'lastNameInputError');
              }
              modalGroupActions.openModalPage('ga_confirm', {}, {
                children: GAConfirmModal,
                params: {
                  onChangeHandler: (data, modal) => {
                    settingsActions.changeInfo({
                      first_name: this.props.user.first_name,
                      last_name: this.props.user.last_name,
                      ga_code: data.gaCode
                    }).then((data) => {
                      if (data.hasOwnProperty('response') && data.response === "ok") {
                        modal.props.close();
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
        {utils.getLang('cabinet_settingsLogin')}
      </div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input
              placeholder={utils.getLang('cabinet_settingsYourLogin')} value={this.props.user.login}
              onTextChange={(value) => this.props.setUserFieldValue({field: 'login', value})}
              error={this.state.loginInputError}
            />
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
          <UI.Button type={'outline'} onClick={() => {
            if (this.props.user.login.length < 1) {
              return this.__inputError(this, 'loginInputError');
            }
            modalGroupActions.openModalPage('ga_confirm', {}, {
              children: GAConfirmModal,
              params: {
                onChangeHandler: (data, modal) => {
                  settingsActions.changeLogin({
                    login: this.props.user.login,
                    ga_code: data.gaCode
                  }).then((data) => {
                    if (data.hasOwnProperty('response') && data.response === "ok") {
                      modal.props.close();
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
          <UI.Button type="outline" onClick={() => {modalGroupActions.openModalPage('change_number')}}>
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
          <UI.Button type={'outline'} onClick={() => {modalGroupActions.openModalPage('change_email')}}>
            {utils.getLang('cabinet_settingsChange')}
          </UI.Button>
        </div>
      </div>
    </div>
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

  __renderRightContent = () => {
    const headings = [
      <UI.TableColumn>{utils.getLang('cabinet_settingsAction')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('cabinet_settingsDevice')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('cabinet_settingsIP')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('cabinet_settingsDate')}</UI.TableColumn>,
    ];

    const rows = this.props.user && this.props.user.logs &&  this.props.user.logs.map((item, i) => {
      return (
        <UI.TableCell key={i}>
          <UI.TableColumn>
            {utils.switchMatch(item.action, {
              'auth_signin': utils.getLang('cabinet_settingsAuthSignIn'),
              'default': item.action
            })}
          </UI.TableColumn>
          <UI.TableColumn style={{width: 50}}>{item.browser}</UI.TableColumn>
          <UI.TableColumn>{item.ip}</UI.TableColumn>
          <UI.TableColumn style={{width: 140}}>{moment(item.created_at).fromNow()}</UI.TableColumn>
        </UI.TableCell>
      )
    });

    return (
      <UI.Table headings={headings}>
        {rows}
      </UI.Table>
    );
  }
}

export default storeUtils.getWithState(
  CLASSES.CABINET_SETTINGS_SCREEN,
  CabinetSettingsScreen
);
