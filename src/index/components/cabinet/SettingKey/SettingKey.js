import './SettingKey.less';
import React from 'react'
import SVG from 'react-inlinesvg';

import * as CLASSES from "../../../constants/classes";
import * as storeUtils from "../../../storeUtils";
import * as modalGroupActions from "../../../../actions/modalGroup";
import * as settingsActions from '../../../../actions/cabinet/settings';
import * as utils from "../../../../utils";
import GAConfirmModal from '../GAConfirmModal/GAConfirmModal';

import ContentBox from '../../../../ui/components/ContentBox/ContentBox';
import UI from '../../../../ui';

class SettingKey extends React.Component {
  state = {
    displayPassword: false
  }

  __handleCreateKey = () => {
    const {user, toastPush} = this.props
    if(!user.ApiKeyName){
      toastPush(utils.getLang('cabinet__requiredApiName'), "error");
      return false;
    }
    modalGroupActions.openModalPage(null, {}, {
      children: GAConfirmModal,
      params: {
        onChangeHandler: (data, modal) => {
          settingsActions.CreateKey({
            name: user.ApiKeyName,
            ga_code: data.gaCode
          }).then((data) => {
            modal.props.close();
          }).catch(err => {
          });
        }
      }
    })

  }

  __toggleDisplayPassword = () => {
    this.setState({ displayPassword: !this.state.displayPassword });
  }

  

  render(){
    const { profile } = this.props
    const closeEyeSvg = require('../../../../asset/16px/eye-closed.svg');
    const openEyeSvg = require('../../../../asset/16px/eye-open.svg');
    const copySvg = require('../../../../asset/16px/copy.svg');
    return(
      <React.Fragment>
        <ContentBox className="ApiKey">
          <div className="ApiKey__title">Create New API Key</div>
          <div className="ApiCreateKey__form">
            <UI.Input
              placeholder={'API Key Name'} 
              onTextChange={value => this.props.setUserFieldValue({field: 'ApiKeyName', value})}
            />
            <UI.Button
              size="large"
              onClick={this.__handleCreateKey}
            >
              Create
            </UI.Button>
          </div>
        </ContentBox>
        {
          profile.user.apikey && <ContentBox className="ApiKey">
            <div className="ApiKey__block">
              <div className="ApiKey__title">{profile.user.apikey.key.name}</div>
              <div className="ApiKey__buttons">
                <UI.Button
                  size="small"
                  onClick={this.__handleCreateKey}
                >
                  Save
                </UI.Button>
                <UI.Button
                  size="small"
                  type="secondary"
                  onClick={this.__handleCreateKey}
                >
                  Delete Key
                </UI.Button>
              </div>
            
            </div>
            <div className="ApiKey__information">
              <div className="ApiKey__key">
                <div className="ApiKey__information-title">
                  <span className="ApiKey__svg" onClick={this.__copy}>
                    <SVG src={copySvg}  />
                  </span> 
                  API Key: 
                </div>
                <div className="ApiKey__text">
                  {profile.user.apikey.key.public_key}
                </div>
              </div>
              <div className="ApiKey__secret">
                <div className="ApiKey__information-title">
                  <span className="ApiKey__svg">
                    <SVG  src={this.state.displayPassword ? closeEyeSvg : openEyeSvg} />
                  </span> 
                  Secret Key:
                </div>
                <div className="ApiKey__text">
                  {profile.user.apikey.secret}
                </div>
              </div>
              <div className="ApiKey__restrictions">
                <div className="ApiKey__information-title">API Restrictions:</div>
                <UI.CheckBox checked disabled>Read</UI.CheckBox>
                <UI.CheckBox >Enable Trading</UI.CheckBox>
                <UI.CheckBox >Enable Withdrawals</UI.CheckBox>
              </div>
              <div className="ApiKey__ipAdress">
                <div className="ApiKey__information-title">IP Access Restrictions:</div>
                {/* <UI.RadioGroup > */}
                <UI.Radio selected>Unrestricted (Less Secure). <br /> <span>This API key allows access from any IP address. This is not recommended.</span></UI.Radio >
                <UI.Radio>Restrict access to trusted IPs only (Recommended)</UI.Radio >
                {/* </UI.RadioGroup> */}
                
              </div>
            </div>
            
          </ContentBox>
        }
        
      </React.Fragment>
      
    )
  }
}

export default storeUtils.getWithState(
  CLASSES.COMPONENT_PROFILE_SIDEBAR,
  SettingKey
);