import React from "react";
import "./Promo.less";
import { Button } from "../../../../../ui";
import AppButtons from "../../../../../components/AppButtons/AppButtons";
import * as actions from "../../../../../actions";
import * as steps from "../../../../../components/AuthModal/fixtures";
import * as pages from "../../../../../index/constants/pages";
import { useRouter } from "react-router5";
import Lang from "../../../../../components/Lang/Lang";

export default props => {
  const router = useRouter();

  const handleClickBuyToken = e => {
    e.stopPropagation();
    e.preventDefault();
    router.navigate(pages.TOKEN);
  };
  return (
    <div className="LandingWrapper__block Promo">
      <div className="LandingWrapper__content Promo__content">
        <div className="Promo__content__text">
          <h1>{props.title}</h1>
          <p>{props.description}</p>
          <Button
            onClick={() => {
              actions.openModal("auth", { type: steps.REGISTRATION });
            }}
            className="extra_large"
          >
            {props.actionButtonText}
          </Button>
          <AppButtons className="Promo__appButtons" />
          {props.label && (
            <div className="Promo__buyNrfx" onClick={handleClickBuyToken}>
              <div className="Promo__buyNrfx__button">{props.label}</div>
              <div className="Promo__buyNrfx__label">
                {props.labelDescription} <a href="#">{props.labelLink} ›</a>
              </div>
            </div>
          )}
        </div>
        <div
          className="Promo__image"
          style={{
            backgroundImage: `url(${props.image})`
          }}
        />
      </div>
    </div>
  );
};
