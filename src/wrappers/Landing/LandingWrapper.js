import React from "react";
import "./LandingWrapper.less";
import Ticker from "../../landing/components/Ticker/Ticker";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Notice from "./components/Notice/Notice";

export default props => {
  return (
    <div className="LandingWrapper">
      <div className="LandingWrapper__block">
        <Ticker />
      </div>
      <Header />
      <div className="LandingWrapper__main">{props.children}</div>
      <Footer />
      <Notice />
    </div>
  );
};
