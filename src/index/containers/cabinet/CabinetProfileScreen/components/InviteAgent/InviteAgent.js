import "./InviteAgent.less";

import React from "react";
import * as UI from "../../../../../../ui/index";

import * as toastsActions from "../../../../../../actions/toasts";
import * as profileActions from "../../../../../../actions/cabinet/profile";
import * as utils from "../../../../../../utils";

export default class InviteAgent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      isLoading: false
    };
  }

  render() {
    return (
      <div className="InviteAgent Content_box">
        <div className="InviteAgent__title">
          {utils.getLang("cabinet_agentInvite_title")}
        </div>
        <div className="InviteAgent__form">
          <UI.Input
            placeholder={utils.getLang("cabinet_agentInvite_login")}
            value={this.state.login}
            onTextChange={login => this.setState({ login })}
            onKeyPress={e => e.key === "Enter" && this.__buttonDidPress()}
            disabled={this.state.isLoading}
          />
          <UI.Button
            disabled={this.state.login.trim().length < 3}
            state={this.state.isLoading ? "loading" : ""}
            onClick={this.__buttonDidPress}
          >
            {utils.getLang("global_invite")}
          </UI.Button>
        </div>
      </div>
    );
  }

  __buttonDidPress = () => {
    const login = this.state.login.trim();

    if (login.length < 3) {
      return;
    }

    this.setState({ isLoading: true });
    profileActions
      .inviteAgent(login)
      .then(() => {
        toastsActions.success(utils.getLang("cabinet_agentInvite_sent"));
        this.setState({ isLoading: false, login: "" });
      })
      .catch(err => {
        toastsActions.error(err.message);
        this.setState({ isLoading: false });
      });
  };
}
