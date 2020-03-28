import "./Header.less";
import React from "react";
import { connect } from "react-redux";

import Logo from "src/ui/components/Logo/Logo";
import { BaseLink } from "react-router5";
import router from "src/router";
import * as PAGES from "src/index/constants/pages";
import ContentBox from "src/ui/components/ContentBox/ContentBox";
import * as UI from "../../../../ui";
import * as actions from "../../../../actions";
import * as steps from "../../../../components/AuthModal/fixtures";
import * as utils from "../../../../utils";
import SVG from "react-inlinesvg";

const Header = props => {
  const lang = actions.getCurrentLang();
  return (
    <ContentBox className="DocumentationHeader">
      <BaseLink router={router} routeName={PAGES.MAIN}>
        <Logo />
      </BaseLink>
      <div className="Header__title">Documentation</div>
      {/*<div className="Header__menu"></div>*/}
      <div className="Header__controls">
        {props.isLogged && (
          <>
            <UI.Button
              onClick={() =>
                actions.openModal("auth", null, { type: steps.LOGIN })
              }
              className="login"
              size="middle"
              type="lite"
            >
              {utils.getLang("site__authModalLogInBtn")}
            </UI.Button>
            <UI.Button
              onClick={() =>
                actions.openModal("auth", null, { type: steps.REGISTRATION })
              }
              size="middle"
              type="outline"
            >
              {utils.getLang("site__authModalSignUpBtn")}
            </UI.Button>
          </>
        )}
        <div
          onClick={() => actions.openModal("language")}
          className="Header__controls__lang"
        >
          <span>{lang.title}</span>
          <SVG
            src={require(`../../../../asset/site/lang-flags/${lang.value}.svg`)}
          />
        </div>
      </div>
    </ContentBox>
  );
};

export default connect(state => ({
  lang: state.default.currentLang,
  isLogged: state.default.profile.user
}))(Header);
