import React, { memo } from 'react';

import Block from '../Block/Block';
import UI from '../../../../../ui';
import * as utils from '../../../../../utils';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import EmptyContentBlock from '../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as exchange from '../../../../../actions/cabinet/exchange';
import * as modals from '../../../../../actions/modalGroup';
import * as actions from '../../../../../actions';

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'open'
    };
  }

  render() {
    return (
      <Block
        tabs={[
          {tag: 'open', label: 'Open Orders'},
          {tag: 'history', label: 'My Trades'},
        ]}
        selectedTab={this.state.tab}
        onTabChange={(tab) => this.setState({ tab })}
        controls={[
          <UI.Button key="all" size="ultra_small" rounded type="secondary">All Pairs</UI.Button>,
        ]}
      >
        {this.__renderContent()}
      </Block>
    )
  }

  __renderContent() {
    switch (this.state.tab) {
      case 'open':
        return this.__renderOpen();
      case 'history':
        return this.__renderHistory();
    }
  }

  __handleOrderDelete(orderId) {
    actions.confirm({
      title: 'Delete order?',
      okText: 'Delete',
      type: 'delete'
    }).then(() => {
      exchange.orderDelete(orderId);
    });
  }

  __renderOpen() {
    const headings = [
      <UI.TableColumn>
        <div className="Exchange__cancel_order_btn__wrap">
          <div className="Exchange__cancel_order_btn placeholder" />
          <div>Side</div>
        </div>
      </UI.TableColumn>,
      <UI.TableColumn>Pair</UI.TableColumn>,
      <UI.TableColumn>Type</UI.TableColumn>,
      <UI.TableColumn align="right">Price</UI.TableColumn>,
      <UI.TableColumn align="right">Amount</UI.TableColumn>,
      <UI.TableColumn align="right">Total</UI.TableColumn>,
      <UI.TableColumn align="right">Filled %</UI.TableColumn>,
      <UI.TableColumn align="right">Time</UI.TableColumn>,
    ];

    let rows = Object.values(this.props.openOrders).map((order) => {
      const sideClassName = utils.classNames({
        Exchange__orders__side: true,
        sell: order.action === 'sell'
      });

      let side = order.action === 'sell' ? 'Sell' : 'Buy';

      return (
        <UI.TableCell key={order.id}>
          <UI.TableColumn>
            <div className="Exchange__cancel_order_btn__wrap">
              { order.status === 'pending' ?
                <div className="Exchange__pending_order_loader" /> :
                <div onClick={() => this.__handleOrderDelete(order.id)} className="Exchange__cancel_order_btn" />
              }
              <div className={sideClassName}>{side}</div>
            </div>
          </UI.TableColumn>
          <UI.TableColumn>{`${order.primary_coin}/${order.secondary_coin}`.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn>{utils.ucfirst(order.type)}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(order.price, utils.isFiat(order.secondary_coin) ? 2 : void 0)} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(order.amount)} {order.primary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(order.price * order.amount, utils.isFiat(order.secondary_coin) ? 2 : void 0)} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{order.filled > 0 ? Math.floor(order.filled / order.filled * 100) : 0}%</UI.TableColumn>
          <UI.TableColumn align="right">{moment(order.created_at).format('H:m:s')}</UI.TableColumn>
        </UI.TableCell>
      )
    });

    return (
      <UI.Table headings={headings} compact skipContentBox>
        {rows}
      </UI.Table>
    )
  }

  __renderHistory() {
    if (!this.props.last_orders.length) {
      return (
        <EmptyContentBlock
          icon={require('../../../../../asset/120/no_orders.svg')}
          message="No trade history"
          skipContentClass
          height={280}
          button={{
            text: 'See All Pairs',
            size: 'middle',
          }}
        />
      )
    }

    const headings = [
      <UI.TableColumn>Side</UI.TableColumn>,
      <UI.TableColumn>Pair</UI.TableColumn>,
      <UI.TableColumn>Type</UI.TableColumn>,
      <UI.TableColumn align="right">Price</UI.TableColumn>,
      <UI.TableColumn align="right">Amount</UI.TableColumn>,
      <UI.TableColumn align="right">Average</UI.TableColumn>,
      <UI.TableColumn align="right">Total</UI.TableColumn>,
      <UI.TableColumn align="right">Filled %</UI.TableColumn>,
      <UI.TableColumn align="right">Status</UI.TableColumn>,
      <UI.TableColumn align="right">Time</UI.TableColumn>,
    ];

    let rows = this.props.last_orders.map((order) => {
      const sideClassName = utils.classNames({
        Exchange__orders__side: true,
        sell: order.action === 'sell'
      });

      let side = order.action === 'sell' ? 'Sell' : 'Buy';

      return (
        <UI.TableCell key={order.id}>
          <UI.TableColumn>
            <div className={sideClassName}>{side}</div>
          </UI.TableColumn>
          <UI.TableColumn>{`${order.primary_coin}/${order.secondary_coin}`.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn>{utils.ucfirst(order.type)}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(order.price, order.secondary_coin === 'usdt' ? 2 : void 0)} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(order.amount)} {order.primary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(order.price * order.amount)} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(order.price * order.amount)} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{order.filled > 0 ? Math.floor(order.filled / order.filled * 100) : 0}%</UI.TableColumn>
          <UI.TableColumn align="right">{utils.ucfirst(order.status)}</UI.TableColumn>
          <UI.TableColumn align="right">{moment(order.created_at).format('H:m:s')}</UI.TableColumn>
        </UI.TableCell>
      )
    });

    return (
      <UI.Table headings={headings} compact skipContentBox>
        {rows}
      </UI.Table>
    )
  }
}

export default connect((state) => ({ ...state.exchange }), {

})(memo(Orders));
