import React from "react";
import "./MobileMenu.less";
import { classNames as cn } from "../../../../utils";
import { Button } from "../../../../ui";
import SVG from "react-inlinesvg";
import { useRouter } from "react-router5";
import * as actions from "../../../../actions";
import * as steps from "../../../../components/AuthModal/fixtures";
import * as pages from "../../../../index/constants/pages";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../selectors";

export default ({ visible }) => {
  const router = useRouter();
  const user = useSelector(userSelector);

  return (
    <div className={cn("MobileMenu", { visible })}>
      <div className="MobileMenu__buttons">
        <Button
          type="outline"
          onClick={() => {
            router.navigate(pages.ABOUT);
          }}
        >
          Компания
        </Button>
        <Button
          type="outline"
          onClick={() => {
            router.navigate(pages.FEE);
          }}
        >
          Коммисия
        </Button>
        <Button
          type="outline"
          onClick={() => {
            router.navigate(pages.CONTACT);
          }}
        >
          Помощь
        </Button>
      </div>
      <ul className="MobileMenu__productList">
        <li
          onClick={() => {
            user
              ? router.navigate(pages.FIAT)
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
        <li
          onClick={() => {
            router.navigate(pages.EXCHANGE);
          }}
        >
          <SVG src={require("src/asset/120/exchange.svg")} />
          <div>
            <h4>Купить Крипту</h4>
            <p>
              Простой и выгодный обменник для всех.
              <br />
              Ввод и вывод фиатных валют.
            </p>
          </div>
        </li>
      </ul>
      <div className="MobileMenu__authButtons">
        <Button
          onClick={() => {
            actions.openModal("auth", { type: steps.REGISTRATION });
          }}
        >
          Регистрация
        </Button>
        <Button
          onClick={() => {
            actions.openModal("auth", { type: steps.LOGIN });
          }}
          type="outline"
        >
          Войти
        </Button>
      </div>
    </div>
  );
};
