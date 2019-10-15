import React, { memo } from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

import UI from '../../../../../ui';
import * as utils from '../../../../../utils';
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
      <UI.TableColumn>Price</UI.TableColumn>,
      <UI.TableColumn>Amount</UI.TableColumn>,
      <UI.TableColumn align="right">Time</UI.TableColumn>,
    ];

    let rows = Object.values(this.props.trades).map((order) => {
      const priceClassName = utils.classNames({
        Exchange__orders__side: true,
        sell: order.action === 'sell'
      });
      return (
        <UI.TableCell key={order.id}>
          <UI.TableColumn>
            <div className={priceClassName}>{utils.formatDouble(order.price, order.secondary_coin === 'usdt' ? 2 : void 0)}</div>
          </UI.TableColumn>
          <UI.TableColumn>{utils.formatDouble(order.filled)}</UI.TableColumn>
          <UI.TableColumn align="right">{utils.dateFormat(order.created_at, 'H:m:s')}</UI.TableColumn>
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
}

export default connect((state) => ({ ...state.exchange }), {

})(memo(Trades));
