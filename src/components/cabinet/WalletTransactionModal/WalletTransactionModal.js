import './WalletTransactionModal.less';

import React from 'react';
import UI from '../../../ui';
import moment from 'moment/min/moment-with-locales';

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

      console.log(data);

      let address = data.address;
      if (this.props.type === 'transfer') {
        address = address.toUpperCase();
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
            <InfoRow label="Amount">{utils.formatDouble(data.amount)}</InfoRow>
            <InfoRow label="Date">{moment(data.created_at).format('DD MMM YYYY h:mm a')}</InfoRow>
          </InfoRowGroup>
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