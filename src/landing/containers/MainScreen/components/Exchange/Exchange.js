import React from "react";
import "./Exchange.less";
import { useSelector } from "react-redux";
import { landingSelector } from "../../../../../selectors";
import { getCurrencyInfo } from "../../../../../actions";
import { Button, CircleIcon, NumberFormat } from "../../../../../ui";
import Chart from "../Chart/Chart";
import { formatDouble, joinComponents } from "../../../../../utils";
import * as actions from "../../../../../actions";
import * as pages from "../../../../../index/constants/pages";

export default () => {
  const { markets } = useSelector(landingSelector);

  return (
    <div className="Exchange LandingWrapper__block">
      <div className="LandingWrapper__content Exchange__content">
        <h2>Биржа для профессиональной торговли</h2>
        <p>
          Безопасная торговля криптовалютами  для начинающих и профессионалов
        </p>

        <table>
          <tr>
            <th>Название</th>
            <th>
              <span className="Exchange__desktopOnly">Последняя цена</span>
              <span className="Exchange__mobileOnly">Цена</span>
            </th>
            <th>
              <span className="Exchange__desktopOnly">Изменение за 24ч</span>
              <span className="Exchange__mobileOnly">24ч</span>
            </th>
            <th className="Exchange__chartColumn">Рынок</th>
          </tr>
          {markets
            .filter(
              m =>
                m.market.config.secondary_coin.name === "usdt" &&
                m.market.config.primary_coin.name !== "nrfx" // TODO: NRFX HACK
            )
            .map(({ market: { config }, chart, ticker }) => {
              const currency = getCurrencyInfo(config.primary_coin.name);

              return (
                <tr>
                  <td>
                    <div className="Exchange__currency">
                      <CircleIcon shadow={false} currency={currency} />
                      <div className="Exchange__currency__name">
                        <strong>{currency.abbr.toUpperCase()}</strong>
                        <span>{currency.name}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="Exchange__price">
                      {ticker.usd_price
                        .toFixed(2)
                        .toString()
                        .split(".")
                        .map((n, i) => (
                          <span>
                            {i === 1 ? "." : "$"}
                            {n}
                          </span>
                        ))
                        .reduce(joinComponents(""), null)}
                    </div>
                  </td>
                  <td>
                    <NumberFormat
                      symbol
                      color={ticker.percent > 0}
                      percent
                      indicator
                      number={ticker.percent}
                    />
                  </td>
                  <td className="Exchange__chartColumn">
                    <Chart currency={currency} chart={chart} />
                  </td>
                </tr>
              );
            })}
        </table>

        <Button
          onClick={() => {
            actions.openPage(pages.EXCHANGE);
          }}
          type="outline"
          size="extra_large"
        >
          Посмотреть больше ›
        </Button>
      </div>
    </div>
  );
};
