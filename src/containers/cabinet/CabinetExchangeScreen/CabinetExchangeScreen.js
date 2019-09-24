import './CabinetExchangeScreen.less';

import React from 'react';

import moment from 'moment';

import LoadingStatus from '../../../components/cabinet/LoadingStatus/LoadingStatus';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import Block from './components/Block/Block';
import UI from '../../../ui';

import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import * as utils from '../../../utils';
import OrderBook from './components/OrderBook/OrderBook';
import TradeForm from './components/TradeForm/TradeForm';
import Orders from './components/Orders/Orders';
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
    super.componentWillUnmount();
    exchangeService.unbind(this.props.market);
  }

  render() {
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

    return this.__renderExchange();
  }

  __renderExchange() {
    return (
      <div className="Exchange__wrapper">
        <div className="Exchange__left_content">
          {this.__renderBalances()}
          {this.__renderTrades()}
        </div>
        <div className="Exchange__right_content">
          <div className="Exchange__trade_content">
            <div className="Exchange__chart_wrapper">
              <div className="Exchange__chart Content_box">

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

  __renderBalances() {
    const headings = [
      <UI.TableColumn>Currency</UI.TableColumn>,
      <UI.TableColumn align="right">Amount</UI.TableColumn>,
    ];

    let rows = this.props.balances.map((balance) => {
      return (
        <UI.TableCell key={balance.id}>
          <UI.TableColumn>{balance.currency.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(balance.amount, balance.currency === 'usdt' ? 2 : void 0)}</UI.TableColumn>
        </UI.TableCell>
      )
    });

    return (
      <Block
        title="Balance"
        controls={[
          <UI.Button key="withdraw" size="ultra_small" rounded type="secondary">Manage</UI.Button>
        ]}
      >
        <UI.Table headings={headings} compact skipContentBox>
          {rows}
        </UI.Table>
      </Block>
    )
  }

  __renderTrades() {
    const headings = [
      <UI.TableColumn>Price</UI.TableColumn>,
      <UI.TableColumn>Amount</UI.TableColumn>,
      <UI.TableColumn align="right">Time</UI.TableColumn>,
    ];

    let rows = Object.keys(this.props.trades).map((order) => {
      const priceClassName = utils.classNames({
        Exchange__orders__side: true,
        sell: order.action === 'sell'
      });
      return (
        <UI.TableCell key={order.id}>
          <UI.TableColumn>
            <div className={priceClassName}>{utils.formatDouble(order.price, order.secondary_coin === 'usdt' ? 2 : void 0)}</div>
          </UI.TableColumn>
          <UI.TableColumn>{utils.formatDouble(order.amount)}</UI.TableColumn>
          <UI.TableColumn align="right">{moment(order.created_at).format('H:m:s')}</UI.TableColumn>
        </UI.TableCell>
      )
    });

    return (
      <Block
        title="Trades"
        controls={[
          <UI.Button key="all" size="ultra_small" rounded type="secondary">View All</UI.Button>,
        ]}
      >
        <UI.Table headings={headings} compact skipContentBox inline>
          {rows}
        </UI.Table>
      </Block>
    )
  }

  __renderOrderBook() {
    return (
      <Block
        title="Order Book"
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
