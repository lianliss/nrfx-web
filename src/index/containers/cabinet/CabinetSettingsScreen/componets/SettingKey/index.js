import './SettingKey.less';
import React from 'react'
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';
import copyText from 'clipboard-copy';

import * as modalGroupActions from "../../../../../../actions/modalGroup";
import * as settingsActions from '../../../../../../actions/cabinet/settings';
import * as utils from "../../../../../../utils";
import LoadingStatus from '../../../../../components/cabinet/LoadingStatus/LoadingStatus';
import GAConfirmModal from '../../../../../components/cabinet/GAConfirmModal/GAConfirmModal';

import ContentBox from '../../../../../../ui/components/ContentBox/ContentBox';
import UI from '../../../../../../ui';

class SettingKey extends React.Component {

  componentDidMount() {
    const { user } = this.props
    if( user && !user.dataApiKeys ){
      this.__handleCheckData()
    }
  }

  __handleCheckData = () => {
    settingsActions.getApiKeys()
  }

  __gaModalAction = (action) => {
    modalGroupActions.openModalPage(null, {}, {
      children: GAConfirmModal,
      params: {
        onChangeHandler: action
      }
    })
  }

  __handleCreateKey = () => {
    const {user, toastPush} = this.props
    if(!user.ApiKeyName){
      toastPush(utils.getLang('cabinet__requiredApiName'), "error");
      return false;
    }
    this.__gaModalAction(
      (data, modal) => {
        settingsActions.createKey({
          name: user.ApiKeyName,
          ga_code: data.gaCode
        }).then(() => {
          modal.props.close();
          this.props.toastPush(utils.getLang('cabinet__successCreateKey'), "success");
        }).catch(err => {
          this.props.toastPush(err.message, "error");
        })
      }
    )
  }

  __handleDeleteApiKey = (key_id) => {
    if (!key_id) { return false }
    this.__gaModalAction(
      (data, modal) => {
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
    )
  }

  __handleGetSecretKey = (key_id) => {
    if (!key_id) { return false }
    this.__gaModalAction(
      (data, modal) => {
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
    )
  }

  __handleSaveItem = (item) => {
    if (!item.id) { return false }
    this.__gaModalAction(
      (data, modal) => {
        settingsActions.saveItemKey({
          key_id: item.id,
          allow_ips: item.allow_ips.join(', '),
          name: item.name,
          permission_trading: item.permission_trading,
          permission_withdraw: item.permission_withdraw,
          ga_code: data.gaCode
        }).then((item) => {
          modal.props.close();
          this.props.toastPush(utils.getLang('cabinet_satting_save_key'), "success");
        }).catch(err => {
          this.props.toastPush(err.message, "error");
        });
      }
    )
  }

  __handleSettingIpAccess = (id, radio, allow_ips) => {
    settingsActions.settingIpAccess(id, radio, allow_ips)
  }

  __handleAddIpAddress = (id) => {
    settingsActions.addIpAddress(id)
  }

  __handleIpFieldValue = (key_id, id_ip, value) => {
    settingsActions.setIpAddressFieldValue(key_id, id_ip, value)
  }

  __handleDeleteIpAddress = ({key_id, id_ip}) => {
    settingsActions.deleteIpAddress(key_id, id_ip)
  }

  __toggleDisplaySecret = () => {
    this.setState({ displayPassword: !this.state.displayPassword });
  }

  __handleSettingsCheckTrading = (id, permission_trading) => {
    settingsActions.settingsCheckTrading(id, permission_trading)
  }

  __handleSettingsCheckWithdraw = (id, permission_withdraw) => {
    settingsActions.settingsCheckWithdraw(id, permission_withdraw)
  }

  __copy = (public_key) => {
    copyText(public_key).then(() => {
      this.props.toastPush(utils.getLang('cabinet_ keyCopiedSuccessfully'), "success");
    });
  };


  __renderListApiKeys = () => {
    const { user } = this.props
    if (!user.dataApiKeys){return <LoadingStatus inline status="loading" />}

    const closeEyeSvg = require('../../../../../../asset/16px/eye-closed.svg');
    const openEyeSvg = require('../../../../../../asset/16px/eye-open.svg');
    const copySvg = require('../../../../../../asset/16px/copy.svg');
    const plusSvg = require('../../../../../../asset/16px/plus.svg');
    const basketSvg = require('../../../../../../asset/24px/basket.svg');

    const listApiKeys = user.dataApiKeys.map((item,i) => {
      const ip_recomended = !item.radioCheck ? 'first' : item.radioCheck
      return(
        <ContentBox className="ApiKey__Item" key={i}>
          <div className="ApiKey__block">
            <div className="ApiKey__title">{item.name}</div>
            <div className="ApiKey__buttons">
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
            <div className="ApiKey__key" onClick={() => {this.__copy(item.public_key)}}>
              <div className="ApiKey__information-title">
                <span className="ApiKey__svg">
                  <SVG src={copySvg}/>
                </span>
                {utils.getLang("cabinet_apiKey")}: 
              </div>
              <div className="ApiKey__text">
                {item.public_key}
              </div>
            </div>
            <div className="ApiKey__secret" onClick={() => {item.displaySecretKey ? this.__copy(item.secret_key) : this.__handleGetSecretKey(item.id)}}>
              <div className="ApiKey__information-title">
                <span className="ApiKey__svg">
                  <SVG  src={item.displaySecretKey ? openEyeSvg : closeEyeSvg} />
                </span> 
                {utils.getLang("cabinet_secretKey")}:
              </div>
              <div className="ApiKey__text">
                {item.secret_key || `******************************`}
              </div>
            </div>
            <div className="ApiKey__restrictions">
              <div className="ApiKey__information-title">{utils.getLang("cabinet__restrictionsAPI")}:</div>
              <UI.CheckBox checked disabled>{utils.getLang("read")}</UI.CheckBox>
              <UI.CheckBox checked={item.permission_trading} onChange={() => {this.__handleSettingsCheckTrading(item.id, item.permission_trading)}}>{utils.getLang("enable_trading")}</UI.CheckBox>
              <UI.CheckBox checked={item.permission_withdraw} onChange={() => {this.__handleSettingsCheckWithdraw(item.id, item.permission_withdraw)}}>{utils.getLang("enable_withdrawals")}</UI.CheckBox>
            </div>
            <div className="ApiKey__ipAddress">
              <div className="ApiKey__information-title">{utils.getLang("ip_access_restrictions:")}:</div>
              <UI.RadioGroup selected={ip_recomended} onChange={(radio) => this.__handleSettingIpAccess(item.id, radio, item.allow_ips)}> 
                <UI.Radio value="first">{utils.getLang("unrestricted_ip")} <br /> <span>{utils.getLang("unrestricted_ip_warning")}</span></UI.Radio>
                <UI.Radio value="second">{utils.getLang("unrestricted_ip_recommended")}</UI.Radio>
              </UI.RadioGroup>
              {item.addIpAddress && item.allow_ips &&
              <div className="ApiKey__ipAddAddress">
                {
                  item.allow_ips.map((data, i) => {
                    return (
                      <UI.Input 
                        indicator={<div className="svg_basket" onClick={() => this.__handleDeleteIpAddress({ key_id: item.id, id_ip: i })}><SVG src={basketSvg}/></div>}
                        onTextChange={(value) => this.__handleIpFieldValue({ key_id: item.id, id_ip: i, value })}
                        placeholder={utils.getLang("trusted_ip_address") }
                        value={data}
                        key={i}
                      />
                    )
                  })
                }
                <UI.Button
                  size="middle"
                  onClick={() => {this.__handleAddIpAddress(item.id)}}
                >
                  <SVG  src={plusSvg}/>
                </UI.Button>
              </div>
              }
            </div>
            <div className="ApiKey__saveButton">
              <UI.Button
                size="large"
                onClick={() => {this.__handleSaveItem(item)}}
                disabled={!item.save_item}
              >
                {utils.getLang('cabinet_settingsSave')}
              </UI.Button>
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
          this.__renderListApiKeys()
        }
      </React.Fragment>
    )
  }
}

export default connect(state => {
  return { profile: state.default.profile};
})(SettingKey);