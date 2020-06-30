import React from "react";
import "./Steps.less";
import Lang from "../../../../../components/Lang/Lang";
import * as actions from "../../../../../actions";
import * as steps from "../../../../../components/AuthModal/fixtures";

export default () => {
  const handleCreateAccount = () => {
    actions.openModal("auth", { type: steps.REGISTRATION });
  };

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
              style={{ backgroundImage: `url(${require("./assets/1.svg")})` }}
            />
            <div className="Steps__step">
              <h4 data-number={1}>
                <Lang name="landingBitcoin_step_createAccount_title" />
              </h4>
              <p>
                <Lang name="landingBitcoin_step_createAccount_description" />
              </p>
              <div onClick={handleCreateAccount} className="Steps__step__link">
                <Lang name="landingBitcoin_step_actionButton_createAccount" /> ›
              </div>
            </div>
          </li>
          <li>
            <div
              className="Steps__image"
              style={{ backgroundImage: `url(${require("./assets/2.svg")})` }}
            />
            <div className="Steps__step">
              <h4 data-number={2}>
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
              style={{ backgroundImage: `url(${require("./assets/3.svg")})` }}
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
