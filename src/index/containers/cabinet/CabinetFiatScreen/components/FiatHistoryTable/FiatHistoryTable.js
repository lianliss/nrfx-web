import "./FiatHistoryTable.less";

import React from "react";
import { connect } from "react-redux";
import moment from "moment";

import * as UI from "../../../../../../ui";
import * as utils from "../../../../../../utils";
import { getCurrencyInfo } from "../../../../../../actions";
import { openModal } from "../../../../../../actions";
import Status from "src/ui/components/Status/Status";
import EmptyContentBlock from "../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock";

const FiatHistoryTable = props => {
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
    fiat_exchange: require("src/asset/24px/loop.svg"),
    crypto_exchange: require("src/asset/24px/loop.svg"),
    income: require("src/asset/24px/fiat-plus.svg"),
    withdrawal: require("src/asset/24px/withdraw.svg"),
    buy_token: require("src/asset/24px/shopping-cart.svg")
  };

  const renderExchangeItem = item => {
    const [primaryCurrency, secondaryCurrency] = [
      item.primary_currency,
      item.secondary_currency
    ].map(getCurrencyInfo);
    return (
      <>
        <UI.CircleIcon icon={item.icon} />
        <div className="FiatHistoryTable__group__item__body">
          <div className="FiatHistoryTable__group__item__left">
            <div className="FiatHistoryTable__label">{item.type_label}</div>
            <div className="FiatHistoryTable__price">
              <UI.NumberFormat
                symbol
                number={-item.primary_amount}
                currency={primaryCurrency.abbr}
              />
            </div>
            <div className="FiatHistoryTable__description">
              {utils.getLang("cabinet_fiatWalletGave")} {primaryCurrency.name}
            </div>
          </div>
          <div className="FiatHistoryTable__group__item__right">
            <div className="FiatHistoryTable__price">
              <UI.NumberFormat
                type="auto"
                symbol
                number={item.secondary_amount}
                currency={secondaryCurrency.abbr}
              />
            </div>
            <div className="FiatHistoryTable__description">
              {utils.getLang("cabinet_fiatWalletGot")} {secondaryCurrency.name}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderIncomeItem = item => {
    const primaryCurrency = getCurrencyInfo(item.primary_currency);

    return (
      <>
        <UI.CircleIcon icon={item.icon} />
        <div className="FiatHistoryTable__group__item__body">
          <div className="FiatHistoryTable__group__item__left">
            <div className="FiatHistoryTable__label">{item.type_label}</div>
            <div className="FiatHistoryTable__description" />
          </div>
          <div className="FiatHistoryTable__group__item__right">
            <div className="FiatHistoryTable__price">
              <UI.NumberFormat
                symbol
                type="auto"
                number={item.primary_amount}
                currency={primaryCurrency.abbr}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderWithdrawalItem = item => {
    const primaryCurrency = getCurrencyInfo(item.primary_currency);

    return (
      <>
        <UI.CircleIcon icon={item.icon} />
        <div className="FiatHistoryTable__group__item__body">
          <div className="FiatHistoryTable__group__item__left">
            <div className="FiatHistoryTable__label">{item.type_label}</div>
            <div className="FiatHistoryTable__description">
              {item.extra.bank_code}
            </div>
            <div className="FiatHistoryTable__description">
              <Status status={item.status} label={item.status_label} />
            </div>
          </div>
          <div className="FiatHistoryTable__group__item__right">
            <div className="FiatHistoryTable__price">
              <UI.NumberFormat
                symbol
                number={-item.primary_amount}
                type={item.status === "failed" ? "down" : null}
                currency={primaryCurrency.abbr}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  if (!props.history.length) {
    return (
      <EmptyContentBlock
        icon={require("src/asset/120/clock.svg")}
        message={utils.getLang("cabinet_noFiatHistory")}
      />
    );
  }

  return (
    <UI.ContentBox className="FiatHistoryTable">
      <div className="FiatHistoryTable__header">
        <span>{utils.getLang("global_operations")}</span>
      </div>
      {Object.keys(transactions).map(key => (
        <div className="FiatHistoryTable__group">
          <div className="FiatHistoryTable__group__title">
            {utils.ucfirst(key)}
          </div>
          {transactions[key].map(item => {
            item.icon = icons[item.type];

            const renderItem = item => {
              switch (item.type) {
                case "withdrawal":
                  return renderWithdrawalItem(item);
                case "income":
                  return renderIncomeItem(item);
                // case 'crypto_exchange':
                // case 'fiat_exchange':
                default:
                  return renderExchangeItem(item);
              }
            };

            return (
              <div
                key={item.id}
                onClick={() =>
                  openModal("fiat_operation", null, {
                    operation: item,
                    icon: item.icon
                  })
                }
                className="FiatHistoryTable__group__item"
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
    history: stage.fiat.history,
    translator: stage.settings.translator,
    currentLang: stage.default.currentLang
  }),
  undefined
)(FiatHistoryTable);
