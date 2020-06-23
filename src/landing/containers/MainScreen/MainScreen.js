import React from "react";
import Welcome from "./components/Welcome/Welcome";
import Promo from "./components/Promo/Promo";
import Swap from "./components/Swap/Swap";
import Exchange from "./components/Exchange/Exchange";
import Advantages from "./components/Advantages/Advantages";
import Application from "./components/Application/Application";

export default () => {
  return (
    <div>
      <Promo />
      <Swap />
      <Exchange />
      <Advantages />
      <Application />
      <Welcome />
    </div>
  );
};
