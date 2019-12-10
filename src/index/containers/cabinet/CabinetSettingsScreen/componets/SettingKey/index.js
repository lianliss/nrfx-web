import './SettingKey.less';
import React from 'react'
import SVG from 'react-inlinesvg';
import copyText from 'clipboard-copy';

import * as CLASSES from "../../../../../constants/classes";
import * as storeUtils from "../../../../../storeUtils";
import * as modalGroupActions from "../../../../../../actions/modalGroup";
import * as settingsActions from '../../../../../../actions/cabinet/settings';
import * as utils from "../../../../../../utils";
import GAConfirmModal from '../../../../../components/cabinet/GAConfirmModal/GAConfirmModal';

import ContentBox from '../../../../../../ui/components/ContentBox/ContentBox';
import UI from '../../../../../../ui';

class SettingKey extends React.Component {
  state = {
    displaySecretKey: false,
  }

  componentDidMount() {
    const { user } = this.props.profile
    if( user && !user.dataApiKey){
      this.__handleCheckData()
    }
  }

  __handleCheckData = () => {
    settingsActions.dataKey()
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
          settingsActions.createKey({
            name: user.ApiKeyName,
            ga_code: data.gaCode
          }).then(() => {
            modal.props.close();
            this.props.toastPush(utils.getLang('cabinet__successCreateKey'), "success");
          }).catch(err => {
            this.props.toastPush(err.message, "error");
          });
          
        }
      }
    })
  }

  __handleDeleteApiKey = (key_id) => {
    if (!key_id) { return false}
    modalGroupActions.openModalPage(null, {}, {
      children: GAConfirmModal,
      params: {
        onChangeHandler: (data, modal) => {
          settingsActions.deleteKey({
            key_id,
            ga_code: data.gaCode
          }).then(() => {
            modal.props.close();
            this.props.toastPush(utils.getLang('cabinet__succesDeleteKey'), "success");
            this.__handleCheckData()
          }).catch(err => {
            this.props.toastPush(err.message, "error");
          });
        }
      }
    })
  }

  __handleGetSecretKey = (key_id) => {
    if (!key_id) { return false}
    modalGroupActions.openModalPage(null, {}, {
      children: GAConfirmModal,
      params: {
        onChangeHandler: (data, modal) => {
          settingsActions.getSecretKey({
            key_id,
            ga_code: data.gaCode
          }).then((item) => {
            modal.props.close();
            this.__toggleDisplaySecret()
          }).catch(err => {
            this.props.toastPush(err.message, "error");
          });
        }
      }
    })
  }

  __toggleDisplaySecret = () => {
    this.setState({ displayPassword: !this.state.displayPassword });
  }

  __copy = (public_key) => {
    copyText(public_key).then(() => {
      this.props.toastPush(utils.getLang('cabinet_copyPublicKey'), "success");
    });
  };


  __renderListApiKeys = () => {
    const { user } = this.props.profile
    const closeEyeSvg = require('../../../../../../asset/16px/eye-closed.svg');
    const openEyeSvg = require('../../../../../../asset/16px/eye-open.svg');
    const copySvg = require('../../../../../../asset/16px/copy.svg');

    const dataKey = user.dataApiKey.map((item,i) => {
      return(
        <ContentBox className="ApiKey" key={i}>
          <div className="ApiKey__block">
            <div className="ApiKey__title">{item.name}</div>
            <div className="ApiKey__buttons">
              <UI.Button
                size="small"
                onClick={this.__handleCreateKey}
                disabled={true}
              >
                {utils.getLang('cabinet_settingsSave')}
              </UI.Button>
              <UI.Button
                size="small"
                type="secondary"
                onClick={() => { this.__handleDeleteApiKey(item.id)}}
              >
                {utils.getLang('cabinet__deleteKey')}
              </UI.Button>
            </div>
        
          </div>
          <div className="ApiKey__information">
            <div className="ApiKey__key">
              <div className="ApiKey__information-title">
                <span className="ApiKey__svg" onClick={() => {this.__copy(item.public_key)}}>
                  <SVG src={copySvg}  />
                </span> 
              API Key: 
              </div>
              <div className="ApiKey__text">
                {item.public_key}
              </div>
            </div>
            <div className="ApiKey__secret" onClick={() => {this.__handleGetSecretKey(item.id)}}>
              <div className="ApiKey__information-title">
                <span className="ApiKey__svg">
                  <SVG  src={this.state.displaySecretKey ? openEyeSvg : closeEyeSvg} />
                </span> 
              Secret Key:
              </div>
              <div className="ApiKey__text">
                {item.secret_key || `*****`}
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
      )
    })
    
    return(
      dataKey
    )
  }

  

  render(){
    const { profile } = this.props
    return(
      <React.Fragment>
        <ContentBox className="ApiKey">
          <div className="ApiKey__title">{utils.getLang('cabinet__newCreateKey')}</div>
          <div className="ApiCreateKey__form">
            <UI.Input
              placeholder={'API Key Name'} 
              onTextChange={value => this.props.setUserFieldValue({field: 'ApiKeyName', value})}
            />
            <UI.Button
              size="large"
              onClick={this.__handleCreateKey}
            >
              {utils.getLang('site__walletCreateBtn')}
            </UI.Button>
          </div>
        </ContentBox>
        {
          profile.user && profile.user.dataApiKey && this.__renderListApiKeys()
        }
        
      </React.Fragment>
      
    )
  }
}

export default storeUtils.getWithState(
  CLASSES.COMPONENT_PROFILE_SIDEBAR,
  SettingKey
);