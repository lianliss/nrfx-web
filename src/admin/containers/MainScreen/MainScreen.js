import "./MainScreen.less";
import React from "react";
import * as actions from "../../../actions/";
import Promo from "../../../landing/containers/MainScreen/components/Promo/Promo";
import * as steps from "../../../components/AuthModal/fixtures";

export default props => {
  return (
    <div className="MainScreen">
      <Promo
        title={"Narfex Control Panel"}
        description={"Amazing project management solution"}
        actionButtonText={"Start manage Narfex"}
        onClick={() => {
          actions.openModal("auth", { type: steps.LOGIN });
        }}
        image={require("src/landing/containers/MainScreen/components/Promo/assets/company.svg")}
      />
    </div>
  );
};
