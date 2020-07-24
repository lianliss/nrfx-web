import "./CommonHeader.less";

import React from "react";
import { ContentBox, NumberFormat } from "../../../../../../ui";
import PieChart from "react-minimal-pie-chart";
import { useSelector } from "react-redux";
import { walletBalancesSelector } from "../../../../../../selectors";
import { getCurrencyInfo } from "../../../../../../actions";

export default () => {
  const balances = useSelector(walletBalancesSelector);

  const total = balances
    .map(b => b.to_usd * b.amount)
    .reduce((a, b) => a + b, 0);

  return (
    <ContentBox className="CommonHeader">
      <div className="CommonHeader__content">
        <div className="CommonHeader__label">Баланс Кошелька</div>
        <div className="CommonHeader__amount">
          <NumberFormat roughly number={total} currency="usd" />
        </div>
        <ul className="CommonHeader__currencyList">
          {balances.map(b => (
            <li key={b.id}>
              <div
                className="CommonHeader__currencyList__coin"
                style={{
                  background: getCurrencyInfo(b.currency).background
                }}
              />
              <div className="CommonHeader__currencyList__percent">
                <NumberFormat
                  number={((b.amount * b.to_usd) / total) * 100}
                  percent
                />
              </div>
              <div className="CommonHeader__currencyList__currency">
                {b.currency}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="CommonHeader__pie">
        <PieChart
          lineWidth={50}
          paddingAngle={1}
          data={balances.map(b => {
            const currency = getCurrencyInfo(b.currency);
            return {
              color: currency.color,
              currency: currency.abbr,
              value: b.to_usd * b.amount
            };
          })}
        />
      </div>
    </ContentBox>
  );
};
