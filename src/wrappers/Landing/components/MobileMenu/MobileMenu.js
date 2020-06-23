import React from "react";
import "./MobileMenu.less";
import { classNames as cn } from "../../../../utils";
import { Button } from "../../../../ui";
import SVG from "react-inlinesvg";

export default ({ visible }) => {
  return (
    <div className={cn("MobileMenu", { visible })}>
      <div className="MobileMenu__buttons">
        <Button type="outline">Компания</Button>
        <Button type="outline">Коммисия</Button>
        <Button type="outline">Помощь</Button>
      </div>
      <ul className="MobileMenu__productList">
        <li>
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
        <Button>Регистрация</Button>
        <Button type="outline">Войти</Button>
      </div>
    </div>
  );
};
