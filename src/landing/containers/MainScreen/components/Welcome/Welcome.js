import React from "react";
import "./Welcome.less";
import { Button } from "../../../../../ui";
import * as actions from "../../../../../actions/landing/buttons";
import Lang from "../../../../../components/Lang/Lang";

export default ({ titleLang, actionButtonLang, action }) => {
  const handleClickAction = () => {
    if (action) {
      action();
      return;
    }

    actions.singUp();
  }
  
  return (
    <div className="LandingWrapper__block WelcomeBlock">
      <div className="LandingWrapper__content WelcomeBlock__content">
        <h3>
          <Lang name={titleLang || "landing_welcome_title"} />
        </h3>
        <Button
          onClick={handleClickAction}
          size="extra_large"
          type="secondary"
        >
          <Lang name={actionButtonLang || "landing_welcome_actionButton"} />
        </Button>
      </div>
    </div>
  );
};
