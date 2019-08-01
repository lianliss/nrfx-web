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
      <UI.Modal isOpen={true} onClose={() => window.history.back()} width={464}>
        <UI.ModalHeader>
          {this.__getTitle()}
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __getTitle() {
    if (!this.state.info) {
      return 'Loading..';
    }

    const currencyInfo = actions.getCurrencyInfo(this.state.info.currency);
    return `${this.state.info.category === 'send' ? 'Sent' : 'Receive'} ${utils.ucfirst(currencyInfo.name)}`;
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

      let address = data.address;
      if (this.props.type === 'transfer') {
        address = address.toUpperCase();
      }

      let status;
      if (data.status === 'done') {
        status = 'Confirmed';
      } else {
        status = 'Confirmation';
      }

      return (
        <div>
          <InfoRowGroup align="left">
            <InfoRow label="From">
              {data.category === 'send' ? `My ${utils.ucfirst(currencyInfo.name)}` :
                <div className="Wallets__history__address">
                  {data.type === 'transfer' && <div className="Wallets__history__bb" />}
                  {address}
                </div>}
            </InfoRow>
            <InfoRow label="To">
              {data.category === 'receive' ? `My ${utils.ucfirst(currencyInfo.name)}` :
                <div className="Wallets__history__address">
                  {data.type === 'transfer' && <div className="Wallets__history__bb" />}
                  {address}
                </div>}
            </InfoRow>
            <InfoRow label="Amount">{utils.formatDouble(data.amount)} {currency}</InfoRow>
            <InfoRow label="Date">{moment(data.created_at).format('DD MMM YYYY h:mm a')}</InfoRow>
          </InfoRowGroup>
          <div className="WalletTransactionModal__card">
            <div className="WalletTransactionModal__card__icon">
              <SVG src={require('../../../asset/24px/receive.svg')} />
            </div>
            <div className="WalletTransactionModal__card__label">Total</div>
            <div className="WalletTransactionModal__card__value">{utils.formatDouble(data.amount)} {currency}</div>
          </div>
          <div className="WalletTransactionModal__status">
            {data.status !== 'done' && <div className="WalletTransactionModal__status__row">
              <div className="WalletTransactionModal__status__row__label">Blockchain Confirmations</div>
              <div className="WalletTransactionModal__status__row__value">1/2</div>
            </div>}
            <div className="WalletTransactionModal__status__row right">
              <div className="WalletTransactionModal__status__row__label">Status</div>
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