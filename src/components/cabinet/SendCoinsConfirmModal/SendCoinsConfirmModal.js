import './SendCoinsConfirmModal.less';

import React from 'react';
import UI from '../../../ui';
import SVG from 'react-inlinesvg';

import * as actions from '../../../actions';
import * as modalGroupActions from '../../../actions/modalGroup';
import * as utils from '../../../utils';

import InfoRow, {InfoRowGroup} from '../../../components/cabinet/InfoRow/InfoRow';

export default class SendCoinsConfirmModal extends React.Component {
  componentWillMount() {
    this.currencyInfo = actions.getCurrencyInfo(this.props.currency);
    this.currency = this.props.currency;
  }

  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => {this.props.close()}} width={464}>
        <UI.ModalHeader>
          {this.__getTitle()}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __getTitle() {
    return `Confirm Sending ${utils.ucfirst(this.currencyInfo.name)}`;
  }

  __renderContent() {
    const {currencyInfo, currency, address, amount, fee}  = Object.assign({...this.props}, {
      currencyInfo: this.currencyInfo,
      currency: this.currency.toUpperCase(),
    });


    return (
      <div>
        <InfoRowGroup align="left">
          <InfoRow label="From">
            <div className="Wallets__history__address">
              My {utils.ucfirst(currencyInfo.name)}
            </div>
          </InfoRow>
          <InfoRow label="To">
            <div className="Wallets__history__address">
              {address}
            </div>
          </InfoRow>
          <InfoRow label="Amount">{utils.formatDouble(amount)} {currency}</InfoRow>
          <InfoRow label="Fee">{utils.formatDouble(fee)} {currency}</InfoRow>
        </InfoRowGroup>
        <div className="SendCoinsConfirmModal__card">
          <div className="SendCoinsConfirmModal__card__icon">
            <SVG src={require('../../../asset/24px/send.svg')} />
          </div>
          <div className="SendCoinsConfirmModal__card__label">Total</div>
          <div className="SendCoinsConfirmModal__card__value">{utils.formatDouble(amount)} {currency}</div>
        </div>
        <UI.Button onClick={() => {modalGroupActions.modalGroupClear()}}>
          Close
        </UI.Button>
      </div>
    )
  }
}