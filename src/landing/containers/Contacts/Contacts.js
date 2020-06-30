import React from "react";
import Main from "./components/Main/Main";
import Social from "./components/Social/Social";
import Welcome from "../MainScreen/components/Welcome/Welcome";

export default () => {
  return (
    <div>
      <Main />
      <Social accent />
      <Welcome />
    </div>
  );
};
