import React from "react";
import { useSelector } from "react-redux";
import * as UI from "../../../../../ui";
import * as utils from "../../../../../utils";
import { currencySelector } from "../../../../../selectors";
import Status from "../../../../../ui/components/Status/Status";

export default ({ operation }) => {
  const currency = useSelector(currencySelector(operation.currency));
  return (
    <div className="FiatOperationModal__content">
      <UI.WalletCard
        symbol={true}
        balance={operation.amount * -1}
        skipColor={true}
        currency={currency}
      />

      <div className="FiatOperationModal__row">
        <div className="FiatOperationModal__row__left">
          <div className="FiatOperationModal__label">
            {utils.getLang("global_status")}
          </div>
          <div className="FiatOperationModal__value">
            <Status status={operation.status} label={operation.status_label} />
          </div>
        </div>
        <div className="FiatOperationModal__row__right">
          <div className="FiatOperationModal__label">
            {utils.getLang("global_bank")}
          </div>
          <div className="FiatOperationModal__value">{operation.bank_code}</div>
        </div>
      </div>

      <div className="FiatOperationModal__row">
        <div className="FiatOperationModal__row__left">
          <div className="FiatOperationModal__label">
            {utils.getLang("cabinet_fiatWithdrawalModal__accountHolderName")}
          </div>
          <div className="FiatOperationModal__value">
            {operation.account_holder_name}
          </div>
        </div>
        <div className="FiatOperationModal__row__right">
          <div className="FiatOperationModal__label">
            {utils.getLang("cabinet_fiatWithdrawalModal__accountNumber")}
          </div>
          <div className="FiatOperationModal__value">
            <UI.NumberFormat
              number={operation.account_number}
              currency={currency.abbr}
            />
          </div>
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

        <div className="FiatOperationModal__row__right">
          <div className="FiatOperationModal__label">
            {utils.getLang("global_fee")}
          </div>
          <div className="FiatOperationModal__value">
            {operation.fee ? (
              <UI.NumberFormat
                number={operation.fee}
                currency={currency.abbr}
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
