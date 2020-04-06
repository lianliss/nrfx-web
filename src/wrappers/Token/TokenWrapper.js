import "./TokenWrapper.less";
import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export default props => {
  return (
    <div className="TokenWrapper">
      <Header />
      <div className="TokenWrapper__main">{props.children}</div>
      <Footer />
    </div>
  );
};
