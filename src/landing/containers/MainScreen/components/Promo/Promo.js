import React from "react";
import "./Promo.less";
import { Button } from "../../../../../ui";
import AppButtons from "../../../../../wrappers/Landing/components/AppButtons/AppButtons";
import * as actions from "../../../../../actions";
import * as steps from "../../../../../components/AuthModal/fixtures";

export default () => {
  return (
    <div className="LandingWrapper__block Promo">
      <div className="LandingWrapper__content Promo__content">
        <div className="Promo__content__text">
          <h1>Покупайте и обменивайте криптовалюты</h1>
          <p>
            Narfex – самый простой способ для покупки, продажи и хранения
            Bitcoin, Ethereum и других криптовалют
          </p>
          <Button
            onClick={() => {
              actions.openModal("auth", { type: steps.REGISTRATION });
            }}
            className="extra_large"
          >
            Попробовать
          </Button>
          <AppButtons className="Promo__appButtons" />
          <div className="Promo__buyNrfx">
            <Button size="ultra_small">Narfex Token</Button>
            <div className="Promo__buyNrfx__label">
              NRFX По выгодной цене <a href="#">Купить ›</a>
            </div>
          </div>
        </div>
        <div className="Promo__image" />
      </div>
    </div>
  );
};
