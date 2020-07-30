import "./InviteLinks.less";

import React from "react";
import * as UI from "../../../../../../ui/index";
import SVG from "react-inlinesvg";

import * as actions from "../../../../../../actions";
import * as utils from "../../../../../../utils";

export default class InviteLinks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      names: {}
    };
  }

  render() {
    return (
      <UI.ContentBox className="InviteLinks">
        <div className="InviteLinks__title_wrap">
          <div className="InviteLinks__title">
            {utils.getLang("cabinet_referralLinks")}
          </div>
          <div
            className="InviteLinks__add_button"
            onClick={this.__addButtonDidPress}
          >
            <SVG src={require("../../../../../../asset/16px/plus.svg")} />
          </div>
        </div>
        <div className="InviteLinks__items">{this.__renderLinks()}</div>
      </UI.ContentBox>
    );
  }

  __addButtonDidPress = () => {
    actions.openModal("invite_link");
  };

  __nameDidChange = (link, text) => {
    let names = Object.assign({}, this.state.names);
    names[link.id] = text;
    this.setState({ names });
  };

  __save(link) {
    if (
      this.state.names.hasOwnProperty(link.id) &&
      !this.state.names[link.id]
    ) {
      this.__nameDidChange(link, link.name);
    } else if (
      this.state.names[link.id] &&
      this.state.names[link.id] !== link.name
    ) {
      this.props.linkDidChange(link, this.state.names[link.id]);
    }
  }

  __renderLinks() {
    return this.props.links.map(link => {
      if (link.deleted) {
        return (
          <div className="InviteLinks__item deleted" key={link.id}>
            {utils.getLang("cabinet_referralLinks_deleted")}
            <span
              className="InviteLinks__item__restore"
              onClick={() => this.props.linkDidRestore(link.id)}
            >
              {utils.getLang("global_restore")}
            </span>
          </div>
        );
      }
      return (
        <div className="InviteLinks__item" key={link.id}>
          <div className="InviteLinks__item__cont">
            <UI.Input
              placeholder={utils.getLang("cabinet_referralLinks_name")}
              value={
                this.state.names.hasOwnProperty(link.id)
                  ? this.state.names[link.id]
                  : link.name
              }
              disabled={!link.id}
              onTextChange={text => this.__nameDidChange(link, text)}
              onKeyPress={e => e.key === "Enter" && this.__save(link)}
              onBlur={() => this.__save(link)}
            />
            {!this.adaptive && link.id > 0 && (
              <UI.Button
                type="secondary"
                onClick={() => this.props.linkDidDelete(link.id)}
              >
                <SVG src={require("../../../../../../asset/24px/trash.svg")} />
              </UI.Button>
            )}
            {!this.adaptive && (
              <UI.Button onClick={() => this.props.linkDidCopy(link.link)}>
                {utils.getLang("cabinet_referralLinks_copyLink")}
              </UI.Button>
            )}
          </div>
          {link.id > 0 && (
            <div className="InviteLinks__item__stats">
              <div className="InviteLinks__item__stats__item">
                <div className="InviteLinks__item__stats__item__label">
                  {utils.getLang("cabinet_referralLinks_views")}:
                </div>{" "}
                {link.view_count}
              </div>
              <div className="InviteLinks__item__stats__item">
                <div className="InviteLinks__item__stats__item__label">
                  {utils.getLang("cabinet_referralLinks_joined")}:
                </div>{" "}
                {link.join_count}
              </div>
              <div className="InviteLinks__item__stats__item">
                <div className="InviteLinks__item__stats__item__label">
                  {utils.getLang("cabinet_referralLinks_deposits")}:
                </div>{" "}
                {link.deposits_count}
              </div>
            </div>
          )}
          {this.__renderMobileLinks(link)}
        </div>
      );
    });
  }

  __renderMobileLinks(link) {
    if (!this.adaptive) {
      return null;
    }

    return (
      <div className="InviteLinks__item__mobile_links">
        {link.id > 0 && (
          <UI.Button
            type="secondary"
            onClick={() => this.props.linkDidDelete(link.id)}
          >
            {utils.getLang("global_delete")}
          </UI.Button>
        )}
        <UI.Button onClick={() => this.props.linkDidCopy(link.link)}>
          Copy Link
        </UI.Button>
      </div>
    );
  }
}
