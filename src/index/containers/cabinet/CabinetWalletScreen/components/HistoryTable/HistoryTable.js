import "./HistoryTable.less";

import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import * as UI from "../../../../../../ui";
import * as utils from "../../../../../../utils";
import { getCurrencyInfo } from "../../../../../../actions";
import { openModal } from "../../../../../../actions";
import Status from "src/ui/components/Status/Status";
import EmptyContentBlock from "../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock";
import LoadingStatus from "../../../../../components/cabinet/LoadingStatus/LoadingStatus";

const HistoryTable = props => {
  const transactions = props.history
    .map(t => ({
      ...t,
      group: moment(t.created_at * 1000).fromNow()
    }))
    .reduce((r, a) => {
      r[a.group] = [...(r[a.group] || []), a];
      return r;
    }, {});

  const icons = {
    transfer_receive: require("src/asset/24px/receive.svg"),
    transfer_send: require("src/asset/24px/send.svg"),
    swap: require("src/asset/24px/loop.svg"),
    refill: require("src/asset/24px/fiat-plus.svg"),
    bank_card_refill_reject: require("src/asset/24px/fiat-plus.svg"),
    withdrawal: require("src/asset/24px/withdraw.svg"),
    buy_token: require("src/asset/24px/shopping-cart.svg")
  };

  const renderSwapItem = item => {
    const [primaryCurrency, secondaryCurrency] = [
      item.primary_currency,
      item.secondary_currency
    ].map(getCurrencyInfo);
    return (
      <>
        <UI.CircleIcon icon={item.icon} />
        <div className="HistoryTable__group__item__body">
          <div className="HistoryTable__group__item__left">
            <div className="HistoryTable__description">
              {utils.getLang("cabinet__historyItemTitle_swap")}
            </div>
            <div className="HistoryTable__price">
              <UI.NumberFormat
                symbol
                number={-item.primary_amount}
                currency={primaryCurrency.abbr}
              />
            </div>
            <div className="HistoryTable__description">
              {utils.getLang("cabinet_fiatWalletGave")} {primaryCurrency.name}
            </div>
          </div>
          <div className="HistoryTable__group__item__right">
            <div className="HistoryTable__price">
              <UI.NumberFormat
                type="auto"
                symbol
                number={item.secondary_amount}
                currency={secondaryCurrency.abbr}
              />
            </div>
            <div className="HistoryTable__description">
              {utils.getLang("cabinet_fiatWalletGot")} {secondaryCurrency.name}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderIncomeItem = item => {
    const currency = getCurrencyInfo(item.currency);

    return (
      <>
        <UI.CircleIcon icon={item.icon} />
        <div className="HistoryTable__group__item__body">
          <div className="HistoryTable__group__item__left">
            <div className="FiatHistoryTable__label">
              {utils.getLang("cabinet__historyItemTitle_refill")}
            </div>
            <div className="HistoryTable__label">{item.type_label}</div>
            <div className="HistoryTable__description">
              {item.type === "bank_card_refill_reject" && (
                <Status status="cancelled" label={item.status_label} />
              )}
            </div>
          </div>
          <div className="HistoryTable__group__item__right">
            <div className="HistoryTable__price">
              <UI.NumberFormat
                symbol
                type={item.type === "bank_card_refill_reject" ? "down" : "auto"}
                number={item.amount}
                currency={currency.abbr}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderWithdrawalItem = item => {
    const currency = getCurrencyInfo(item.currency);

    return (
      <>
        <UI.CircleIcon icon={item.icon} />
        <div className="HistoryTable__group__item__body">
          <div className="HistoryTable__group__item__left">
            <div className="HistoryTable__label">
              {utils.getLang("cabinet__historyItemTitle_withdrawal")}
            </div>
            <div className="HistoryTable__description">{item.bank_code}</div>
            <div className="HistoryTable__description">
              <Status status={item.status} label={item.status_label} />
            </div>
          </div>
          <div className="HistoryTable__group__item__right">
            <div className="HistoryTable__price">
              <UI.NumberFormat
                symbol
                number={-item.amount}
                type={item.status === "failed" ? "down" : null}
                currency={currency.abbr}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderTransferReceiveItem = item => {
    const currency = getCurrencyInfo(item.currency);

    return (
      <>
        <UI.CircleIcon color="primary-blue" icon={item.icon} />
        <div className="HistoryTable__group__item__body">
          <div className="HistoryTable__group__item__left">
            <div className="HistoryTable__description">
              {utils.getLang("cabinet__historyItemTitle_transfer_receive")}
            </div>
            <div className="HistoryTable__label">
              <UI.WalletAddress address={item.address} />
            </div>
          </div>
          <div className="HistoryTable__group__item__right">
            <div className="HistoryTable__price">
              <UI.NumberFormat
                symbol
                number={item.amount}
                color
                currency={currency.abbr}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderTransferSendItem = item => {
    const currency = getCurrencyInfo(item.currency);

    return (
      <>
        <UI.CircleIcon color="green" icon={item.icon} />
        <div className="HistoryTable__group__item__body">
          <div className="HistoryTable__group__item__left">
            <div className="HistoryTable__description">
              {utils.getLang("cabinet__historyItemTitle_transfer_send")}
            </div>
            <div className="HistoryTable__label">
              <UI.WalletAddress address={item.address} />
            </div>
          </div>
          <div className="HistoryTable__group__item__right">
            <div className="HistoryTable__price">
              <UI.NumberFormat
                symbol
                number={-item.amount}
                currency={currency.abbr}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderOtherItem = item => {
    return (
      <UI.Message type="error">type "{item.type}" is not supported</UI.Message>
    );
  };

  if (props.status) {
    return (
      <UI.ContentBox className="HistoryTable">
        <LoadingStatus status={props.status} />
      </UI.ContentBox>
    );
  }

  if (!props.history.length) {
    return (
      <EmptyContentBlock
        icon={require("src/asset/120/clock.svg")}
        message={utils.getLang("cabinet_noFiatHistory")}
      />
    );
  }

  return (
    <UI.ContentBox className="HistoryTable">
      <div className="HistoryTable__header">
        <span>{utils.getLang("global_operations")}</span>
      </div>
      {Object.keys(transactions).map(key => (
        <div key={key} className="HistoryTable__group">
          <div className="HistoryTable__group__title">{utils.ucfirst(key)}</div>
          {transactions[key].map(item => {
            item.icon = icons[item.type];

            const renderItem = item => {
              switch (item.type) {
                case "withdrawal":
                  return renderWithdrawalItem(item);
                case "income":
                case "refill":
                case "bank_card_refill_reject":
                  return renderIncomeItem(item);
                // case 'crypto_exchange':
                case "swap":
                  return renderSwapItem(item);
                case "transfer_receive":
                  return renderTransferReceiveItem(item);
                case "transfer_send":
                  return renderTransferSendItem(item);
                default:
                  return renderOtherItem(item);
              }
            };

            return (
              <div
                key={item.type + item.id}
                onClick={() =>
                  openModal("fiat_operation", null, {
                    operation: item,
                    icon: item.icon
                  })
                }
                className="HistoryTable__group__item"
              >
                {renderItem(item)}
              </div>
            );
          })}
        </div>
      ))}
    </UI.ContentBox>
  );
};

export default connect(
  stage => ({
    history: stage.wallet.history.items,
    translator: stage.settings.translator,
    currentLang: stage.default.currentLang
  }),
  undefined
)(HistoryTable);
