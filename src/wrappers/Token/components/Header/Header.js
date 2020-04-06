import "./Header.less";

import React, { useState } from "react";
import { connect } from "react-redux";

import SVG from "react-inlinesvg";
import { ActionSheet, Button, HamburgerButton } from "../../../../ui";
import { getCurrentLang } from "src/actions/index";
import { setLang } from "../../../../services/lang";
import { getLang } from "src/utils";
import router from "../../../../router";
import * as pages from "../../../../admin/constants/pages";
import { classNames as cn } from "src/utils";
import useDocumentScroll from "src/hooks/useDocumentScroll";

const Header = props => {
  const [scrollPosition] = useDocumentScroll();
  const shadow = scrollPosition > 0;

  return (
    <div className={cn("TokenWrapper__header", { shadow })}>
      <div className="TokenWrapper__content">
        <div className="TokenWrapper__header__logo">
          <div className="TokenWrapper__header__logo__normal">
            <SVG src={require("src/asset/token/header_logo.svg")} />
          </div>
          <div className="TokenWrapper__header__logo__mobile">
            <SVG src={require("src/asset/token/header_logo_mobile.svg")} />
          </div>
        </div>
        <div className="TokenWrapper__header__menu">
          <a className="TokenWrapper__header__menu__link" href="#sdf">
            {getLang("token_whitePaper")}
          </a>
          <a className="TokenWrapper__header__menu__link" href="#sdf">
            {getLang("token_Benefits")}
          </a>
          <a className="TokenWrapper__header__menu__link" href="#sdf">
            {getLang("token_TokenData")}
          </a>
          <a className="TokenWrapper__header__menu__link" href="#sdf">
            {getLang("token_Roadmap")}
          </a>
          <a className="TokenWrapper__header__menu__link" href="#sdf">
            {getLang("token_Burning")}
          </a>
          <a className="TokenWrapper__header__menu__link" href="#sdf">
            {getLang("token_SmartContract")}
          </a>
          <Button
            rounded
            size="small"
            onClick={() => {
              router.navigate(pages.MAIN);
            }}
            type="outline_white"
          >
            {getLang("token_MainSite")}
          </Button>
          <ActionSheet
            items={props.langList
              .filter(l => l.display)
              .map(i => ({
                title: i.title,
                onClick: () => setLang(i.value)
              }))}
          >
            <Button size="small" type="lite">
              <span>{getCurrentLang().value}</span>
              <SVG src={require("src/asset/16px/arrow-outline-down.svg")} />
            </Button>
          </ActionSheet>
        </div>

        <HamburgerButton className={"TokenWrapper__header__hamburgerButton"} />
      </div>
    </div>
  );
};

export default connect(state => ({
  langList: state.default.langList,
  currentLang: state.default.currentLang
}))(Header);
