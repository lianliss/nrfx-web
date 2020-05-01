import React, { memo } from "react";
import { connect } from "react-redux";
import copyText from "clipboard-copy";

import * as actions from "../../../../../actions";
import * as utils from "../../../../../utils";
import * as toastsActions from "../../../../../actions/toasts";
import * as profileActions from "../../../../../actions/cabinet/profile";
import * as walletsActions from "../../../../../actions/cabinet/wallets";
import ReferralLink from "./ReferralLink/ReferralLink";
import PartnersTable from "./PartnersTable";
import WalletBox from "../../../../components/cabinet/WalletBox/WalletBox";
import CustomersTable from "./CustomersTable";
import AgentsTable from "./AgentsTable";
import InviteLinks from "./InviteLinks/InviteLinks";
import InviteAgent from "./InviteAgent/InviteAgent";
import COMPANY from "../../../../constants/company";
import Paging from "../../../../components/cabinet/Paging/Paging";

class PartnersSection extends React.Component {
  constructor(props) {
    super(props);

    this.inviteLink = props.profile.user
      ? `${COMPANY.url}?ref=${props.profile.user.login}`
      : "";
  }

  render() {
    return (
      <div>
        {this.__renderWallets()}
        {this.__renderPartners()}
      </div>
    );
  }

  __renderPartners = () => {
    switch (this.props.level) {
      case "agent":
        return [
          <InviteLinks
            key="links"
            links={this.props.links}
            linkDidCopy={this.__linkDidCopy}
            linkDidChange={this.props.saveInviteLink}
            linkDidDelete={this.props.deleteInviteLink}
            linkDidRestore={this.props.restoreInviteLink}
            adaptive={this.props.adaptive}
          />,
          <CustomersTable
            key="table"
            customers={this.props.clients}
            adaptive={this.props.adaptive}
          />
        ];
      case "representative":
        return [
          <InviteAgent />,
          <AgentsTable
            ket="table"
            agents={this.props.clients}
            adaptive={this.props.adaptive}
          />
        ];
      default:
        return (
          <div>
            <ReferralLink
              key="link"
              profile={this.props.profile}
              linkDidCopy={this.__linkDidCopy}
              inviteLink={this.inviteLink}
            />
            <Paging
              isCanMore={
                !!this.props.clients.next && !this.props.partnersTableStatus
              }
              onMore={this.props.getPartnerMore}
              moreButton={!!this.props.clients.next}
              isLoading={this.props.partnersTableStatus}
            >
              <PartnersTable
                key="table"
                partners={this.props.clients.items}
                adaptive={this.props.adaptive}
              />
            </Paging>
          </div>
        );
    }
  };

  __linkDidCopy = link => {
    copyText(link).then(() => {
      toastsActions.success(utils.getLang("cabinet_referralLinks_copied"));
    });
  };

  __renderWallets = () => {
    if (!this.props.balances.length) {
      return null;
    }

    const rows = this.props.balances.map((wallet, i) => {
      return (
        <WalletBox
          key={i}
          {...wallet}
          action={false}
          skipEmptyLabel
          onClick={() => this.__withdrawal(wallet)}
          adaptive={this.props.adaptive}
        />
      );
    });
    return (
      <div
        className={utils.classNames({
          CabinetProfileScreen__wallets: true,
          Content_box: this.props.adaptive
        })}
      >
        {rows}
      </div>
    );
  };

  __withdrawal(balance) {
    actions.openModal("manage_balance", {
      withdrawal: 1,
      currency: balance.currency,
      category: "partners"
    });
  }
}

export default connect(
  state => ({
    ...state.profile.partner,
    ...state.default,
    translator: state.settings.translator,
    partnersTableStatus: state.profile.loadingStatus.partnersTable
  }),
  {
    setTitle: actions.setTitle,
    loadWallets: walletsActions.loadWallets,
    getPartner: profileActions.getPartner,
    getPartnerMore: profileActions.getPartnerMore,
    saveInviteLink: profileActions.saveInviteLink,
    deleteInviteLink: profileActions.deleteInviteLink,
    restoreInviteLink: profileActions.restoreInviteLink
  }
)(memo(PartnersSection));
