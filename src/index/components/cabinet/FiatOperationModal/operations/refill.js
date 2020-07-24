import React from "react";
import * as UI from "../../../../../ui";
import * as utils from "../../../../../utils";

export default ({ operation }) => {
  return (
    <div className="FiatOperationModal__content">
      <UI.WalletCard
        symbol={true}
        balance={operation.amount}
        currency={operation.currency}
      />

      <div className="FiatOperationModal__row">
        <div className="FiatOperationModal__row__left">
          <div className="FiatOperationModal__label">
            {utils.getLang("global_date")}
          </div>
          <div className="FiatOperationModal__value">
            {utils.dateFormat(operation.created_at)}
          </div>
        </div>

        <div className="FiatOperationModal__row__right">
          <div className="FiatOperationModal__label">
            {utils.getLang("global_fee")}
          </div>
          <div className="FiatOperationModal__value">
            {operation.fee ? (
              <UI.NumberFormat
                number={operation.fee}
                currency={operation.currency}
              />
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>

      <div className="FiatOperationModal__row">
        <div className="FiatOperationModal__row__left">
          <div className="FiatOperationModal__label">
            {utils.getLang("global_bank")}
          </div>
          <div className="FiatOperationModal__value">{operation.bank_code}</div>
        </div>
      </div>
    </div>
  );
};
