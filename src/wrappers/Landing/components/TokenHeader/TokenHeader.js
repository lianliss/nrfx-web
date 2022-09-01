import React, { useState, useCallback, useEffect, useRef } from "react";
import { Button, ButtonWrapper, Logo } from "../../../../ui";
import { classNames as cn } from "src/utils/index";
import MegaMenu from "../MegaMenu/MegaMenu";
import MobileMenu from "../MobileMenu/MobileMenu";
import "./TokenHeader.less";
import SVG from "utils/svg-wrap";
import * as actions from "src/actions/index";
import * as steps from "../../../../components/AuthModal/fixtures";
import { useRoute, useRouter } from "react-router5";
import * as pages from "../../../../index/constants/pages";
import { useSelector } from "react-redux";
import { currentLangSelector, profileSelector } from "../../../../selectors";
import Lang from "../../../../components/Lang/Lang";
import LanguageChanger from "../../../../ui/components/LanguageChanger/LanguageChanger";

export default () => {
  const router = useRouter();
  const route = useRoute();
  const headerRef = useRef(null);
  const { user, pending } = useSelector(profileSelector);
  const currentLang = useSelector(currentLangSelector);
  const [openedMegaMenu, setOpenedMegaMenu] = useState(false);
  const [openedMobileMenu, setOpenedMobileMenu] = useState(false);

  const handleClickProducts = useCallback(() => {
    setOpenedMegaMenu(!openedMegaMenu);
  }, [openedMegaMenu]);

  const escFunction = useCallback(
    event => {
      if (event.keyCode === 27) {
        setOpenedMegaMenu(false);
      }
    },
    [setOpenedMegaMenu]
  );

  const handleClickMobileMenu = useCallback(() => {
    setOpenedMobileMenu(!openedMobileMenu);
    if (openedMobileMenu) {
      document.removeEventListener("keydown", escFunction, false);
    }
  }, [escFunction, openedMobileMenu, setOpenedMobileMenu]);

  useEffect(() => {
    setOpenedMegaMenu(false);
    setOpenedMobileMenu(false);
  }, [route.route.name]);

  const handleClick = e => {
    if (!headerRef.current.contains(e.target)) {
      setOpenedMegaMenu(false);
    }
  };

  useEffect(() => {
    if (openedMegaMenu) {
      document.addEventListener("click", handleClick, false);
    } else {
      document.removeEventListener("click", handleClick, false);
    }

    return () => {
      document.removeEventListener("click", handleClick, false);
    };
  }, [openedMegaMenu]);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  return (
    <div
      ref={headerRef}
      className={cn("TokenHeader__wrapper", { openedMobileMenu })}
    >
      <div className="LandingWrapper__block">
        <header className="TokenHeader">
          <Logo
            onClick={() => {
              router.navigate(pages.MAIN);
            }}
            className="TokenHeader__logo"
            size="extra-large"
            type="NRFX"
          />
          <ul className="TokenHeader__nav">
            {/* <li
              onClick={handleClickProducts}
              className={cn({ active: openedMegaMenu })}
            >
              <Lang name="site__headerProducts" />
              <SVG src={require("src/asset/24px/angle-down-small.svg")} />
            </li> */}
            <li onClick={() => router.navigate(pages.NARFEX_DAO)}>
              <Lang name="site__headerCompany" />
            </li>
            {/*<li onClick={() => router.navigate(pages.FEE)}>*/}
              {/*<Lang name="global_fee" />*/}
            {/*</li>*/}
            <li onClick={() => router.navigate(pages.CONTACT)}>
              <Lang name="site__headerContactUs" />
            </li>
            <li onClick={() => router.navigate(pages.TOKEN)}>Narfex Token</li>
          </ul>

          <div className="TokenHeader__authButtons">
            <ButtonWrapper>
              <Button
                type="secondary"
                onClick={() => {
                  router.navigate(pages.DAPP);
                }}
              >
                <Lang name="site_launch_app" />
              </Button>
              <LanguageChanger />
            </ButtonWrapper>
            {/* {user || pending ? (
              <Button
                type="secondary"
                onClick={() => {
                  router.navigate(pages.WALLET);
                }}
              >
                <Lang name="cabinet_header_cabinet" />
              </Button>
            ) : (
              <ButtonWrapper>
                <Button
                  type="lite"
                  onClick={() => {
                    actions.openModal("auth", { type: steps.LOGIN });
                  }}
                >
                  <Lang name="site__authModalLogInBtn" />
                </Button>
                <Button
                  type="secondary"
                  onClick={() => {
                    actions.openModal("auth", { type: steps.REGISTRATION });
                  }}
                >
                  <Lang name="site__authModalSignUpBtn" />
                </Button>
                
                <LanguageChanger />
                <Button
                  type="lite"
                  onClick={() => {
                    actions.openStateModal("language");
                  }}
                >
                  {currentLang.toUpperCase()}
                </Button>
              </ButtonWrapper>
            )} */}
          </div>

          <Button
            onClick={handleClickMobileMenu}
            type="secondary"
            className={cn("TokenHeader__menuButton", { active: openedMobileMenu })}
          >
            <SVG src={require("./assets/menu_button.svg")} />
            <SVG src={require("./assets/menu_button_close.svg")} />
          </Button>
        </header>
        <MobileMenu
          visible={openedMobileMenu}
          onClose={() => setOpenedMobileMenu(false)}
        />
      </div>
      <MegaMenu
        visible={openedMegaMenu}
        onClose={() => setOpenedMegaMenu(false)}
      />
    </div>
  );
};
