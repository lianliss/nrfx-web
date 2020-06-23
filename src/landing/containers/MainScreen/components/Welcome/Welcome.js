import React from "react";
import "./Welcome.less";
import { Button } from "../../../../../ui";
import * as actions from "../../../../../actions";
import * as steps from "../../../../../components/AuthModal/fixtures";

export default () => {
  return (
    <div className="LandingWrapper__block WelcomeBlock">
      <div className="LandingWrapper__content WelcomeBlock__content">
        <h3>Добро пожаловать в Narfex</h3>
        <Button
          onClick={() => {
            actions.openModal("auth", { type: steps.REGISTRATION });
          }}
          size="extra_large"
          type="outline"
        >
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};
