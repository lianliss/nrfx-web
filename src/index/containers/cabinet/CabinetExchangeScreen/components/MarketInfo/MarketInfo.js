import './MarketInfo.less';

import React, { memo } from 'react';
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';
// import moment from 'moment/min/moment-with-locales';

import UI from '../../../../../../ui';
import * as utils from '../../../../../../utils';
import * as actions from '../../../../../../actions';
import * as exchangeActions from '../../../../../../actions/cabinet/exchange';

class MarketInfo extends React.Component{

  __handleChooseMarket() {
    actions.openModal('choose_market');
  }

  render() {
    const [primary, secondary] = this.props.market.toUpperCase().split('/');

    return (
      <div className="MarketInfo">
        <div className="MarketInfo__row pair">
          <div className="MarketInfo__pair" onClick={this.__handleChooseMarket}>
            <div className="MarketInfo__pair__primary">{primary}</div>
            <div className="MarketInfo__pair__secondary">{secondary}</div>
          </div>
        </div>
        {this.__renderPrice()}
        {this.__renderSummary()}
      </div>
    )
  }

  __renderPrice() {
    const { tickerInfo, market } = this.props;
    const [, secondary] = market.split('/');

    const lastPriceClassName = utils.classNames({
      MarketInfo__info_row__value__primary: true,
      [tickerInfo.percent >= 0 ? 'up' : 'down']: true
    });

    const dayChangeClassName = utils.classNames({
      MarketInfo__info_row__value__primary: true,
      [tickerInfo.percent >= 0 ? 'up' : 'down']: true
    });

    return (
      <div className="MarketInfo__row price">
        <div className="MarketInfo__info_row">
          <div className="MarketInfo__info_row__label">{utils.getLang('exchange_lastPrice')}</div>
          <div className="MarketInfo__info_row__value">
            <div className={lastPriceClassName}> {utils.formatDouble(tickerInfo.price, utils.isFiat(secondary) ? 2 : void 0)}</div>
            ${utils.formatDouble(tickerInfo.usd_price, 2)}
          </div>
        </div>
        <div className="MarketInfo__info_row">
          <div className="MarketInfo__info_row__label">{utils.getLang('exchange_24h_change')}</div>
          <div className="MarketInfo__info_row__value">
            <div className={dayChangeClassName}>{`${utils.formatDouble(tickerInfo.percent, 2)}%`}</div>
            {utils.formatDouble(tickerInfo.diff, utils.isFiat(secondary) ? 2 : void 0)}
          </div>
        </div>
      </div>
    )
  }

  __renderSummary() {
    const { tickerInfo, market, depth } = this.props;
    const [, secondary] = market.split('/');

    // const timeFrames =  [
    //   { minutes: 5, value: 5 },
    //   { minutes: 15, value: 15 },
    //   { minutes: 30, value: 30 },
    //   { minutes: 60, value: 60 },
    //   { minutes: 120, value: 120 },
    //   { minutes: 1440, value: '1D' },
    //   { minutes: 10080, value: '1W' }
    // ].map((item) => {
    //   return  <UI.Button
    //     key={item.minutes}
    //     roundedMarketInfo__info_row__value
    //     size="ultra_small"
    //     type={item.value === this.props.chartTimeFrame ? '' : 'secondary'}
    //     onClick={() => this.props.changeTimeFrame(item.value)}
    //   >{moment().to(moment().subtract(item.minutes, 'minutes'), true)}</UI.Button>
    // });

    const timeFrames = [
      {label: '5 min', value: 5},
      {label: '15 min', value: 15},
      {label: '30 min', value: 30},
      {label: '1 hour', value: 60},
      {label: '2 hours', value: 120},
      {label: '1 day', value: '1D'},
      {label: '1 week', value: '1W'},
    ].map((item) => {
      return  <UI.Button
        key={item.value}
        rounded
        size="ultra_small"
        type={item.value === this.props.chartTimeFrame ? '' : 'secondary'}
        onClick={() => this.props.changeTimeFrame(item.value)}
      >{item.label}</UI.Button>
    });

    let asks = Object.values(depth.asks);
    let bids = Object.values(depth.bids);

    asks.sort((a, b) => a.price > b.price ? -1 : 1);
    bids.sort((a, b) => a.price > b.price ? -1 : 1);

    const bestAsk = asks[asks.length - 1];
    const bestBid = bids[0];

    return (
      <div className="MarketInfo__row summary">
        <div className="MarketInfo__summary_line">
          <div className="MarketInfo__info_row">
            <div className="MarketInfo__info_row__label">{utils.getLang('exchange_24h_volume')}</div>
            <div className="MarketInfo__info_row__value">{utils.formatDouble(tickerInfo.usd_volume, 2)}</div>
          </div>
          <div className="MarketInfo__info_row">
            <div className="MarketInfo__info_row__label">{utils.getLang('exchange_24h_high')}</div>
            <div className="MarketInfo__info_row__value">{utils.formatDouble(tickerInfo.max, utils.isFiat(secondary) ? 2 : void 0)}</div>
          </div>
          <div className="MarketInfo__info_row">
            <div className="MarketInfo__info_row__label">{utils.getLang('exchange_24h_low')}</div>
            <div className="MarketInfo__info_row__value">{utils.formatDouble(tickerInfo.min, utils.isFiat(secondary) ? 2 : void 0)}</div>
          </div>
          <div className="MarketInfo__info_row">
            <div className="MarketInfo__info_row__label">{utils.getLang('exchange_ask')}</div>
            <div className="MarketInfo__info_row__value">{utils.formatDouble(bestAsk ? bestAsk.price : 0, utils.isFiat(secondary) ? 2 : void 0)}</div>
          </div>
          <div className="MarketInfo__info_row">
            <div className="MarketInfo__info_row__label">{utils.getLang('exchange_bid')}</div>
            <div className="MarketInfo__info_row__value">{utils.formatDouble(bestBid ? bestBid.price : 0, utils.isFiat(secondary) ? 2 : void 0)}</div>
          </div>
        </div>
        <div className="MarketInfo__summary_controls">
          {timeFrames}
          <UI.Button
            rounded
            size="ultra_small"
            onClick={() => {
              exchangeActions.setFullscreen();
            }}
            className="MarketInfo__fullscreen_button"
            type="secondary"
            title="FullScreen"
          ><SVG src={require('../../../../../../asset/16px/fullscreen.svg')} /></UI.Button>
        </div>
      </div>
    )
  }
}

export default connect((state) => ({ ...state.exchange }), {
  changeTimeFrame: exchangeActions.changeTimeFrame
})(memo(MarketInfo));
