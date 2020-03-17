import "./WalletAddress.less";

import React from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";

const WalletAddress = props => (
  <span className="WalletAddress">
    {props.isUser && <SVG src={require("src/asset/16px/user.svg")} />}
    {props.address}
  </span>
);

WalletAddress.propTypes = {
  address: PropTypes.string,
  user: PropTypes.bool
};

export default WalletAddress;
