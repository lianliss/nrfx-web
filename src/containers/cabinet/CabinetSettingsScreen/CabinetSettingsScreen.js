import './CabinetSettingsScreen.less';

import React from 'react';

import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';

import {connect} from "react-redux";
import UI from '../../../ui';
import * as modalGroupActions from "../../../actions/modalGroup";
import * as utils from "../../../utils";

class CabinetSettingsScreen extends CabinetBaseScreen {
  render() {
    return (
      <div>
        <PageContainer
          leftContent={this.__renderRightContent()}
          sidebarOptions={{
            section: !this.props.routerParams.section,
            appName: 'Welcome',
            items: [
              <ProfileSidebarItem icon={require('../../../asset/24px/send.svg')} label="Personal" />,
              <ProfileSidebarItem icon={require('../../../asset/24px/id-badge.svg')} label="Security" />,
              <ProfileSidebarItem icon={require('../../../asset/24px/user.svg')} label="Notifications" />
            ]
          }}
        >
          <div className="CabinetSettingsScreen__main Content_box">
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
                  <UI.Input placeholder={'Your nicname'} />
                </div>
              </div>
              <div className="CabinetSettingsScreen__form right">
                <UI.Button type={'outline'}>
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
                <UI.Button type={'outline'}>
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
                <UI.Button type={'outline'}>
                  Change
                </UI.Button>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>
    )
  }

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

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps, {
})(React.memo(CabinetSettingsScreen));
