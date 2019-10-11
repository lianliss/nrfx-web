import './CabinetExchangeScreen.less';

import React from 'react';

import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import Block from './components/Block/Block';
import SwitchBlock from './components/SwitchBlock/SwitchBlock';
import Trades from './components/Trades/Trades';
import Balances from './components/Balances/Balances';

import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import * as utils from '../../../utils';
import OrderBook from './components/OrderBook/OrderBook';
import TradeForm from './components/TradeForm/TradeForm';
import Orders from './components/Orders/Orders';
import MarketInfo from './components/MarketInfo/MarketInfo';
import MarketInfoAdaptive from './components/MarketInfoAdaptive/MarketInfoAdaptive';
import Chart from './components/Chart/Chart';
import * as exchangeService from '../../../services/exchange';

class CabinetExchangeScreen extends CabinetBaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      ordersTab: 'open',
    };
  }

  componentDidMount() {
    super.componentDidMount();
    exchangeService.bind(this.props.market);
  }

  componentWillUnmount() {
    exchangeService.unbind(this.props.market);
  }

  render() {
    console.log("render CabinetExchangeScreen");
    return (
      <div>
        {this.__renderContent()}
      </div>
    )
  }

  __renderContent() {
    if (this.isLoading) {
      return <LoadingStatus status={this.loadingStatus} onRetry={() => this.load()} />;
    }

    return this.props.adaptive ? this.__renderExchangeAdaptive() : this.__renderExchange();
  }

  __renderExchangeAdaptive() {
    return (
      <div className="Exchange__wrapper">
        <div className="Content_box">
          <MarketInfoAdaptive {...this.props.tickerInfo} />
          <Chart
            adaptive={true}
            fullscreen={this.props.fullscreen}
            symbol={this.props.market.split('/').join(':').toUpperCase()}
            key={`chart_${this.props.chartTimeFrame}_${this.props.fullscreen}`}
            interval={this.props.chartTimeFrame}
          />
        </div>
        <SwitchBlock contents={[
          {
            title: utils.getLang('exchange_trades'),
            content: <TradeForm
              ref="trade_form"
              adaptive={true}
              depth={this.props.depth}
              balance={this.props.balanceInfo}
              ticker={this.props.tickerInfo}
              market={this.props.market}
            />
          },
          {
            title: utils.getLang('global_balance'),
            content: <Balances adaptive={true} />
          }
        ]} />
        <SwitchBlock type="buttons" contents={[
          {
            title: utils.getLang('exchange_trades'),
            content: <Trades adaptive={true} />
          },
          {
            title: utils.getLang('exchange_openOrders'),
            content: <Orders type="open" adaptive={true} />
          },
          {
            title: utils.getLang('exchange_myTrades'),
            content: <Orders type="history" adaptive={true} />
          }
        ]} />
      </div>
    )
  }

  __renderExchange() {
    return (
      <div className="Exchange__wrapper">
        <div className="Exchange__left_content">
          <Balances />
          <Trades />
        </div>
        <div className="Exchange__right_content">
          <div className="Exchange__trade_content">
            <div className="Exchange__chart_wrapper">
              <div className="Exchange__chart Content_box">
                {this.props.tickerInfo && <MarketInfo />}
                <Chart
                  fullscreen={this.props.fullscreen}
                  symbol={this.props.market.split('/').join(':').toUpperCase()}
                  key={`chart_${this.props.chartTimeFrame}_${this.props.fullscreen}`}
                  interval={this.props.chartTimeFrame}
                />
              </div>
              {this.props.tickerInfo && <TradeForm
                ref="trade_form"
                balance={this.props.balanceInfo}
                ticker={this.props.tickerInfo}
                market={this.props.market}
              />}
            </div>
            <div className="Exchange__order_book">
              {this.__renderOrderBook()}
            </div>
          </div>
          <Orders />
        </div>
      </div>
    )
  }

  __renderOrderBook() {
    return (
      <Block
        title={utils.getLang('exchange_orderBook')}
        skipCollapse
        skipPadding
      >
        <OrderBook
          onOrderPress={(order) => this.refs.trade_form.set(order.amount, order.price)}
          {...this.props.depth}
        />
      </Block>
    )
  }

  load() {
    this.props.load(this.props.market);
  }
}

export default storeUtils.getWithState(
  CLASSES.CABINET_EXCHANGE_SCREEN,
  CabinetExchangeScreen
);
