import React from "react";
import * as UI from "../../../../../ui";
import * as utils from "../../../../../utils";
import { getCurrencyInfo } from "../../../../../actions";

export default ({ operation }) => {
  const [primaryCurrency, secondaryCurrency] = [
    operation.primary_currency,
    operation.secondary_currency
  ].map(getCurrencyInfo);

  const [primaryPrice, secondaryPrice] = [operation.price, 1 / operation.price][
    utils.isFiat(operation.primary_currency) ? "slice" : "reverse"
  ]();

  return (
    <div className="FiatOperationModal__content">
      <div className="FiatOperationModal__content">
        <div className="FiatOperationModal__row">
          <div className="FiatOperationModal__row__left">
            <div className="FiatOperationModal__price">
              <UI.NumberFormat
                number={-operation.primary_amount}
                symbol
                currency={primaryCurrency.abbr}
              />
            </div>
            <div className="FiatOperationModal__label">
              {utils.getLang("cabinet_fiatWalletGave")} {primaryCurrency.name}
            </div>
          </div>
          <div className="FiatOperationModal__row__right">
            <div className="FiatOperationModal__price">
              <UI.NumberFormat
                symbol
                number={operation.secondary_amount}
                type="auto"
                skipColor={operation.secondary_amount < 0}
                currency={secondaryCurrency.abbr}
              />
            </div>
            <div className="FiatOperationModal__label">
              {utils.getLang("cabinet_fiatWalletGot")} {secondaryCurrency.name}
            </div>
          </div>
        </div>
        <div className="FiatOperationModal__row">
          <div className="FiatOperationModal__row__left FiatOperationModal__value">
            {utils.getLang("global_price")}:{" "}
            <UI.NumberFormat
              number={primaryPrice}
              currency={primaryCurrency.abbr}
            />
          </div>
          <div className="FiatOperationModal__row__right FiatOperationModal__value">
            {utils.getLang("global_price")}:{" "}
            <UI.NumberFormat
              number={secondaryPrice}
              currency={secondaryCurrency.abbr}
            />
          </div>
        </div>
        <div className="FiatOperationModal__row">
          <div className="FiatOperationModal__row__left">
            <div className="FiatOperationModal__label">
              {utils.getLang("global_date")}
            </div>
            <div className="FiatOperationModal__value">
              {utils.dateFormat(operation.created_at)}
            </div>
          </div>
          <div className="FiatOperationModal__row__right"></div>
        </div>
      </div>
    </div>
  );
};
