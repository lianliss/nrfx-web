import React from "react";
import { useSelector } from "react-redux";
import "./MegaMenu.less";
import { classNames as cn } from "src/utils/index";
import SVG from "react-inlinesvg";
import AppButtons from "../../../../components/AppButtons/AppButtons";
import * as actions from "../../../../actions";
import * as pages from "../../../../index/constants/pages";
import { userSelector } from "../../../../selectors";
import * as steps from "../../../../components/AuthModal/fixtures";
import { useRouter } from "react-router5";
import Lang from "../../../../components/Lang/Lang";

export default ({ visible }) => {
  const router = useRouter();
  const user = useSelector(userSelector);
  return (
    <div className={cn("MegaMenu", "LandingWrapper__block", { visible })}>
      <div className="MegaMenu__content LandingWrapper__content">
        <ul className="MegaMenu__productList">
          <li
            onClick={() => {
              user
                ? router.navigate(pages.FIAT)
                : actions.openModal("auth", { type: steps.REGISTRATION });
            }}
          >
            <SVG src={require("src/asset/120/buy_currency.svg")} />
            <div>
              <h4>
                <Lang name="landing_megaMenu_buyCrypto_title" />
              </h4>
              <p>
                <Lang name="landing_megaMenu_buyCrypto_description" />
              </p>
            </div>
          </li>
          <li
            onClick={() => {
              router.navigate(pages.EXCHANGE);
            }}
          >
            <SVG src={require("src/asset/120/exchange.svg")} />
            <div>
              <h4>
                <Lang name="landing_megaMenu_trade_title" />
              </h4>
              <p>
                <Lang name="landing_megaMenu_trade_description" />
              </p>
            </div>
          </li>
        </ul>
        <div className="MegaMenu__image" />
        <div className="MegaMenu__description">
          <h3>
            <Lang name="landing_megaMenu_mobileApplication_title" />
          </h3>
          <p>
            <Lang name="landing_megaMenu_mobileApplication_description" />
          </p>
          <AppButtons />
        </div>
      </div>
    </div>
  );
};
