import "./WalletAddress.less";

import React from "react";
import PropTypes from "prop-types";
import SVG from "react-inlinesvg";
import { clipTextMiddle } from "../../../utils";

const WalletAddress = props => (
  <span className="WalletAddress">
    {props.isUser && <SVG src={require("src/asset/16px/user.svg")} />}
    {clipTextMiddle(props.address)}
  </span>
);

WalletAddress.propTypes = {
  address: PropTypes.node,
  user: PropTypes.bool
};

export default WalletAddress;
