import "./Header.less";
import React from "react";

import Logo from "../../../ui/components/Logo/Logo";
import * as auth from "../../../actions/auth";
import { BaseLink } from "react-router5";
import router from "../../../router";
import * as PAGES from "../../constants/pages";
import ContentBox from "../../../ui/components/ContentBox/ContentBox";

export default props => {
  return (
    <ContentBox className="Header">
      <BaseLink router={router} routeName={PAGES.PANEL}>
        <Logo />
      </BaseLink>
      <div className="Header__title">Control Panel</div>
      <div className="Header__menu">
        <div className="Header__menu_item" onClick={auth.logout}>
          Logout
        </div>
      </div>
    </ContentBox>
  );
};
