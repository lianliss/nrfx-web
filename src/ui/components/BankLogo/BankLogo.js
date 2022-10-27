import "./BankLogo.less";

import React from "react";
import SVG from "utils/svg-wrap";
import PropTypes from "prop-types";
import { classNames as cn } from "../../utils";

const BankLogo = props => {
  const logos = {
    alfabank: require("src/asset/banks/alfabank.svg"),
    bni: require("src/asset/banks/bni.svg"),
    bri: require("src/asset/banks/bri.svg"),
    bankvtb: require("src/asset/banks/bankvtb.svg"),
    bnc: require("src/asset/banks/bnc.svg"),
    btpn: require("src/asset/banks/btpn.svg"),
    cimbniaga: require("src/asset/banks/cimbniaga.svg"),
    dki: require("src/asset/banks/dki.svg"),
    gazprombank: require("src/asset/banks/gazprombank.svg"),
    jenius: require("src/asset/banks/jenius.svg"),
    tinkoff: require("src/asset/banks/tinkoff.svg"),
    vostokbank: require("src/asset/banks/vostokbank.svg"),
    mandiri: require("src/asset/banks/mandiri.svg"),
    maybank: require("src/asset/banks/maybank.svg"),
    monobank: require("src/asset/banks/monobank.svg"),
    mtsbank: require("src/asset/banks/mtsbank.svg"),
    ocbcnisp: require("src/asset/banks/ocbcnisp.svg"),
    permata: require("src/asset/banks/permata.svg"),
    paninbank: require("src/asset/banks/paninbank.svg"),
    pochtabank: require("src/asset/banks/pochtabank.svg"),
    privatbank: require("src/asset/banks/privatbank.svg"),
    raiffaizen: require("src/asset/banks/raiffaizen.svg"),
    swift: require("src/asset/banks/swift.svg"),
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
