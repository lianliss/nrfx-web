import React from "react";
import { useSelector } from "react-redux";
import "./MegaMenu.less";
import { classNames as cn } from "src/utils/index";
import SVG from "react-inlinesvg";
import AppButtons from "../AppButtons/AppButtons";
import * as actions from "../../../../actions";
import * as pages from "../../../../index/constants/pages";
import { userSelector } from "../../../../selectors";
import * as steps from "../../../../components/AuthModal/fixtures";

export default ({ visible }) => {
  const user = useSelector(userSelector);
  return (
    <div className={cn("MegaMenu", "LandingWrapper__block", { visible })}>
      <div className="MegaMenu__content LandingWrapper__content">
        <ul className="MegaMenu__productList">
          <li
            onClick={() => {
              user
                ? actions.openPage(pages.FIAT)
                : actions.openModal("auth", { type: steps.REGISTRATION });
            }}
          >
            <SVG src={require("src/asset/120/buy_currency.svg")} />
            <div>
              <h4>Купить Крипту</h4>
              <p>
                Простой и выгодный обменник для всех.
                <br />
                Ввод и вывод фиатных валют.
              </p>
            </div>
          </li>
          <li>
            <SVG src={require("src/asset/120/exchange.svg")} />
            <div>
              <h4>Торговать</h4>
              <p>
                Профессиональная биржа для трейдеров. Только проверенные монеты.
              </p>
            </div>
          </li>
        </ul>
        <div className="MegaMenu__image" />
        <div className="MegaMenu__description">
          <h3>Мобильное приложение</h3>
          <p>
            Скачайте наше приложение и управляйте криптовалютами, где бы вы ни
            находились.
          </p>
          <AppButtons />
        </div>
      </div>
    </div>
  );
};
