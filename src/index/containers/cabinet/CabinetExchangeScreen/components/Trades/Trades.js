import React, { memo } from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

import UI from '../../../../../../ui';
import * as utils from '../../../../../../utils';
import Block from '../Block/Block';
import EmptyContentBlock from '../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';

class Trades extends React.Component {
  // shouldComponentUpdate(nextProps) {
  //   const currentOrders = Object.keys(this.props.trades);
  //   if (!currentOrders.length) {
  //     return true;
  //   }
  //   return Object.keys(nextProps.trades)[0].id !== currentOrders[0].id;
  // }

  renderContent() {
    if (!this.props.trades.length) {
      return <div>
        <EmptyContentBlock
          icon={require('../../../../../../asset/120/exchange.svg')}
          message={utils.getLang('exchange_tradesEmpty')}
          skipContentClass
          height={280}
        />
      </div>
    }

    const { trades, market } = this.props;
    const [,currency] = market.split('/');

    const headings = [
      <UI.TableColumn>{utils.getLang('global_price')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('global_amount')}</UI.TableColumn>,
      <UI.TableColumn align="right">{utils.getLang('global_time')}</UI.TableColumn>,
    ];

    let rows = Object.values(this.props.trades).slice(0, 30).map((trade, i) => { // .slice(0, 30) можно сделать скролл в ордерах
      const prevTrade = trades[i+1];
      const type = (prevTrade && trade.price > prevTrade.price) ? 'up' : "down";
      return (
        <UI.TableCell className="Exchange__orders__side" key={trade.id}>
          <UI.TableColumn>
            <UI.NumberFormat type={type} currency={currency} number={trade.price} hiddenCurrency />
          </UI.TableColumn>
          <UI.TableColumn><UI.NumberFormat number={trade.amount} /></UI.TableColumn>
          <UI.TableColumn align="right">{utils.dateFormat(trade.date, 'HH:mm:ss')}</UI.TableColumn>
        </UI.TableCell>
      )
    });

    return <UI.Table className="Exchange__orders_table" headings={headings} compact skipContentBox inline>{rows}</UI.Table>
  }

  render() {
    console.log('RENDER Trades');

    if (this.props.adaptive) {
      return this.renderContent();
    }

    return (
      <Block
        name="trades"
        title={utils.getLang('exchange_trades')}
        // controls={[
        //   <UI.Button key="all" size="ultra_small" rounded type="secondary">{utils.getLang('global_viewAll')}</UI.Button>,
        // ]}
      >
        {this.renderContent()}
      </Block>
    )
  }
}

export default connect((state) => ({
  ...state.exchange,
  currentLang: state.default.currentLang
}), {

})(memo(Trades));
