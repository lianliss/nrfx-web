import "./FiatOperationModal.less";

import React from "react";

import Modal from "../../../../ui/components/Modal/Modal";
import * as UI from "../../../../ui";
import * as utils from "src/utils/index";
import { getCurrencyInfo } from "../../../../actions";
import Status from "src/ui/components/Status/Status";

//
// function FiatOperationModal(props) {
//   const { operation } = props;
//   return (
//     <Modal className="FiatOperationModal" isOpen={true} onClose={props.onBack}>
//       <UI.ModalHeader>
//         {getLang('cabinet_fiatWalletOperationModalTitle')}
//       </UI.ModalHeader>
//       <div>
//         {typeof operation === "object" ? (
//           <UI.List items={[
//             { label: getLang('global_date'), value: dateFormat(operation.created_at) },
//             { label: getLang('global_type'), value: <div className={cn('FiatOperationModal__status', operation.type)} >{operation.type_label}</div> },
//             { label: getLang('global_amount'), value: <UI.NumberFormat number={operation.primary_amount} currency={operation.primary_currency} /> },
//             { label: getLang('global_price'), value: <UI.NumberFormat number={operation.price} currency={operation.secondary_currency} /> },
//           ]} />
//         ) : (
//           <EmptyContentBlock
//             skipContentClass
//             icon={require('../../../../asset/120/buy_currency.svg')}
//             message={getLang("cabinet_merchantEmptyList")}
//           />
//         )}
//       </div>
//     </Modal>
//   )
// }

function FiatOperationModal(props) {
  const { operation } = props;

  if (!operation) {
    props.onClose();
    return null;
  }

  const [primaryCurrency, secondaryCurrency] = [
    operation.primary_currency,
    operation.secondary_currency
  ].map(getCurrencyInfo);

  const [primaryPrice, secondaryPrice] = [operation.price, 1 / operation.price][
    operation.type === "crypto_exchange" ? "reverse" : "slice"
  ]();

  const balance =
    operation.primary_amount * (operation.type === "withdrawal" ? -1 : 1);

  return (
    <Modal className="FiatOperationModal" isOpen={true} onClose={props.onClose}>
      <UI.ModalHeader>{operation.type_label}</UI.ModalHeader>
      {/*<pre>{JSON.stringify(props, null, 2)}</pre>*/}
      {["income", "withdrawal"].includes(operation.type) ? (
        <div className="FiatOperationModal__content">
          <UI.WalletCard
            symbol={true}
            balance={balance}
            skipColor={balance < 0}
            currency={primaryCurrency}
          />

          {operation.type === "withdrawal" && (
            <>
              <div className="FiatOperationModal__row">
                <div className="FiatOperationModal__row__left">
                  <div className="FiatOperationModal__label">
                    {utils.getLang("global_status")}
                  </div>
                  <div>
                    <Status
                      status={operation.status}
                      label={operation.status_label}
                    />
                  </div>
                </div>
                <div className="FiatOperationModal__row__right">
                  <div className="FiatOperationModal__label">
                    {utils.getLang("global_bank")}
                  </div>
                  <div>
                    {utils.getLang("global_bank")}: {operation.extra.bank_code}
                  </div>
                </div>
              </div>

              <div className="FiatOperationModal__row">
                <div className="FiatOperationModal__row__left">
                  <div className="FiatOperationModal__label">
                    {utils.getLang(
                      "cabinet_fiatWithdrawalModal__accountHolderName"
                    )}
                  </div>
                  <div>{operation.extra.account_holder_name}</div>
                </div>
                <div className="FiatOperationModal__row__right">
                  <div className="FiatOperationModal__label">
                    {utils.getLang(
                      "cabinet_fiatWithdrawalModal__accountNumber"
                    )}
                  </div>
                  <div>{operation.extra.account_number}</div>
                </div>
              </div>
            </>
          )}

          <div className="FiatOperationModal__row">
            <div className="FiatOperationModal__row__left">
              <div className="FiatOperationModal__label">
                {utils.getLang("global_date")}
              </div>
              <div>{utils.dateFormat(operation.created_at)}</div>
            </div>
            {/*<div className="FiatOperationModal__row__right">*/}
            {/*  <div className="FiatOperationModal__label">{utils.getLang('global_fee')}</div>*/}
            {/*  <div><UI.NumberFormat number={1} currency={secondaryCurrency.abbr} /></div>*/}
            {/*</div>*/}
          </div>
        </div>
      ) : (
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
                {utils.getLang("cabinet_fiatWalletGot")}{" "}
                {secondaryCurrency.name}
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
            <div className="FiatOperationModal__row__right">
              {/*<div className="FiatOperationModal__label">{utils.getLang('global_fee')}</div>*/}
              {/*<div><UI.NumberFormat number={1} currency={secondaryCurrency.abbr} /></div>*/}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default FiatOperationModal;
