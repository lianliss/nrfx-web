import './CabinetExchangeScreen.less';

import React from 'react';
import { connect } from 'react-redux';

import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import Block from './components/Block/Block';
import SwitchBlock from './components/SwitchBlock/SwitchBlock';
import Trades from './components/Trades/Trades';
import Balances from './components/Balances/Balances';
import SVG from 'react-inlinesvg';

import * as utils from '../../../../utils';
import OrderBook from './components/OrderBook/OrderBook';
import TradeForm from './components/TradeForm/TradeForm';
import Orders from './components/Orders/Orders';
import MarketInfo from './components/MarketInfo/MarketInfo';
import MarketInfoAdaptive from './components/MarketInfoAdaptive/MarketInfoAdaptive';
import Chart from './components/Chart/Chart';
import * as exchangeService from '../../../../services/exchange';
import UI from '../../../../ui/';
import * as exchangeActions from '../../../../actions/cabinet/exchange';
import * as actions from '../../../../actions';

class CabinetExchangeScreen extends CabinetBaseScreen {
  constructor(props) {
    super(props);

    this.state = {
      ordersTab: 'open',
      orderBookType: 'all',
    };
  }

  componentDidMount() {
    super.componentDidMount();
    this.props.setTitle(utils.getLang('cabinet_header_exchange'));
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

  renderDisconnectedModal() {
    if (this.loadingStatus === 'disconnected') {
      this.load();
    }

    if (!['disconnected', 'reloading'].includes(this.loadingStatus)) return null;
    return (
      <UI.Modal skipClose className="Exchange__disconnectModal" isOpen={true} onClose={this.props.onClose}>
        <div className="Exchange__disconnectModal__content">
          <p>{utils.getLang('exchange_failedConnect')}</p>
          <LoadingStatus inline status={'loading'} />
          <p>{utils.getLang('exchange_reconnect')}</p>
        </div>
      </UI.Modal>
    )
  }

  __renderContent() {
    if (this.isLoading && !['disconnected', 'reloading'].includes(this.loadingStatus)) {
      return <LoadingStatus status={this.loadingStatus} onRetry={() => this.load()} />;
    }

    return this.props.adaptive ? this.__renderExchangeAdaptive() : this.__renderExchange();
  }

  __renderExchangeAdaptive() {
    return (
      <div className="Exchange__wrapper">
        {this.renderDisconnectedModal()}
        <UI.ContentBox>
          <MarketInfoAdaptive {...this.props.tickerInfo} />
          <Chart
            adaptive={true}
            fullscreen={this.props.fullscreen}
            symbol={this.props.market.split('/').join(':').toUpperCase()}
            key={`chart_${this.props.chartTimeFrame}_${this.props.fullscreen}`}
            interval={this.props.chartTimeFrame}
          />
        </UI.ContentBox>
        <SwitchBlock hideTabs={!this.props.user} contents={[
          {
            title: utils.getLang('exchange_trades'),
            content: <TradeForm
              loadingStatus={this.props.loadingStatus}
              ref="trade_form"
              adaptive={true}
              depth={this.props.depth}
              balance={this.props.balanceInfo}
              ticker={this.props.tickerInfo}
              market={this.props.market}
              user={this.props.user}
              fee={this.props.fee}
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
            content: <Trades market={this.props.market} adaptive={true} />
          },
          {
            title: utils.getLang('exchange_openOrders'),
            content: <Orders type="open" adaptive={true} />,
            disabled: !this.props.user
          },
          {
            title: utils.getLang('exchange_myTrades'),
            content: <Orders type="history" adaptive={true} />,
            disabled: !this.props.user
          }
        ]} />
      </div>
    )
  }

  __renderExchange() {
    return (
      <div className="Exchange__wrapper">
        {this.renderDisconnectedModal()}
        <div className="Exchange__left_content">
          { this.props.user && <Balances /> }
          <Trades market={this.props.market}  />
        </div>
        <div className="Exchange__right_content">
          <div className="Exchange__trade_content">
            <div className="Exchange__chart_wrapper">
              <UI.ContentBox className="Exchange__chart">
                {this.props.tickerInfo && <MarketInfo />}
                <Chart
                  fullscreen={this.props.fullscreen}
                  symbol={this.props.market.split('/').join(':').toUpperCase()}
                  key={`chart_${this.props.chartTimeFrame}_${this.props.fullscreen}`}
                  interval={this.props.chartTimeFrame}
                />
              </UI.ContentBox>
              {this.props.tickerInfo && <TradeForm
                loadingStatus={this.props.loadingStatus}
                ref="trade_form"
                fee={this.props.fee}
                balance={this.props.balanceInfo}
                ticker={this.props.tickerInfo}
                user={this.props.user}
                market={this.props.market}
              />}
            </div>
            <div className="Exchange__order_book">
              {this.__renderOrderBook()}
            </div>
          </div>
          { this.props.user && <Orders /> }
        </div>
      </div>
    )
  }

  __renderOrderBookControlOptions () {
    return ['all', 'bids', 'asks'].map(type => ({
      label: utils.ucfirst(type),
      value: type,
      className: type,
      icon: <SVG src={require('../../../../asset/16px/list.svg')} />
    }))
  }

  __renderOrderBook() {
    return (
      <Block
        title={utils.getLang('exchange_orderBook')}
        skipCollapse
        skipPadding
        controls={['all', 'bids', 'asks'].map(type => (
          <div key={type} onClick={() => this.setState({ orderBookType: type })}> {type === this.state.orderBookType ? `[${type}]` : type}</div>
        ))}
        controls={(
          <UI.SwitchButtons
            className="Exchange__orderbook_controls"
            selected={this.state.orderBookType}
            onChange={type => this.setState({ orderBookType: type })}
            tabs={this.__renderOrderBookControlOptions()} />
        )}
      >
        <OrderBook
          type={this.state.orderBookType}
          onOrderPress={(order) => this.refs.trade_form.set(
            order.amount - order.filled,
            utils.formatDouble(order.price, 2)
          )}
          {...this.props.depth}
          loading={this.props.loadingStatus.orderBook}
        />
      </Block>
    )
  }

  load() {
    let { market } = this.props.router.route.params;
    market = (market && market.toLowerCase().replace('_', '/')) || this.props.market;
    this.props.load(market);
    exchangeService.bind(market);
  }
}

export default connect(
  state => ({
    ...state.exchange,
    adaptive: state.default.adaptive,
    lang: state.default.lang,
    router: state.router,
    user: state.default.profile.user
  }), {
    load: exchangeActions.load,
    chooseMarket: exchangeActions.chooseMarket,
    setTitle: actions.setTitle
  }
)(CabinetExchangeScreen);
