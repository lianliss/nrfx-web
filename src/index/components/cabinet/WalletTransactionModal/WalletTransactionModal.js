import './WalletTransactionModal.less';

import React from 'react';
import UI from '../../../../ui';

import * as actions from '../../../../actions';
import * as walletsActions from '../../../../actions/cabinet/wallets';
import LoadingStatus from '../../cabinet/LoadingStatus/LoadingStatus';
import * as utils from '../../../../utils';
import InfoRow, { InfoRowGroup } from '../../cabinet/InfoRow/InfoRow';


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
                  <UI.WalletAddress isUser={data.type === 'transfer'} address={address} />
                </div>}
            </InfoRow>
            <InfoRow label={utils.getLang("global_to")}>
              {data.category === 'receive' ? `${utils.getLang('cabinet_walletTransactionModal_my')} ${utils.ucfirst(currencyInfo.name)}` :
                <div className="Wallets__history__address">
                  <UI.WalletAddress isUser={data.type === 'transfer'} address={address} />
                </div>}
            </InfoRow>
            <InfoRow label={utils.getLang("global_amount")}><UI.NumberFormat number={data.amount} currency={currency} /></InfoRow>
            <InfoRow label={utils.getLang("global_fee")}><UI.NumberFormat number={data.fee} currency={currency} /></InfoRow>
            <InfoRow label={utils.getLang("global_date")}>{ utils.dateFormat(data.created_at)}</InfoRow>
          </InfoRowGroup>

          <UI.WalletCard
            title={utils.getLang('cabinet_walletTransactionModal_total')}
            balance={data.amount + data.fee}
            currency={currencyInfo}
          />

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
