import React, { memo } from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

import UI from '../../../../../../ui';
import * as utils from '../../../../../../utils';
import Block from '../Block/Block';

class Trades extends React.Component {
  shouldComponentUpdate(nextProps) {
    const currentOrders = Object.keys(this.props.trades);
    if (!currentOrders.length) {
      return true;
    }
    return Object.keys(nextProps.trades)[0].id !== currentOrders[0].id;
  }

  render() {
    console.log('RENDER Trades');
    const headings = [
      <UI.TableColumn>{utils.getLang('global_price')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('global_amount')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_time')}</UI.TableColumn>,
    ];

    let rows = Object.values(this.props.trades).map((order) => {
      const priceClassName = utils.classNames("Exchange__orders__side", {
        sell: order.action === 'sell'
      });

      return (
        <UI.TableCell className={priceClassName} key={order.id}>
          <UI.TableColumn>
            <div className="Exchange__orders__mark">{utils.formatDouble(order.price, order.secondary_coin === 'usdt' ? 2 : void 0)}</div>
          </UI.TableColumn>
          <UI.TableColumn>{utils.formatDouble(order.filled)}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.dateFormat(order.updated_at, 'HH:mm:ss')}</UI.TableColumn>
        </UI.TableCell>
      )
    });

    const table = <UI.Table className="Exchange__orders_table" headings={headings} compact skipContentBox inline>{rows}</UI.Table>

    if (this.props.adaptive) {
      return table;
    }

    return (
      <Block
        name="trades"
        title={utils.getLang('exchange_trades')}
        // controls={[
        //   <UI.Button key="all" size="ultra_small" rounded type="secondary">{utils.getLang('global_viewAll')}</UI.Button>,
        // ]}
      >
        {table}
      </Block>
    )
  }
}

export default connect((state) => ({ ...state.exchange }), {

})(memo(Trades));
