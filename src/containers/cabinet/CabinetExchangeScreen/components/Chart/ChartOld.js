import './Chart.less';

import React, { memo } from 'react';
import { connect } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import * as utils from '../../../../../utils';
import moment from 'moment/min/moment-with-locales';

//require("highcharts/modules/map")(Highcharts);

class Chart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: props.chartTimeFrame,
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    if (this.props.chart.length === 0) {
      return null;
    }

    const [primary, secondary] = this.props.market.split('/');

    let colors = [];
    let data = [];
    let volume = [];
    for (let i = 0; i < this.props.chart.length; i++) {
      const item = this.props.chart[i];
      const ts = parseInt(item.date) * 1000;
      if (item.empty) {
        data.push([ts, null, null, null, null]);
      } else {
        data.push([ts, item.open, item.high, item.low, item.close]);
      }
      volume.push([ts, item.volume]);
      colors.push(item.close > item.open ? 'var(--primary-green)' : 'var(--primary-red)');
    }

    const groupingUnits = [
      // ['minute', [1, 5, 15]],
      // ['week', [1]],
      // ['month', [1, 2, 3, 4, 6]]
    ];

    const options = {
      chart: {
        backgroundColor: '#fff',
        borderColor: 'transparent',
        marginTop: 0,
        marginRight: 88,
        spacingTop: 0,
        marginLeft: 0,
        spacingLeft: 0,
        marginBottom: 0,
        spacingBottom: 0,
        spacingRight: 0,
        height: 370,
        panning: true,
        zoomType: 'x',
        animation: false,
      },
      mapNavigation: {
        enableMouseWheelZoom: true
      },
      title: {
        text: undefined,
      },
      subtitle: {
        text: undefined,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      yAxis: [
        {
          lineColor: '#EAEAEA',
          tickPosition: 'inside',
          tickAmount: 6,
          labels: {
            align: 'left',
            formatter: function (number) {
              return parseFloat(number.pos).toFixed(utils.isFiat(secondary) ? 2 : 6);
            }
          },
          top: -20,
          height: 304,
          lineWidth: 0,
          title: false,
          opposite: true,
          subtitle: false,
          gridLineColor: '#F5F1EE',
          gridLineWidth: 1,
        },
        {
          lineColor: '#EAEAEA',
          tickPosition: 'inside',
          tickAmount: 12,
          labels: {
            align: 'left',
          },
          height: 60,
          top: 304 - 20,
          lineWidth: 0,
          title: false,
          opposite: true,
          subtitle: false,
          gridLineWidth: 0,
        }
      ],
      xAxis: {
        tickColor: 'rgba(225, 130, 65, 1)',
        minRange: 10 * ( this.state.time * 60 ) * 1000,
        maxRange: 200 * ( this.state.time * 60 ) * 1000,
        range: 60 * ( this.state.time * 60 ) * 1000,
        lineColor: 'rgba(225, 130, 65, 1)',
        lineWidth: 0,
        gridLineWidth: 0,
        labels: {
          distance: 0,
          padding: 0,
          style: {
            fontSize: '11px',
            fontWeight: 500,
            opacity: 0.7,
            lineHeight: '16px',
            color: 'var(--primary-grey)',
            fontFamily: 'Montserrat'
          }
        },
      },
      tooltip: {
        shared: true,
        split: true,
        useHTML: true,
        padding: 0,
        borderWidth: 0,
        shadow: false,
        backgroundColor: 'transparent',
        hideDelay: 0,
        formatter: function () {
          let data = this.points[0] ? this.points[0].point : {};
          let volume = this.points[1] ? this.points[1].y : 0;

          let isFiat = utils.isFiat(secondary);

          return `<div class="ExchangeChart__tooltip">
  <div class="ExchangeChart__tooltip__column">
    <table>
      <tr class="ExchangeChart__tooltip__row">
        <td class="ExchangeChart__tooltip__row__label">Open:</td>
        <td class="ExchangeChart__tooltip__row__value">${utils.formatDouble(data.open, isFiat ? 2 : void 0)}</td>
      </tr>
      <tr class="ExchangeChart__tooltip__row">
        <td class="ExchangeChart__tooltip__row__label">Close:</td>
        <td class="ExchangeChart__tooltip__row__value">${utils.formatDouble(data.close, isFiat ? 2 : void 0)}</td>
      </tr>
    </table>
  </div>
  <div class="ExchangeChart__tooltip__column">
    <table>
      <tr class="ExchangeChart__tooltip__row">
        <td class="ExchangeChart__tooltip__row__label">High:</td>
        <td class="ExchangeChart__tooltip__row__value">${utils.formatDouble(data.high, isFiat ? 2 : void 0)}</td>
      </tr>
      <tr class="ExchangeChart__tooltip__row">
        <td class="ExchangeChart__tooltip__row__label">Low:</td>
        <td class="ExchangeChart__tooltip__row__value">${utils.formatDouble(data.low, isFiat ? 2 : void 0)}</td>
      </tr>
    </table>
  </div>
  <div class="ExchangeChart__tooltip__column">
    <table>
      <tr class="ExchangeChart__tooltip__row">
        <td class="ExchangeChart__tooltip__row__label">Volume:</td>
        <td class="ExchangeChart__tooltip__row__value">${utils.formatDouble(volume, utils.isFiat(primary) ? 2 : void 0)}</td>
      </tr>
      <tr class="ExchangeChart__tooltip__row">
        <td class="ExchangeChart__tooltip__row__label">Date:</td>
        <td class="ExchangeChart__tooltip__row__value">${utils.dateFormat(data.x)}</td>
      </tr>
    </table>
  </div>
</div>`;
        },
        positioner: function (width, height, point) {
          var chart = this.chart,
            position;

          if (point.isHeader) {
            position = {
              x: Math.max(
                chart.plotLeft,
                Math.min(
                  point.plotX + chart.plotLeft - width / 2,
                  chart.chartWidth - width - chart.marginRight
                )
              ),
              y: chart.plotTop
            };
          } else {
            position = {
              x: point.series.chart.plotLeft,
              y: chart.plotTop
            };
          }

          return position;
        }
      },
      rangeSelector: {
        inputEnabled: false,
        enabled: false,
      },
      scrollbar: {
        height: 0,
      },
      navigator: {
        enabled: false
      },
      plotOptions: {
        column: {
          colors,
          colorByPoint: true,
        },
        series: {
          dragDrop: {
            draggableX: true,
          },
          draggableX: true,
        }
      },
      series: [
        {
          type: 'candlestick',
          data,
          dataGrouping: {
            units: groupingUnits
          },
          upColor: 'var(--primary-green)',
          upLineColor: 'var(--primary-green)',
          color: 'var(--primary-red)',
          lineColor: 'var(--primary-red)',
          yAxis: 0,
        },
        {
          type: 'column',
          data: volume,
          yAxis: 1,
          dataGrouping: {
            units: groupingUnits
          },
        }
      ],
    };

    return (
      <div className="ExchangeChart__wrap">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={'stockChart'}
        />
      </div>
    )
  }
}

export default connect((state) => ({ ...state.exchange }), {

})(memo(Chart));
