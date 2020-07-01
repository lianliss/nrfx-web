import React, { useState, useCallback, useEffect } from "react";
import { Button, Logo } from "../../../../ui";
import { classNames as cn } from "src/utils/index";
import MegaMenu from "../MegaMenu/MegaMenu";
import MobileMenu from "../MobileMenu/MobileMenu";
import "./Header.less";
import SVG from "react-inlinesvg";
import * as actions from "src/actions/index";
import * as steps from "../../../../components/AuthModal/fixtures";
import { useRoute, useRouter } from "react-router5";
import * as pages from "../../../../index/constants/pages";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../selectors";
import Lang from "../../../../components/Lang/Lang";
import * as utils from "../../../../utils";

export default () => {
  const router = useRouter();
  const route = useRoute();
  const user = useSelector(userSelector);
  const [openedMegaMenu, setOpenedMegaMenu] = useState(false);
  const [openedMobileMenu, setOpenedMobileMenu] = useState(false);

  const handleClickProducts = useCallback(() => {
    setOpenedMegaMenu(!openedMegaMenu);
  }, [openedMegaMenu]);

  const handleClickMobileMenu = useCallback(() => {
    setOpenedMobileMenu(!openedMobileMenu);
    if (openedMobileMenu) {
      document.removeEventListener("keydown", escFunction, false);
    }
  }, [openedMobileMenu]);

  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      setOpenedMegaMenu(false);
    }
  }, []);

  useEffect(() => {
    setOpenedMegaMenu(false);
    setOpenedMobileMenu(false);
  }, [route.route.name]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div className={cn("Header__wrapper", { openedMobileMenu })}>
      <div className="LandingWrapper__block">
        <header className="Header LandingWrapper__content">
          <Logo
            onClick={() => {
              router.navigate(pages.MAIN);
            }}
            className="Header__logo"
            size="extra-large"
          />
          <ul className="Header__nav">
            <li
              onClick={handleClickProducts}
              className={cn({ active: openedMegaMenu })}
            >
              <Lang name="site__headerProducts" />
              <SVG src={require("src/asset/24px/angle-down-small.svg")} />
            </li>
            <li onClick={() => router.navigate(pages.ABOUT)}>
              <Lang name="site__headerCompany" />
            </li>
            <li onClick={() => router.navigate(pages.FEE)}>
              <Lang name="global_fee" />
            </li>
            <li onClick={() => router.navigate(pages.CONTACT)}>
              <Lang name="site__headerContactUs" />
            </li>
          </ul>

          <div className="Header__authButtons">
            {user ? (
              <Button
                type="outline"
                onClick={() => {
                  router.navigate(pages.DASHBOARD);
                }}
              >
                <Lang name="cabinet_header_cabinet" />
              </Button>
            ) : (
              <>
                <Button
                  type="lite"
                  onClick={() => {
                    actions.openModal("auth", { type: steps.LOGIN });
                  }}
                >
                  {utils.getLang("site__authModalLogInBtn")}
                </Button>
                <Button
                  type="outline"
                  onClick={() => {
                    actions.openModal("auth", { type: steps.REGISTRATION });
                  }}
                >
                  <Lang name="site__authModalSignUpBtn" />
                </Button>
              </>
            )}
          </div>

          <div
            onClick={handleClickMobileMenu}
            className={cn("Header__menuButton", { active: openedMobileMenu })}
          >
            <SVG src={require("./assets/menu_button.svg")} />
            <SVG src={require("./assets/menu_button_close.svg")} />
          </div>
        </header>
        <MobileMenu visible={openedMobileMenu} />
      </div>
      <MegaMenu visible={openedMegaMenu} />
    </div>
  );
};
