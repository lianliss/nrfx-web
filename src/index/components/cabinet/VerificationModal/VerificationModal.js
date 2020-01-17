import './VerificationModal.less';
import sumsubStyle from './sumsub.base64.css';
import React from 'react';
import UI from '../../../../ui';
import { classNames as cn } from 'src/utils/index';
import LoadingStatus from '../LoadingStatus/LoadingStatus';


export default class WalletTransactionModal extends React.Component {

  state = {
    status: 'loading',
  };

  constructor(props) {
    super(props);
  }

  __load() {
    this.setState({ status: 'loading' });
    this.script = document.createElement('script');
    this.script.src = 'https://test-api.sumsub.com/idensic/static/sumsub-kyc.js';
    document.body.appendChild(this.script);

    this.script.onload = () => {
      fetch('http://localhost:5000/api').then(res => res.json()).then(body => {
        window.idensic && window.idensic.init(
          '#sumsub',
          {
            clientId: 'Narfex',
            externalUserId: body.userId,
            accessToken: body.token,
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
            console.log('[IDENSIC DEMO] Idensic message:', messageType, payload)
          }
        )
      });
    };
  }

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
          {this.state.status && <LoadingStatus status={this.state.status} onRetry={this.__load} />}
        </div>
      </UI.Modal>
    )
  }
}
