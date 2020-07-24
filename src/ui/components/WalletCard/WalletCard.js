import "./WalletCard.less";
import React from "react";
import { classNames as cn } from "../../utils";
import NumberFormat from "../NumberFormat/NumberFormat";
import PropTypes from "prop-types";

const WalletCard = props => {
  const { currency } = props;
  return (
    <div className={cn("WalletCard", { reject: props.reject })}>
      {props.title && <div className="WalletCard__title">{props.title}</div>}
      {!isNaN(props.balance) && (
        <div className="WalletCard__balance">
          <NumberFormat
            symbol={props.symbol}
            currency={currency}
            number={props.balance}
          />
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
  currency: PropTypes.string
};

export default WalletCard;
