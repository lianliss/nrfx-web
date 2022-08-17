import React from "react";
import "./Steps.less";
import Lang from "../../../../../components/Lang/Lang";
import * as actions from "../../../../../actions/landing/buttons";

export default () => {
  return (
    <div className="LandingWrapper__block Steps">
      <div className="LandingWrapper__content Steps__content">
        <h2>
          <Lang name="landingBitcoin_steps_title" />
        </h2>
        <ul>
          <li>
            <div
              className="Steps__image"
              style={{ backgroundImage: `url(${require("./assets/2.svg").default})` }}
            />
            <div className="Steps__step">
              <h4 data-number={1}>
                <Lang name="landingBitcoin_step_topUpBalance_title" />
              </h4>
              <p>
                <Lang name="landingBitcoin_step_topUpBalance_description" />
              </p>
            </div>
          </li>
          <li>
            <div
              className="Steps__image"
              style={{ backgroundImage: `url(${require("./assets/3.svg").default})` }}
            />
            <div className="Steps__step">
              <h4 data-number={2}>
                <Lang name="landingBitcoin_step_buyBitcoin_title" />
              </h4>
              <p>
                <Lang name="landingBitcoin_step_buyBitcoin_description" />
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
