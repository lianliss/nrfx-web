import './PartnerInfoModal.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import UI from '../../../ui';

import ModalState from '../ModalState/ModalState';
import * as profileActions from '../../../actions/cabinet/profile';
import WalletBox from '../WalletBox/WalletBox';
import * as utils from '../../../utils';
import DepositTable from '../../../containers/cabinet/CabinetInvestmentsScreen/components/DepositTable';

export default class PartnerInfoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingStatus: 'loading',
    };
  }

  componentDidMount() {
    this.__load();
  }

  render() {
    if (this.state.loadingStatus) {
      return (
        <ModalState status={this.state.loadingStatus} onRetry={this.__load} />
      );
    }

    return (
      <UI.Modal isOpen onClose={() => window.history.back()} width={800}>
        {this.__renderUserInfo()}
        {this.__renderProfit()}
        {this.__renderDeposits()}
      </UI.Modal>
    )
  }

  __renderUserInfo() {
    const { photo_url, name, login } = this.state.user;
    return (
      <div className="PartnerInfoModal__user_info">
        <div className="ProfileUser__avatar__wrap">
          <img className="ProfileUser__avatar blur" src={photo_url} alt="" />
          <img className="ProfileUser__avatar" src={photo_url} alt="" />
        </div>
        <div className="PartnerInfoModal__user_info__cont">
          <div className="PartnerInfoModal__user_info__name">{name}</div>
          <div className="PartnerInfoModal__user_info__login">{login}</div>
        </div>
      </div>
    )
  }

  __renderProfit() {
    if (!this.state.profits.length) {
      return null;
    }

    return (
      <div className="PartnerInfoModal__block">
        <div className="PartnerInfoModal__block__title">Profit</div>
        <div className="PartnerInfoModal__block__content">
          <div className="CabinetProfileScreen__wallets">
            {this.state.profits.map((profit, i) => {
              return (
                <WalletBox
                  key={i}
                  {...profit}
                  skipEmptyLabel
                />
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  __renderDeposits() {
    if (!this.state.deposits.length) {
      return null;
    }

    return (
      <DepositTable
        deposits={this.state.deposits}
        adaptive={this.props.adaptive}
        fromPartners
      />
    )
  }

  __load = () => {
    this.setState({ loadingStatus: 'loading' });
    profileActions.loadPartnerInfo(this.props.id)
      .then((resp) => this.setState({ ...resp, loadingStatus: '' }))
      .catch((err) => this.setState({ loadingStatus: err.error_name }));
  };
}
