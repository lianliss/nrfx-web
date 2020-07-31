import React from "react";
import * as UI from "../../../../../ui";
import * as utils from "../../../../../utils";
import Lang from "../../../../../components/Lang/Lang";
import { NumberFormat } from "../../../../../ui";

export default ({ operation }) => {
  return (
    <div className="FiatOperationModal__content">
      <UI.WalletCard
        symbol={true}
        balance={-operation.amount}
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
            {utils.getLang("global_status")}
          </div>
          <div className="FiatOperationModal__value">
            <UI.Status
              status={operation.status}
              label={<Lang name={`status_${operation.status}`} />}
            />
          </div>
        </div>
      </div>

      <div className="FiatOperationModal__row">
        <div className="FiatOperationModal__row__left">
          <div className="FiatOperationModal__label">
            <Lang name="global_txid" />
          </div>
          <div
            style={{
              maxWidth: "70%",
              wordBreak: "break-all"
            }}
            className="FiatOperationModal__value"
          >
            {operation.txid}
          </div>
        </div>

        <div className="FiatOperationModal__row__right">
          <div className="FiatOperationModal__label">
            <Lang name="global_fee" />
          </div>
          <div className="FiatOperationModal__value">
            <NumberFormat
              number={operation.fee}
              currency={operation.currency}
            />
          </div>
        </div>
      </div>

      <div className="FiatOperationModal__row">
        <div className="FiatOperationModal__row__left">
          <div className="FiatOperationModal__label">
            {utils.getLang("global_from")}
          </div>
          <div className="FiatOperationModal__value">{operation.address}</div>
        </div>

        <div className="FiatOperationModal__row__right">
          <div className="FiatOperationModal__label">
            <Lang name="global_confirmations" />
          </div>
          <div className="FiatOperationModal__value">
            {operation.confirmations}/{operation.required_confirmations}
          </div>
        </div>
      </div>
    </div>
  );
};
