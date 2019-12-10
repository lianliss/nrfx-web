import './SettingKey.less';
import React from 'react'
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';
import copyText from 'clipboard-copy';

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
    if( user && !user.dataApiKey ){
      this.__handleCheckData()
    }
  }

  __handleCheckData = () => {
    settingsActions.getApiKeys()
  }

  __handleCreateKey = () => {
    const {user, toastPush} = this.props
    if( !user.ApiKeyName ){
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
    if ( !key_id ) { return false }
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
    if ( !key_id ) { return false }
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
    const { user } = this.props
    const closeEyeSvg = require('../../../../../../asset/16px/eye-closed.svg');
    const openEyeSvg = require('../../../../../../asset/16px/eye-open.svg');
    const copySvg = require('../../../../../../asset/16px/copy.svg');

    const listApiKeys = user.dataApiKeys.map((item,i) => {
      return(
        <ContentBox className="ApiKey__Item" key={i}>
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
                  <SVG src={copySvg}/>
                </span>
                {utils.getLang("cabinet_apiKey")}: 
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
                {utils.getLang("cabinet_secretKey")}:
              </div>
              <div className="ApiKey__text">
                {item.secret_key || `*****`}
              </div>
            </div>
            <div className="ApiKey__restrictions">
              <div className="ApiKey__information-title">{utils.getLang("cabinet__restrictionsAPI")}:</div>
              <UI.CheckBox checked disabled>{utils.getLang("read")}</UI.CheckBox>
              <UI.CheckBox >{utils.getLang("enable_trading")}</UI.CheckBox>
              <UI.CheckBox >{utils.getLang("enable_withdrawals")}</UI.CheckBox>
            </div>
            <div className="ApiKey__ipAdress">
              <div className="ApiKey__information-title">{utils.getLang("ip_access_restrictions:")}:</div>
              {/* <UI.RadioGroup > */}
              <UI.Radio selected>{utils.getLang("unrestricted_ip")} <br /> <span>{utils.getLang("unrestricted_ip_warning")}</span></UI.Radio >
              <UI.Radio>{utils.getLang("unrestricted_ip_recommended")}</UI.Radio >
              {/* </UI.RadioGroup> */}
            
            </div>
          </div>
        </ContentBox>
      )
    })
    
    return(
      listApiKeys
    )
  }

  

  render(){
    const { user } = this.props
    return(
      <React.Fragment>
        <ContentBox className="ApiKey">
          <div className="ApiKey__title">{utils.getLang('cabinet__newCreateKey')}</div>
          <div className="ApiCreateKey__form">
            <UI.Input
              placeholder={utils.getLang('cabinet__apiKeyName')} 
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
          user && user.dataApiKeys && this.__renderListApiKeys()
        }
        
      </React.Fragment>
      
    )
  }
}

export default connect(state => {
  return { profile: state.default.profile};
})(SettingKey);