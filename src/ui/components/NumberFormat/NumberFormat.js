import "./NumberFormat.less";

import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../utils";

import { isFiat, noExponents } from "../../utils/index";
import bn from "big.js";

const NumberFormat = ({
  number,
  symbol,
  fractionDigits,
  color,
  skipTitle,
  accurate,
  currency,
  hiddenCurrency,
  prefix,
  type,
  percent,
  indicator,
  brackets,
  onClick
}) => {
  if (isNaN(parseFloat(number)) || Math.abs(number) === Infinity) return null;

  if (!fractionDigits) {
    if (percent) {
      fractionDigits = 2;
    } else {
      fractionDigits =
        isFiat(currency) || currency.toLowerCase() === "usdt" ? 2 : 8;
    }
    // TODO: Вынести количество символов после точки в объект валют
  }

  const coefficient = parseInt(1 + "0".repeat(fractionDigits));
  let displayNumber =
    Math.floor(
      bn(number)
        .mul(coefficient)
        .toExponential()
    ) / coefficient;

  displayNumber = displayNumber.toLocaleString(undefined, {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: accurate ? fractionDigits : undefined
  });

  if (currency && !percent) {
    displayNumber += " " + (!hiddenCurrency ? currency.toUpperCase() : ""); // nbsp
  }

  if (type === "auto") {
    type = number > 0 ? "up" : "down";
  }

  if (type === "auto") {
    type = number > 0 ? "up" : "down";
  }

  if (percent) {
    displayNumber = displayNumber + "%";
  }

  if (indicator && type) {
    displayNumber += " " + (type === "up" ? "↑" : "↓");
  }

  if (brackets) {
    displayNumber = `(${displayNumber})`;
  }

  if (number > 0 && number < 1e-8) {
    displayNumber = `~${displayNumber}`;
  }

  if (color) {
    type = number >= 0 ? "up" : "down";
  }

  if (symbol && number > 0) {
    displayNumber = "+" + displayNumber;
  }

  if (prefix) {
    displayNumber = prefix + displayNumber;
  }

  return (
    <span
      onClick={onClick}
      className={classNames("Number", {
        [type]: type
      })}
      title={!skipTitle && noExponents(number)}
    >
      {displayNumber}
    </span>
  );
};

NumberFormat.defaultProps = {
  fractionDigits: null,
  percent: false,
  indicator: false,
  brackets: false,
  color: false,
  currency: "",
  prefix: "",
  type: null,
  hiddenCurrency: false
};

NumberFormat.propTypes = {
  number: PropTypes.number,
  fractionDigits: PropTypes.number,
  skipTitle: PropTypes.bool,
  color: PropTypes.bool,
  percent: PropTypes.bool,
  prefix: PropTypes.string,
  indicator: PropTypes.bool,
  brackets: PropTypes.bool,
  accurate: PropTypes.bool,
  hiddenCurrency: PropTypes.bool,
  type: PropTypes.oneOf([null, "sell", "buy", "down", "up"]),
  currency: PropTypes.string
};

export default React.memo(NumberFormat);
