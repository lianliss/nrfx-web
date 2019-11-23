import './SendCoinsConfirmModal.less';

import React from 'react';
import UI from '../../../../ui';
import SVG from 'react-inlinesvg';

import * as actions from '../../../../actions';
import * as walletsActions from '../../../../actions/cabinet/wallets';
import * as utils from '../../../../utils';

import InfoRow, {InfoRowGroup} from '../../cabinet/InfoRow/InfoRow';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import * as toast from '../../../../actions/toasts';

class SendCoinsConfirmModal extends React.Component {
  state = {
    gaCode: '',
    errorGaCode: false,
    pending: false,
  };

  render() {

    this.currency = this.props.currency;
    this.currencyInfo = actions.getCurrencyInfo(this.currency);

    return (
      <UI.Modal className="SendCoinsConfirmModal__wrapper" isOpen={true} onClose={this.props.onClose} width={464}>
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
    const { address, amount } = this.props;
    const currencyInfo = this.currencyInfo;
    const currency = this.currency.toUpperCase();

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
        <div className="SendCoinsConfirmModal__card" style={{background: currencyInfo.background}}>
          <div className="SendCoinsConfirmModal__card__icon">
            <SVG src={require('../../../../asset/24px/send.svg')} />
          </div>
          <div className="SendCoinsConfirmModal__card__label">{utils.getLang('cabinet_sendCoinsConfirmModal_total')}</div>
          <div className="SendCoinsConfirmModal__card__value">{utils.formatDouble(amount)} {currency}</div>
        </div>

        <UI.Input
          autoFocus
          type="code"
          cell
          autoComplete="off"
          mouseWheel={false}
          value={this.state.gaCode}
          onChange={this.__handleChange}
          placeholder={utils.getLang('site__authModalGAPlaceholder')}
          indicator={
            <SVG src={require('../../../../asset/google_auth.svg')} />
          }
          error={this.state.errorGaCode}
        />
        <div className="SendCoinsConfirmModal__submit_wrapper">
          <UI.Button currency={currency.toLowerCase()} onClick={this.__handleSubmit} disabled={this.state.pending || this.state.gaCode.length < 6}>
            {utils.getLang('site__authModalSubmit')}
          </UI.Button>
        </div>
      </div>
    )
  }

  __handleChange = e => {
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
    const {address, wallet_id, amount} = this.props;
    return {address, wallet_id, amount, ga_code: this.state.gaCode};
  }

  __handleSubmit = () => {
    this.setState({pending: true});
    walletsActions.sendCoins(this.__buildParams()).then((info) => {
      toast.success(utils.getLang('cabinet_sendCoinsModal_success'));
      this.props.onClose();
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
          toast.error(info.message);
          break;
      }
    }).finally(() => {
      this.setState({pending: false});
    });
  }
}

export default storeUtils.getWithState(
  CLASSES.SEND_COINS_CONFIRM_MODAL,
  SendCoinsConfirmModal
);