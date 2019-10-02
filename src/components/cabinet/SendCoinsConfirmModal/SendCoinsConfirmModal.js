import './SendCoinsConfirmModal.less';

import React from 'react';
import UI from '../../../ui';
import SVG from 'react-inlinesvg';

import * as actions from '../../../actions';
import * as walletsActions from '../../../actions/cabinet/wallets';
import * as modalGroupActions from '../../../actions/modalGroup';
import * as utils from '../../../utils';
import * as currencies from "../../../utils/currencies";

import InfoRow, {InfoRowGroup} from '../../../components/cabinet/InfoRow/InfoRow';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';

class SendCoinsConfirmModal extends React.Component {
  state = {
    gaCode: '',
    errorGaCode: false
  };

  render() {
    this.currency = this.props.params.currency;
    this.currencyInfo = actions.getCurrencyInfo(this.currency);

    return (
      <UI.Modal className="SendCoinsConfirmModal__wrapper" isOpen={true} onClose={() => {this.props.close()}} width={464}>
        <UI.ModalHeader>
          {this.__getTitle()}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __getTitle() {
    return `${utils.getLang('cabinet_sendCoinsConfirmModal_name')} ${utils.ucfirst(this.currencyInfo.name)}`;
  }

  __renderContent() {
    const {currencyInfo, currency, address, amount}  = Object.assign({...this.props.params}, {
      currencyInfo: this.currencyInfo,
      currency: this.currency.toUpperCase(),
    });

    const currencyGradient = currencies.getGradientByCurrency(currency);

    return (
      <div className="SendCoinsConfirmModal">
        <div className="SendCoinsConfirmModal__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
        <InfoRowGroup align="left">
          <InfoRow label={utils.getLang('global_from')}>
            <div className="Wallets__history__address">
              {utils.getLang('cabinet_walletTransactionModal_my')} {utils.ucfirst(currencyInfo.name)}
            </div>
          </InfoRow>
          <InfoRow label={utils.getLang('global_to')}>
            <div className="Wallets__history__address">
              {address}
            </div>
          </InfoRow>
          <InfoRow label={utils.getLang('global_amount')}>{utils.formatDouble(amount)} {currency}</InfoRow>
          {/*<InfoRow label="Fee">{utils.formatDouble(fee)} {currency}</InfoRow>*/}
        </InfoRowGroup>
        <div className="SendCoinsConfirmModal__card" style={{background: currencyGradient}}>
          <div className="SendCoinsConfirmModal__card__icon">
            <SVG src={require('../../../asset/24px/send.svg')} />
          </div>
          <div className="SendCoinsConfirmModal__card__label">{utils.getLang('cabinet_sendCoinsConfirmModal_total')}</div>
          <div className="SendCoinsConfirmModal__card__value">{utils.formatDouble(amount)} {currency}</div>
        </div>

        <div className="SendCoinsConfirmModal__input_wrapper">
          <UI.Input
            autoFocus
            type="number"
            autoComplete="off"
            value={this.state.gaCode}
            onChange={this.__handleChange}
            placeholder={utils.getLang('site__authModalGAPlaceholder')}
            onKeyPress={(e) => (e.key === 'Enter' && this.state.gaCode.length < 6) ? this.__handleSubmit() : null}
            error={this.state.errorGaCode}
          />

          <img src={require('../../../asset/google_auth.svg')} alt="Google Auth" />
        </div>
        <div className="SendCoinsConfirmModal__submit_wrapper">
          <UI.Button currency={currency.toLowerCase()} onClick={this.__handleSubmit} disabled={this.state.gaCode.length < 6}>
            {utils.getLang('site__authModalSubmit')}
          </UI.Button>
        </div>
      </div>
    )
  }

  __handleChange = (e) => {
    const val = e.target.value;

    if (val.length <= 6) {
      this.setState({gaCode: val}, () => {
        if (val.length === 6) {
          this.__handleSubmit();
        }
      });
    }
  };

  __buildParams() {
    const {address, wallet_id, amount} = this.props.params;
    return {address, wallet_id, amount, ga_code: this.state.gaCode};
  }

  __handleSubmit = () => {
    walletsActions.sendCoins(this.__buildParams()).then((info) => {
      modalGroupActions.modalGroupClear();
    }).catch((info) => {
      switch (info.code) {
        case "ga_error":
          this.setState({
            errorGaCode: true
          }, () => {
            setTimeout(() => {
              this.setState({
                errorGaCode: false
              });
            }, 1000)
          });
          break;
        default:
          this.props.toastPush(info.message, "error");
          break;
      }
    });
  }
}

export default storeUtils.getWithState(
  CLASSES.SEND_COINS_CONFIRM_MODAL,
  SendCoinsConfirmModal
);