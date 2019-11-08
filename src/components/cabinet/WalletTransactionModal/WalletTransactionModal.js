import './WalletTransactionModal.less';

import React from 'react';
import UI from '../../../ui';
import moment from 'moment/min/moment-with-locales';
import SVG from 'react-inlinesvg';

import * as actions from '../../../actions';
import * as walletsActions from '../../../actions/cabinet/wallets';
import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import * as utils from '../../../utils';
import InfoRow, { InfoRowGroup } from '../../../components/cabinet/InfoRow/InfoRow';
import * as currencies from '../../../utils/currencies';


export default class WalletTransactionModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingStatus: 'loading',
      info: false
    };
  }

  componentDidMount() {
    this.__load();
  }

  render() {
    return (
      <UI.Modal className="WalletTransactionModal__wrapper" isOpen={true} onClose={() => {this.props.close()}} width={464}>
        <UI.ModalHeader>
          {this.__getTitle()}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __getTitle() {
    if (!this.state.info) {
      return utils.getLang('cabinet_modal_loadingText');
    }

    const currencyInfo = actions.getCurrencyInfo(this.state.info.currency);

    return `${this.state.info.category === 'send' ? utils.getLang('cabinet_walletTransactionModal_sent') 
      : utils.getLang('cabinet_walletTransactionModal_receive')} ${utils.ucfirst(currencyInfo.name)}`;
  }

  __renderContent() {
    if (this.state.loadingStatus) {
      return (
        <LoadingStatus
          inline
          status={this.state.loadingStatus}
        />
      )
    } else {
      const data = this.state.info;
      const currencyInfo = actions.getCurrencyInfo(data.currency);
      const currency = data.currency.toUpperCase();
      const currencyGradient = currencies.getGradientByCurrency(data.currency);

      let address = data.address;
      if (this.props.type === 'transfer') {
        address = address.toUpperCase();
      }

      let status;
      if (data.status === 'done') {
        status = utils.getLang('cabinet_walletTransactionModal_confirmed');
      } else {
        status = utils.getLang('cabinet_walletTransactionModal_confirmation');
      }

      return (
        <div>
          <div className="WalletTransactionModal__icon" style={{ backgroundImage: `url(${currencyInfo.icon})` }} />
          <InfoRowGroup align="left">
            <InfoRow label={utils.getLang("global_from")}>
              {data.category === 'send' ? `${utils.getLang('cabinet_walletTransactionModal_my')} ${utils.ucfirst(currencyInfo.name)}` :
                <div className="Wallets__history__address">
                  {data.type === 'transfer' && <div className="Wallets__history__bb" />}
                  {address}
                </div>}
            </InfoRow>
            <InfoRow label={utils.getLang("global_to")}>
              {data.category === 'receive' ? `${utils.getLang('cabinet_walletTransactionModal_my')} ${utils.ucfirst(currencyInfo.name)}` :
                <div className="Wallets__history__address">
                  {data.type === 'transfer' && <div className="Wallets__history__bb" />}
                  {address}
                </div>}
            </InfoRow>
            <InfoRow label={utils.getLang("global_amount")}>{utils.formatDouble(data.amount)} {currency}</InfoRow>
            <InfoRow label={utils.getLang("global_date")}>{ utils.dateFormat(data.created_at)}</InfoRow>
          </InfoRowGroup>
          <div className="WalletTransactionModal__card" style={{ background: currencyGradient }}>
            <div className="WalletTransactionModal__card__icon">
              <SVG src={require('../../../asset/24px/receive.svg')} />
            </div>
            <div className="WalletTransactionModal__card__label">{utils.getLang('cabinet_walletTransactionModal_total')}</div>
            <div className="WalletTransactionModal__card__value">{utils.formatDouble(data.amount)} {currency}</div>
          </div>
          <div className="WalletTransactionModal__status">
            {data.status !== 'done' && <div className="WalletTransactionModal__status__row">
              <div className="WalletTransactionModal__status__row__label">{utils.getLang('cabinet_walletTransactionModal_blockchainConfirmations')}</div>
              <div className="WalletTransactionModal__status__row__value">{data.confirmations}/{data.required_confirmations}</div>
            </div>}
            <div className="WalletTransactionModal__status__row right">
              <div className="WalletTransactionModal__status__row__label">{utils.getLang('cabinet_walletTransactionModal_status')}</div>
              <div className={utils.classNames({
                WalletTransactionModal__status__row__value: true,
                [data.status]: data.status
              })}>{status}</div>
            </div>
          </div>
        </div>
      )
    }
  }

  __load = () => {
    this.setState({ loadingStatus: 'loading' });
    walletsActions.loadTransactionInfo(this.props.id, this.props.type).then((info) => {
      this.setState({ loadingStatus: '', info });
    }).catch(() => {
      this.setState({ loadingStatus: 'failed' });
    });
  };
}