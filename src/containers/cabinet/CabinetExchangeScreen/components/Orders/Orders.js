import React, { memo } from 'react';

import Block from '../Block/Block';
import UI from '../../../../../ui';
import * as utils from '../../../../../utils';
import moment from 'moment/min/moment-with-locales';
import { connect } from 'react-redux';
import EmptyContentBlock from '../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as exchange from '../../../../../actions/cabinet/exchange';
import * as actions from '../../../../../actions';

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'open'
    };
  }

  render() {
    if (this.props.adaptive) {
      return this.__renderContent(this.props.type, true);
    }

    return (
      <Block
        tabs={[
          {tag: 'open', label: utils.getLang('exchange_openOrders')},
          {tag: 'history', label: utils.getLang('exchange_myTrades')},
        ]}
        selectedTab={this.state.tab}
        onTabChange={(tab) => this.setState({ tab })}
        // controls={[
        //   <UI.Button key="all" size="ultra_small" rounded type="secondary">{utils.getLang('exchange_allPairs')}</UI.Button>,
        // ]}
      >
        {this.__renderContent(this.state.tab)}
      </Block>
    )
  }

  __renderContent(type, adaptive) {
    switch (type) {
      case 'open':
        return this.__renderOpen(adaptive);
      case 'history':
        return this.__renderHistory(adaptive);
    }
  }

  __handleOrderDelete(orderId) {
    actions.confirm({
      title: utils.getLang('exchange_confirmDeleteOrder_title'),
      content: utils.getLang('exchange_confirm_orderDeleteText'),
      okText: utils.getLang('global_delete'),
      type: 'delete'
    }).then(() => {
      exchange.orderDelete(orderId);
    });
  }

  __renderOpen(adaptive) {

    if (!Object.keys(this.props.openOrders).length) {
      return (
        <EmptyContentBlock
          icon={require('../../../../../asset/120/no_orders.svg')}
          message={utils.getLang('exchange_openOrdersEmpty')}
          skipContentClass
          height={280}
          button={{
            text: utils.getLang('exchange_seeAllPairs'),
            size: 'middle',
          }}
        />
      )
    }

    const headings = !adaptive ? [
      <UI.TableColumn>
        <div className="Exchange__cancel_order_btn__wrap">
          <div className="Exchange__cancel_order_btn placeholder" />
          <div>{utils.getLang('global_side')}</div>
        </div>
      </UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('global_pair')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('global_type')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_price')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_amount')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_total')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_filled')} %</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_time')}</UI.TableColumn>,
    ] : [
      <UI.TableColumn>{utils.getLang('global_price')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('global_amount')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_time')}</UI.TableColumn>,
    ];

    let rows = Object.values(this.props.openOrders).map((order) => {
      const sideClassName = utils.classNames({
        Exchange__orders__side: true,
        sell: order.action === 'sell'
      });

      let side = order.action === 'sell' ? utils.getLang('exchange_sell') : utils.getLang('exchange_buy');
      const price = utils.formatDouble(order.price * order.amount, utils.isFiat(order.secondary_coin) ? 2 : void 0);

      return !adaptive ? (
        <UI.TableCell className={sideClassName} key={order.id}>
          <UI.TableColumn>
            <div className="Exchange__cancel_order_btn__wrap">
              { order.status === 'pending' ?
                <div className="Exchange__pending_order_loader" /> :
                <div onClick={() => this.__handleOrderDelete(order.id)} className="Exchange__cancel_order_btn" />
              }
              <div className="Exchange__orders__mark">{side}</div>
            </div>
          </UI.TableColumn>
          <UI.TableColumn>{`${order.primary_coin}/${order.secondary_coin}`.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn>{utils.ucfirst(order.type)}</UI.TableColumn>
          <UI.TableColumn align="right">{price} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(order.amount)} {order.primary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(price * order.amount)} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{order.filled > 0 ? Math.floor(order.filled / order.filled * 100) : 0}%</UI.TableColumn>
          <UI.TableColumn align="right">{utils.dateFormat(order.updated_at, 'HH:mm:ss')}</UI.TableColumn>
        </UI.TableCell>
      ) : (
        <UI.TableCell className={sideClassName} key={order.id}>
          <UI.TableColumn>{utils.formatDouble(order.price, utils.isFiat(order.secondary_coin) ? 2 : void 0)} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn>{utils.formatDouble(order.amount)} {order.primary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.dateFormat(order.updated_at, 'HH:mm:ss')}</UI.TableColumn>
        </UI.TableCell>
      );
    });

    return (
      <UI.Table inline={adaptive} className="Exchange__orders_table" headings={headings} compact skipContentBox>
        {rows}
      </UI.Table>
    )
  }

  __renderHistory(adaptive) {
    if (!this.props.last_orders.length) {
      return (
        <EmptyContentBlock
          icon={require('../../../../../asset/120/no_orders.svg')}
          message={utils.getLang('exchange_noTradeHistory')}
          skipContentClass
          height={280}
          button={{
            text: utils.getLang('exchange_seeAllPairs'),
            size: 'middle',
          }}
        />
      )
    }

    const headings = !adaptive ? [
      <UI.TableColumn>{utils.getLang('global_side')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('global_pair')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('global_type')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_price')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_amount')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_average')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_total')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_filled')} %</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_status')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_time')}</UI.TableColumn>,
    ] : [
      <UI.TableColumn>{utils.getLang('global_price')}<br />{utils.getLang('global_average')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('global_amount')}<br />{utils.getLang('global_filled')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_type')}<br />{utils.getLang('global_time')}</UI.TableColumn>,
    ];

    let rows = this.props.last_orders.map((order) => {
      const sideClassName = utils.classNames({
        Exchange__orders__side: true,
        sell: order.action === 'sell'
      });

      const side = order.action === 'sell' ? utils.getLang('exchange_sell') : utils.getLang('exchange_buy');
      const price = utils.formatDouble(order.price, order.secondary_coin === 'usdt' ? 2 : void 0);
      const average = utils.formatDouble(order.price * order.amount) + " " + order.secondary_coin.toUpperCase();
      const filled = (order.filled > 0 ? Math.floor(order.filled / order.filled * 100) : 0) + "%";
      return !adaptive ? (
        <UI.TableCell className={sideClassName} key={order.id}>
          <UI.TableColumn>
            <div className="Exchange__orders__mark">{side}</div>
          </UI.TableColumn>
          <UI.TableColumn>{`${order.primary_coin}/${order.secondary_coin}`.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn>{utils.ucfirst(order.type)}</UI.TableColumn>
          <UI.TableColumn align="right">{price} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(order.amount)} {order.primary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{average}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.formatDouble(price * order.amount)} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn align="right">{filled}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.ucfirst(order.status)}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.dateFormat(order.updated_at, 'HH:mm:ss')}</UI.TableColumn>
        </UI.TableCell>
      ) : (
        <UI.TableCell className={sideClassName} key={order.id}>
          <UI.TableColumn sub={average}>{price} {order.secondary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn sub={filled}>{utils.formatDouble(order.amount)} {order.primary_coin.toUpperCase()}</UI.TableColumn>
          <UI.TableColumn sub={utils.dateFormat(order.updated_at, 'HH:mm:ss')} align="right">{utils.ucfirst(order.type)}</UI.TableColumn>
        </UI.TableCell>
      );
    });

    return (
      <UI.Table inline={adaptive} className="Exchange__orders_table" headings={headings} compact skipContentBox>
        {rows}
      </UI.Table>
    )
  }
}

export default connect((state) => ({ ...state.exchange }), {

})(memo(Orders));
