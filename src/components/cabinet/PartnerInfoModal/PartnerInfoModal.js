import './PartnerInfoModal.less';

import React from 'react';
import UI from '../../../ui';

import * as utils from '../../../utils';
import ModalState from '../ModalState/ModalState';
import * as profileActions from '../../../actions/cabinet/profile';
import WalletBox from '../WalletBox/WalletBox';
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
      <UI.Modal
        noSpacing
        isOpen
        onClose={() => window.history.back()}
        width={800}
        grayBackground={this.props.adaptive}
      >
        {this.props.adaptive && <UI.ModalHeader>
          {utils.getLang('cabinet_customerTitle')}
        </UI.ModalHeader>}
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

    const rows = this.state.profits.map((profit, i) => {
      return (
        <WalletBox
          key={i}
          {...profit}
          skipEmptyLabel
          adaptive={this.props.adaptive}
        />
      )
    });

    return (
      <Block
        adaptive={this.props.adaptive}
        title={utils.getLang('cabinet_investmentsScreen_profit')}
        modifier="wallets"
      >
        <div className="CabinetProfileScreen__wallets">
          {this.props.adaptive ? <div className="CabinetProfileScreen__walletsContentBox">
            {rows}
          </div> : rows}
        </div>
      </Block>
    );
  }

  __renderDeposits() {
    if (!this.state.deposits || !this.state.deposits.length) {
      return null;
    }

    return (
      <Block
        adaptive={this.props.adaptive}
        title={utils.getLang('cabinet_referralLinks_deposits')}
        skipMargin
      >
        <DepositTable
          deposits={this.state.deposits}
          adaptive={this.props.adaptive}
          fromPartners
          skipContentBox
        />
      </Block>
    );
  }

  __load = () => {
    this.setState({ loadingStatus: 'loading' });
    profileActions.loadPartnerInfo(this.props.login)
      .then((resp) => this.setState({ ...resp, loadingStatus: '' }))
      .catch((err) => this.setState({ loadingStatus: err.error_name }));
  };
}

function Block(props) {
  const {
    title,
    children,
    skipMargin,
    modifier,
    adaptive
  } = props;

  const className = utils.classNames({
    PartnerInfoModal__block: true,
    skip_margin: !!skipMargin,
    [modifier]: !!modifier,
    Content_box: !!adaptive,
  });

  return (
    <div className={className}>
      <div className="PartnerInfoModal__block__title">{title}</div>
      <div className="PartnerInfoModal__block__content">
        {children}
      </div>
    </div>
  )
}
