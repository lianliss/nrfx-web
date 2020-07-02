import React from "react";
import "./Welcome.less";
import { Button } from "../../../../../ui";
import * as actions from "../../../../../actions";
import * as steps from "../../../../../components/AuthModal/fixtures";
import Lang from "../../../../../components/Lang/Lang";

export default ({ titleLang, actionButtonLang }) => {
  return (
    <div className="LandingWrapper__block WelcomeBlock">
      <div className="LandingWrapper__content WelcomeBlock__content">
        <h3>
          <Lang name={titleLang || "landing_welcome_title"} />
        </h3>
        <Button
          onClick={() => {
            actions.openModal("auth", { type: steps.REGISTRATION });
          }}
          size="extra_large"
          type="outline"
        >
          <Lang name={actionButtonLang || "landing_welcome_actionButton"} />
        </Button>
      </div>
    </div>
  );
};
