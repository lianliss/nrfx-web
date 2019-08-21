import './CabinetSettingsScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import GAConfirmModal from '../../../components/cabinet/GAConfirmModal/GAConfirmModal';

import UI from '../../../ui';
import * as modalGroupActions from "../../../actions/modalGroup";

import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";

class CabinetSettingsScreen extends CabinetBaseScreen {
  constructor(props) {
    super(props);
    this.content = this.__getPersonalPageContent;
  }

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

  __load = (section = null) => {
    switch (section || this.props.routerParams.section) {
      case 'security':
        this.content = this.__getSecurityPageContent;
        break;
      case 'notifications':
        this.content = this.__getNotificationsPageContent;
        break;
      default:
        this.content = this.__getPersonalPageContent;
        break;
    }
  };

  render() {
    return (<div>
      <PageContainer
        leftContent={this.__renderRightContent()}
        sidebarOptions={{
          items: [
            <ProfileSidebarItem
              icon={require('../../../asset/24px/id-badge.svg')}
              label="Personal"
              baselink={true}
              active={!this.props.routerParams.section || this.props.routerParams.section === 'personal'}
            />,
            <ProfileSidebarItem
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
            />
          ]
        }}
      >
        {this.content()}
      </PageContainer>
    </div>);
  }

  __getSecurityPageContent = () => {
    return <div className="CabinetSettingsScreen__main Content_box">
      <div className="CabinetSettingsScreen__header">
        Change Password
      </div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input placeholder={'Old Password'} />
          </div>
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input placeholder={'New Password'} />
          </div>
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input placeholder={'Re-enter New Password'} />
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
          <UI.Button type={'outline'} onClick={() => {
            modalGroupActions.openModalPage('ga_confirm')}}>
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
        Personal Information
      </div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input placeholder={'Your firstname'} />
          </div>
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input placeholder={'Your lastname'} />
          </div>
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input placeholder={'Your nickname'} />
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
          <UI.Button type={'outline'} onClick={() => {
            modalGroupActions.openModalPage('ga_confirm', {}, {
              children: GAConfirmModal,
              params: {
                onChangeHandler: () => {
                  console.log(345);
                }
              }
            })
          }}>
            Save
          </UI.Button>
        </div>
      </div>
      <div className="CabinetSettingsScreen__space">
      </div>
      <div className="CabinetSettingsScreen__header">
        Phone Number
      </div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input
              classNameWrapper={'CabinetSettingsScreen__inputWithoutEffects'}
              disabled={true}
              value={'+7 (***) *** ** 55'}
            />
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
          <UI.Button type={'outline'} onClick={() => {modalGroupActions.openModalPage('change_number')}}>
            Change
          </UI.Button>
        </div>
      </div>
      <div className="CabinetSettingsScreen__header">
        E-mail
      </div>
      <div className="CabinetSettingsScreen__w100wrapper CabinetSettingsScreen__relative">
        <div className="CabinetSettingsScreen__form left">
          <div className="CabinetSettingsScreen__input_field">
            <UI.Input
              classNameWrapper={'CabinetSettingsScreen__inputWithoutEffects'}
              disabled={true}
              value={'sa******@gmail.com'}
            />
          </div>
        </div>
        <div className="CabinetSettingsScreen__form right">
          <UI.Button type={'outline'} onClick={() => {modalGroupActions.openModalPage('change_email')}}>
            Change
          </UI.Button>
        </div>
      </div>
    </div>
  };

  get fakeActions() {
    return [
      {
        id: 1,
        actionType: 'Sign In',
        device: 'Chrome Web',
        ip: '109.241.12.22',
        date: '25 Mar 2019 in 13:15',
      },
      {
        id: 2,
        actionType: 'E-mail update',
        device: 'Chrome Ios',
        ip: '109.241.12.22',
        date: '26 Mar 2019 in 03:15',
      },
      {
        id: 3,
        actionType: 'Sign In',
        device: 'Chrome Android',
        ip: '109.241.12.22',
        date: '27 Mar 2019 in 14:29',
      },
      {
        id: 4,
        actionType: 'Verification',
        device: 'Chrome Web',
        ip: '109.241.12.22',
        date: '28 Mar 2019 in 15:15',
      },
      {
        id: 5,
        actionType: 'Withdraw',
        device: 'Chrome Web',
        ip: '109.241.12.22',
        date: '29 Mar 2019 in 23:16',
      },
    ];
  }

  __renderRightContent = () => {
    const headings = [
      <UI.TableColumn>Action</UI.TableColumn>,
      <UI.TableColumn>Device</UI.TableColumn>,
      <UI.TableColumn>IP Address</UI.TableColumn>,
      <UI.TableColumn>Date</UI.TableColumn>,
    ];

    const rows = this.fakeActions.map((item, i) => {
      return (
        <UI.TableCell key={i}>
          <UI.TableColumn>{item.actionType}</UI.TableColumn>
          <UI.TableColumn style={{width: 50}}>{item.device}</UI.TableColumn>
          <UI.TableColumn>{item.ip}</UI.TableColumn>
          <UI.TableColumn style={{width: 140}}>{item.date}</UI.TableColumn>
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
  CLASSES.CABINET_START_PFOFILE_SCREEN,
  CabinetSettingsScreen
);
