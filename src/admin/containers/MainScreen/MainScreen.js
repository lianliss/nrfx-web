import "./MainScreen.less";
import React from "react";
import * as UI from "../../../ui";
import * as actions from "../../../actions/";

export default props => {
  return (
    <div className="MainScreen">
      <div className="MainScreen__wrapper">
        <h1>Admin Panel</h1>
        <UI.Button size="large" onClick={() => actions.openModal("auth")}>
          Login
        </UI.Button>
      </div>
    </div>
  );
};
