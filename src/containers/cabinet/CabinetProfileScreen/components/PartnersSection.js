import React, { memo } from 'react';
import { connect } from 'react-redux';
import copyText from 'clipboard-copy';

import * as actions from '../../../../actions';
import * as toastsActions from '../../../../actions/cabinet/toasts';
import * as profileActions from '../../../../actions/cabinet/profile';
import * as walletsActions from '../../../../actions/cabinet/wallets';
import ReferralLink from './ReferralLink/ReferralLink';
import PartnersTable from './PartnersTable';
import WalletBox from '../../../../components/cabinet/WalletBox/WalletBox';
import CustomersTable from './CustomersTable';
import AgentsTable from './AgentsTable';
import InviteLinks from './InviteLinks/InviteLinks';

class PartnersSection extends React.Component {
  constructor(props) {
    super(props);

    this.inviteLink = props.profile.user ? `https://bitcoinbot.pro/?ref=${props.profile.user.login}` : '';
  }

  render() {
    return (
      <div>
        {this.__renderWallets()}
        {this.__renderPartners()}
      </div>
    )
  }

  __renderPartners = () => {
    switch (this.props.level) {
      case 'agent':
        return [
          <InviteLinks
            key="links"
            links={this.props.links}
            linkDidCopy={this.__linkDidCopy}
            linkDidChange={this.props.saveInviteLink}
            linkDidDelete={this.props.deleteInviteLink}
            linkDidRestore={this.props.restoreInviteLink}
          />,
          <CustomersTable
            key="table"
            customers={this.props.clients}
          />
        ];
      case 'representative':
        return (
          <div>
            <AgentsTable
              agents={this.props.clients}
            />
          </div>
        );
      default:
        return [
          <ReferralLink
            key="link"
            profile={this.props.profile}
            linkDidCopy={this.__linkDidCopy}
            inviteLink={this.inviteLink}
          />,
          <PartnersTable
            key="table"
            partners={this.props.clients}
          />
        ]
    }
  };

  __linkDidCopy = (link) => {
    copyText(link).then(() => {
      toastsActions.success('Link copied');
    });
  };

  __renderWallets = () => {
    if (!this.props.balances.length) {
      return null;
    }

    console.log('this.props.adaptive', this.props);

    const rows = this.props.balances.map((wallet, i) => {
      return <WalletBox
        key={i}
        {...wallet}
        skipEmptyLabel
        onClick={() => console.log('sdfsdsfd')}
        adaptive={this.props.adaptive}
      />
    });
    return <div className="CabinetProfileScreen__wallets">
      {this.props.adaptive ? <div className="CabinetProfileScreen__walletsContentBox">
        {rows}
      </div> : rows}
    </div>
  };
}

PartnersSection.defaultProps = {
  wallets: <></>
};

export default connect(state => ({
  ...state.profile.partner,
  ...state.default,
}), {
  setTitle: actions.setTitle,
  loadWallets: walletsActions.loadWallets,
  loadDashboard: profileActions.loadDashboard,
  getPartner: profileActions.getPartner,
  saveInviteLink: profileActions.saveInviteLink,
  deleteInviteLink: profileActions.deleteInviteLink,
  restoreInviteLink: profileActions.restoreInviteLink
})(memo(PartnersSection));
