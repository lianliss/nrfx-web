import React from 'react';
import * as currencies from "../../../../utils/currencies";
import Chart from '../../../../components/cabinet/Chart/Chart';

class ChartProfit extends React.Component {
  render() {
    const chartCurrencies = {};
    Object.keys(this.props.chart.data).map(currency => {
      if (!chartCurrencies.hasOwnProperty(currency)) {
        const currencyColor = currencies.getColorByCurrency(currency);
        chartCurrencies[currency] = {
          data: [],
          name: currency.toUpperCase(),
          type: 'spline',
          color: currencyColor,
          tooltip: {
            valueDecimals: 2
          },
          shadow: {
            color: currencyColor,
          }
        }
      }
      this.props.chart.data[currency].map(item => {
        chartCurrencies[currency]['data'].push({
          x: new Date(item.created_at).getTime(),
          y: item.usd_amount,
          title: item.amount.toFixed(8) + ' ' + item.currency.toUpperCase()
        });
      });
    });

    return (
      <div className="Content_box Investment__profit">
        <div className="Investment__profit__header">
          <div className="Investment__profit__header__cont">
            <h3>Profit</h3>
            <div className="Investment__profit__header__period">30 Days</div>
          </div>
          <div className="Investment__profit__header__fiat">{this.props.chart.usd_profit.toFixed(2) + ' $'}</div>
        </div>
        <div className="Investment__profit__chart">
          <Chart series={Object.values(chartCurrencies)} />
        </div>
      </div>
    )
  }
}

export default ChartProfit;