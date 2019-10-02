import React, { memo } from 'react';
import { connect } from 'react-redux';
import copyText from 'clipboard-copy';

import * as actions from '../../../../actions';
import * as toastsActions from '../../../../actions/cabinet/toasts';
import * as profileActions from '../../../../actions/cabinet/profile';
import * as walletsActions from '../../../../actions/cabinet/wallets';
import ReferralLink from './ReferralLink/ReferralLink';
import TableOfPartners from './TableOfPartners';

class PartnersSection extends React.Component {
  constructor(props) {
    super(props);

    this.inviteLink = `https://bitcoinbot.pro/reg${props.profile.user.id}`;
  }

  render() {
    return (
      <div>
        <ReferralLink
          profile={this.props.profile}
          linkDidCopy={this.__linkDidCopy}
          inviteLink={this.inviteLink}
        />
        {this.__renderTableOfPartners()}
      </div>
    )
  }

  __renderTableOfPartners = e => {
    return <TableOfPartners
      partners={
        [
          1,2,3,4,5,6
        ]
      }
    />
  };

  __linkDidCopy = () => {
    copyText(this.inviteLink).then(() => {
      this.props.toastPush('Link copied', 'success');
    });
  };
}

PartnersSection.defaultProps = {
  wallets: <></>
};

export default connect(state => ({
  ...state.wallets,
  ...state.profile,
  ...state.default,
  adaptive: state.default.adaptive
}), {
  setTitle: actions.setTitle,
  loadWallets: walletsActions.loadWallets,
  loadDashboard: profileActions.loadDashboard,
  getPartner: profileActions.getPartner,
  toastPush: toastsActions.toastPush
})(memo(PartnersSection));
