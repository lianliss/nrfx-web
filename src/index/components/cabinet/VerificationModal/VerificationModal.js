import './VerificationModal.less';
import sumsubStyle from './sumsub.base64.css';

import React from 'react';
import * as actions from 'src/actions/cabinet/profile';

import UI from '../../../../ui';
import { classNames as cn } from 'src/utils/index';
import LoadingStatus from '../LoadingStatus/LoadingStatus';


export default class WalletTransactionModal extends React.Component {
  state = {
    status: 'loading',
  };

  __load = () => {
    this.setState({ status: 'loading' });
    this.script && document.body.removeChild(this.script);

    this.script = document.createElement('script');
    this.script.src = 'https://test-api.sumsub.com/idensic/static/sumsub-kyc.js';
    document.body.appendChild(this.script);

    this.script.onload = () => {
      actions.getSumsub().then(data => {
        window.idensic && window.idensic.init(
          '#sumsub',
          {
            clientId: data.sumsub.client_id,
            externalUserId: data.user_id,
            accessToken: data.sumsub.access_token,
            uiConf: {
              customCss: sumsubStyle,
              lang: 'ru'
            }
          },
          (messageType, payload) => {
            if ( messageType === 'idCheck.onApplicantLoaded') {
              this.setState({ status: null });
            }
            if ( messageType === 'idCheck.onInitialized') {
              this.setState({ status: null });
            }
            if ( messageType === 'idCheck.onError') {
              this.setState({ status: 'failed' });
            }
            console.log('[IDENSIC DEMO] Idensic message:', messageType, payload)
          }
        )
      }).catch((err) => {
        this.setState({ status: 'failed' });
      });
    };
  };

  componentDidMount() {
    this.__load();
  }

  componentWillUnmount() {
    document.body.removeChild(this.script);
  }

  render() {
    return (
      <UI.Modal className={cn("VerificationModal", this.state.status)} isOpen={true} onClose={this.props.onClose}>
        <UI.ModalHeader>Варификация профайла</UI.ModalHeader>
        <div className="VerificationModal__content">
          <div id="sumsub" />
          { this.state.status && <LoadingStatus inline status={this.state.status} onRetry={this.__load} /> }
        </div>
      </UI.Modal>
    )
  }
};
