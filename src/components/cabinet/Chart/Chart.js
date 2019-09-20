import './Chart.less';

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';
import * as currencies from "../../../utils/currencies";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export default function Chart({ series, ...props }) {
  const options = {
    chart: {
      height: 200,
    },
    title: {
      text: undefined,
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      type: 'datetime',
      title: false,
      subtitle: false,
      gridLineWidth: 0,
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: 'transparent',
      minorTickLength: 0,
      tickLength: 0,
      labels: {
        y: 19,
        distance: 0,
        padding: 0,
        style: {
          fontSize: '11px',
          fontWeight: 500,
          lineHeight: '16px',
          color: '#808080',
          fontFamily: 'Montserrat'
        }
      },
      crosshair: {
        color: '#C4C4C4'
      },
    },
    yAxis: {
      title: false,
      opposite: true,
      gridLineWidth: 0,
      subtitle: false,
      labels: {
        enabled: false
      },
    },
    legend: {
      useHTML: true,
      symbolPadding: 0,
      symbolWidth: 0,
      symbolRadius: 0,
      labelFormatter: function () {
        return `<div class="Chart__legend_item" style="background: ${currencies.getGradientByCurrency(this.name.toLowerCase())}">${this.name}</div>`;
      },
      itemMarginBottom: 0,
      margin: 0,
      x: 0,
      padding: 0,
      itemMarginTop: 16,
      align: 'left',
      alignColumns: false,
      itemDistance: 16,
      states: {
        hover: {
          enabled: false
        }
      },
      itemStyle: {
        opacity: 1,
      },
      itemHoverStyle: {
        opacity: 0.7
      }
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderWidth: 0
      },
      series: {
        lineWidth: 3,
        marker: {
          enabled: props.marker,
          radius: 3,
          symbol: 'circle',
          fillColor: '#fff',
          lineColor: null,
          lineWidth: 2,
        },
        shadow: {
          enabled: false,
        },
        states: {
          hover: {
            enabled: true,
            halo: {
              size: 10
            }
          },
        },
        events: {
          legendItemClick: () => {
            if (props.count < 2) {
              return false;
            }
          },
          mouseOver: function(e) {
            if (props.count > 1) {
              this.xAxis.update({ className: 'Chart__xaxis_invisible' });
            }
          },
          mouseOut: function () {
            if (props.count > 1) {
              this.xAxis.update({ className: '' });
            }
          }
        },
      },
    },
    tooltip: {
      shared: true,
      split: true,
      useHTML: true,
      padding: 0,
      borderWidth: 0,
      shadow: false,
      followPointer: true,
      backgroundColor: 'transparent',
      crosshairs: true,
      hideDelay: 0,
      formatter: function (tooltip) {

        return [`<div class="Chart__tooltip_date">${moment(this.x).format('L')}</div>`].concat(this.points.map((point) => {
          return `<div class="Chart__tooltip" style="background: ${currencies.getGradientByCurrency(point.series.name)}">
            ${point.series.data.filter(p => p.y === point.y)[0].title}
          </div>`;
        }));
      },
    },

    series
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  )
}

Chart.propTypes = {
  series: PropTypes.array
};
