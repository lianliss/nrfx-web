import React, { useState, useCallback, useEffect } from "react";
import { Button, Logo } from "../../../../ui";
import { classNames as cn } from "src/utils/index";
import MegaMenu from "../MegaMenu/MegaMenu";
import MobileMenu from "../MobileMenu/MobileMenu";
import "./Header.less";
import SVG from "react-inlinesvg";
import * as actions from "src/actions/index";
import * as steps from "../../../../components/AuthModal/fixtures";

export default () => {
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
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div className={cn("Header__wrapper", { openedMobileMenu })}>
      <div className="LandingWrapper__block">
        <header className="Header LandingWrapper__content">
          <Logo className="Header__logo" size="extra-large" />
          <ul className="Header__nav">
            <li
              onClick={handleClickProducts}
              className={cn({ active: openedMegaMenu })}
            >
              Продукты
              <SVG src={require("src/asset/24px/angle-down-small.svg")} />
            </li>
            <li>Компания</li>
            <li>Комиссии</li>
            <li>Помощь</li>
          </ul>

          <div className="Header__authButtons">
            <Button
              type="lite"
              onClick={() => {
                actions.openModal("auth", { type: steps.LOGIN });
              }}
            >
              Войти
            </Button>
            <Button
              type="outline"
              onClick={() => {
                actions.openModal("auth", { type: steps.REGISTRATION });
              }}
            >
              Регистрация
            </Button>
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
