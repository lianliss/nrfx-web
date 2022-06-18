import React from "react";
import Chart from "../Chart/Chart";
import EmptyContentBlock from "../EmptyContentBlock/EmptyContentBlock";
import * as utils from "../../../../utils";
import "./ChartProfit.less";
import { getCurrencyInfo } from "../../../../actions";
import _ from 'lodash';

class ChartProfit extends React.Component {
  render() {
    if (!(Object.keys(this.props.chart.data).length > 0)) {
      return (
        <EmptyContentBlock
          icon={require("../../../../asset/120/trade.svg").default}
          message={utils.getLang("cabinet_placeholder_investmentsProfitCharts")}
        />
      );
    }

    const {rates} = this.props;
    const chartCurrencies = {};
    let usdTotal = 0;

    Object.keys(this.props.chart.data).forEach(currency => {
      if (!chartCurrencies.hasOwnProperty(currency)) {
        const currencyColor = getCurrencyInfo(currency).color;
        chartCurrencies[currency] = {
          data: [],
          showInLegend: true,
          name: currency.toUpperCase(),
          type: "spline",
          color: currencyColor,
          tooltip: {
            valueDecimals: 2
          },
          shadow: {
            color: currencyColor
          }
        };
      }
      this.props.chart.data[currency].forEach(item => {
        const usdAmount = item.amount * (rates[currency] || 0);
        usdTotal += usdAmount;
        chartCurrencies[currency]["data"].push({
          x: item.created_at * 1000,
          y: usdAmount,
          title: item.amount.toFixed(8) + " " + item.currency.toUpperCase()
        })
      });
    });

    let marker = false;
    //if (Object.keys(this.props.chart.data).length === 1) {
    if (
      this.props.chart.data[Object.keys(this.props.chart.data)[0]].length < 3
    ) {
      marker = true;
    }
    //}

    return (
      <div className="Content_box Chart__profit">
        <div className="Chart__profit__header">
          <div className="Chart__profit__header__cont">
            <h3>{utils.getLang("cabinet_investmentsProfit")}</h3>
            <div className="Chart__profit__header__period">
              30 {utils.getLang("global_days")}
            </div>
          </div>
          <div className="Chart__profit__header__fiat">
            $ {usdTotal.toFixed(2)}
          </div>
        </div>
        <div className="Chart__profit__chart">
          <Chart
            marker={marker}
            count={Object.keys(this.props.chart.data).length}
            series={Object.values(chartCurrencies)}
            adaptive={this.props.adaptive}
          />
        </div>
      </div>
    );
  }
}

export default ChartProfit;
