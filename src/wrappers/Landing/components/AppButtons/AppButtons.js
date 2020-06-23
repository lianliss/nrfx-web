import React from "react";
import SVG from "react-inlinesvg";
import { classNames as cn } from "../../../../utils";
import "./AppButton.less";

export default ({ className }) => {
  return (
    <div className={cn("AppButtons", className)}>
      <div className="AppButtons__button">
        <SVG src={require("src/asset/app_markets/app__store.svg")} />
      </div>
      <div className="AppButtons__button">
        <SVG src={require("src/asset/app_markets/google_play.svg")} />
      </div>
    </div>
  );
};
