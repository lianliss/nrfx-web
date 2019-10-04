import './Chart.less';

import React from 'react';
import { widget } from '../../../../../charting_library/charting_library.min';


export default class Chart extends React.PureComponent {
  static defaultProps = {
    symbol: 'BTC:USDT2',
    interval: '1',
    resolution: '1',
    containerId: 'tv_chart_container',
    datafeedUrl: 'https://stage.bitcoinbot.pro/api/v1/exchange_chart',
    libraryPath: 'charting_library/',
    chartsStorageUrl: 'https://saveload.tradingview.com',
    chartsStorageApiVersion: '1.1',
    clientId: 'tradingview.com',
    userId: 'public_user_id',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  tvWidget = null;

  componentDidMount() {
    const widgetOptions = {
      symbol: this.props.symbol,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,

      locale: 'ru',
      disabled_features: [
        'use_localstorage_for_settings',
        'header_widget',
        'edit_buttons_in_legend',
        'context_menus',
        'go_to_date',
        'timeframes_toolbar',
        'shift_visible_range_on_new_bar',
        'compare_symbol',
        'left_toolbar',
        'header_symbol_search',
        'symbol_search_hot_key',
        'header_settings',
        'header_compare',
        'header_screenshot',
        'header_saveload',
        'symbol_info',
        'header_resolutions',
        'border_around_the_chart',
        'remove_library_container_border',
      ],
      enabled_features: [
        'side_toolbar_in_fullscreen_mode',
        'move_logo_to_main_pane',
        'hide_left_toolbar_by_default'
      ],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      allow_symbol_change: false,
      time_frames: [],
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;
  }

  componentWillUnmount() {
    if (this.tvWidget !== null) {
      this.tvWidget.remove();
      this.tvWidget = null;
    }
  }

  render() {
    return (
      <div
        id={ this.props.containerId }
        className="Exchange__trading_view"
      />
    );
  }
}
