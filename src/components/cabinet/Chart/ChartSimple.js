/* eslint-disable */
import './Chart.less';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/min/moment-with-locales';
import * as currencies from "../../../utils/currencies";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { classNames } from "../../../utils/index";

export default function Chart({ series, ...props }) {

  const [ hovered, setHovered ] = useState(false);

  const options = {
    chart: {
      backgroundColor: null,
      height: 56,
    },
    title: {
      text: undefined,
    },
    subtitle: {
      text: undefined
    },
    xAxis: {
      visible: false,
      labels: {
        enabled: false
      },
    },
    yAxis: {
      visible: false,
      title: false,
      opposite: true,
      gridLineWidth: 0,
      subtitle: false,
      labels: {
        enabled: false
      },
    },
    legend: {
      enabled: false,
      useHTML: true,
      symbolPadding: 0,
      symbolWidth: 0,
      symbolRadius: 0,

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
        animation: false,
        enableMouseTracking: false,
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
      },
    },

    series
  };

  return (
    <HighchartsReact
      containerProps={{ className: classNames("Chart", { hovered }) }}
      highcharts={Highcharts}
      options={options}
    />
  )
}

Chart.propTypes = {
  series: PropTypes.array
};