import './Chart.less';

import React from 'react';
import { widget } from '../../../../../charting_library/charting_library.min';
import { classNames as cn } from '../../../../../../utils/index'
import * as exchangeActions from '../../../../../../actions/cabinet/exchange';
import * as actions from '../../../../../../actions/';
// import { API_ENTRY } from '../../../../../../services/api';
import getTimezone from './timezones';
import langCodes from './langCodes';
import LoadingStatus from '../../../../../components/cabinet/LoadingStatus/LoadingStatus';


export default class Chart extends React.PureComponent {
  static defaultProps = {
    symbol: 'ETH:USDT',
    interval: '1',
    resolution: '1',
    containerId: 'tv_chart_container',
    //datafeedUrl: API_ENTRY + '/api/v1/exchange_chart',
    datafeedUrl: 'https://exchange.bitcoinbot.pro/chart',
    // datafeedUrl: 'http://demo_feed.tradingview.com',

    libraryPath: 'charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  state = {
    status: 'loading'
  };

  tvWidget = null;

  __handleFullscreen() {
    if (!document.webkitIsFullScreen && !document.fullscreen ) {
      exchangeActions.setFullscreen(false);
    }
  }

  componentDidMount() {
    document.addEventListener('fullscreenchange', this.__handleFullscreen.bind(this), false);
    document.addEventListener('webkitfullscreenchange', this.__handleFullscreen.bind(this), false);

    const lang = actions.getCurrentLang();
    const locale = langCodes[lang.value] || lang.value;

    const widgetOptions = {
      symbol: this.props.symbol,
      // symbol: 'AA',
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,

      locale: locale,
      disabled_features: [
        'header_widget',
        'edit_buttons_in_legend',
        'context_menus',
        'use_localstorage_for_settings',
        'go_to_date',
        'timeframes_toolbar',
        'shift_visible_range_on_new_bar',
        'compare_symbol',
        'header_symbol_search',
        'symbol_search_hot_key',
        'header_settings',
        'header_fullscreen_button',
        'header_compare',
        'header_screenshot',
        'header_saveload',
        'symbol_info',
        'header_resolutions',
        'border_around_the_chart',
      ],
      enabled_features: [
        'charting_library_debug_mode',
        'side_toolbar_in_fullscreen_mode',
        'move_logo_to_main_pane',
        // 'hide_left_toolbar_by_default'
      ],

      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: {
        'volume.volume.color.0': '#eb6456',
        'volume.volume.color.1': '#68c2ab',
        ...this.props.studiesOverrides,
      },
      overrides: {
        'paneProperties.crossHairProperties.color': '#808080',
        'scalesProperties.lineColor': '#F5F1EE',
        'scalesProperties.textColor': '#808080',
        'mainSeriesProperties.candleStyle.drawBorder': false,
        'mainSeriesProperties.candleStyle.wickUpColor': '#68c2ab',
        'mainSeriesProperties.candleStyle.wickDownColor': '#eb6456',
        'paneProperties.horzGridProperties.color': '#F5F1EE',
        'paneProperties.vertGridProperties.color': '#F5F1EE',
        'mainSeriesProperties.candleStyle.upColor': '#68c2ab',
        'mainSeriesProperties.candleStyle.downColor': '#eb6456'
      },
      allow_symbol_change: false,
      timezone: getTimezone(),
      time_frames: [],
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      this.activeChart = this.tvWidget.activeChart();
      this.setState({status: ''});
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.interval !== this.props.interval && this.activeChart) {
      this.activeChart.setResolution(this.props.interval.toString());
    }

    if (prevProps.fullscreen !== this.props.fullscreen) {
      if (this.props.fullscreen) {
        const { tradingView } = this.refs;
        if (tradingView.requestFullscreen) {
          tradingView.requestFullscreen();
        } else {
          tradingView.webkitRequestFullScreen();
        }
      }
    }
    return false;
  }

  componentWillUnmount() {
    // clearInterval(this.chartSetInterval);
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return (
      <div className={cn("ExchangeChart", this.state.status)}>
        {this.state.status && <LoadingStatus status={this.state.status} />}
        <div
          id={ this.props.containerId }
          ref="tradingView"
          className={ cn("ExchangeChart__tradingView", { fullscreen: this.props.fullscreen })}
        />
      </div>
    );
  }
}

