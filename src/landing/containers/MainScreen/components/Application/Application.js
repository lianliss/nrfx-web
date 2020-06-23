import "./Application.less";
import React from "react";
import AppButtons from "../../../../../wrappers/Landing/components/AppButtons/AppButtons";

export default () => {
  return (
    <div className="LandingWrapper__block Application">
      <div className="LandingWrapper__content">
        <h2>Всегда под рукой</h2>

        <div className="Application__content">
          <div className="Application__image" />
          <div className="Application__description">
            <h3>Скачайте наше приложение</h3>
            <p>
              Скачайте наше приложение и управляйте криптовалютами, где бы вы ни
              находились.
            </p>
            <AppButtons />
          </div>
        </div>
      </div>
    </div>
  );
};
