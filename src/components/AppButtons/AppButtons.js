import React from "react";
import SVG from "utils/svg-wrap";
import company from "src/index/constants/company";
import { classNames as cn } from "../../utils";
import "./AppButton.less";
import Lang from "../Lang/Lang";

export default ({ className }) => {
  return (
    <div className={cn("AppButtons", className)}>
      <div
        rel="noopener noreferrer"
        className="AppButtons__button disabled"
      >
        <i>
          <Lang name="global_comingSoon" />
        </i>
        <SVG src={require("src/asset/app_markets/google_play.svg")} />
      </div>
      <div className="AppButtons__button disabled">
        <i>
          <Lang name="global_comingSoon" />
        </i>
        <SVG src={require("src/asset/app_markets/app__store.svg")} />
      </div>
    </div>
  );
};
