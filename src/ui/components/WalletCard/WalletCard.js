import "./WalletCard.less";
import React from "react";

import NumberFormat from "../NumberFormat/NumberFormat";
import PropTypes from "prop-types";

const WalletCard = props => {
  const { currency } = props;
  return (
    <div
      className="WalletCard"
      style={
        !props.skipColor
          ? { background: currency.background, color: currency.color }
          : null
      }
    >
      {props.title && <div className="WalletCard__title">{props.title}</div>}
      {!isNaN(props.balance) && (
        <div className="WalletCard__balance">
          <NumberFormat number={props.balance} currency={props.currency.abbr} />
        </div>
      )}
      {props.balanceUsd > 0 && (
        <div className="WalletCard__balanceUsd">
          <NumberFormat number={props.balanceUsd} currency={"usd"} />
        </div>
      )}
    </div>
  );
};

WalletCard.propTypes = {
  balance: PropTypes.number,
  balanceUsd: PropTypes.number,
  currency: PropTypes.object
};

export default WalletCard;
