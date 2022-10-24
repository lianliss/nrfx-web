import "./BankLogo.less";

import React from "react";
import SVG from "utils/svg-wrap";
import PropTypes from "prop-types";
import { classNames as cn } from "../../utils";

const BankLogo = props => {
  const logos = {
    bni: require("src/asset/banks/bni.svg"),
    bri: require("src/asset/banks/BRI.svg"),
    mandiri: require("src/asset/banks/mandiri.svg"),
    permata: require("src/asset/banks/permata.svg"),
    tinkoff: require("src/asset/banks/tinkoff.svg"),
    gazprombank: require("src/asset/banks/gazprombank.svg"),
    vostokbank: require("src/asset/banks/vostokbank.svg"),
    privatbank: require("src/asset/banks/privatbank.svg"),
    monobank: require("src/asset/banks/monobank.svg"),
  };

  const name = props.name.toLocaleLowerCase();
  const logo = logos[name];

  return (
    <div title={name} className={cn("BankLogo", props.className)}>
      {logo ? (
        <SVG src={logo} />
      ) : (
        <small className="BankLogo__placeholder">{props.name}</small>
      )}
    </div>
  );
};

BankLogo.propTypes = {
  name: PropTypes.string
};

export default BankLogo;
