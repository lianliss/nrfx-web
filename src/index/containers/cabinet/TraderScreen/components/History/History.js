import './History.less';

import React from 'react';
import { connect } from 'react-redux';

import UI from '../../../../../../ui';

import * as traderActions from '../../../../../../actions/cabinet/trader';
import * as utils from '../../../../../../utils';


const History = props => {
  const { history } = props;
  return (
    <div>
      <UI.ContentBox className="Bot__history" >
        <h2>Trade History</h2>
        <UI.Table headings={[
          <UI.TableColumn>Price</UI.TableColumn>,
          <UI.TableColumn align="right">Amount</UI.TableColumn>,
          <UI.TableColumn align="right">Percent</UI.TableColumn>,
          <UI.TableColumn align="right">Profit</UI.TableColumn>,
          <UI.TableColumn align="right">Time</UI.TableColumn>,
        ]} compact skipContentBox inline>
          {history.map(h => (
            <UI.TableCell key={h.id}>
              <UI.TableColumn><UI.NumberFormat number={h.price} type={h.side} /></UI.TableColumn>
              <UI.TableColumn align="right"><UI.NumberFormat number={h.amount} /></UI.TableColumn>
              <UI.TableColumn align="right"><UI.NumberFormat number={h.percent} percent /></UI.TableColumn>
              <UI.TableColumn align="right">{ h.profit !== 0 ? <UI.NumberFormat number={h.profit} currency={'usd'} /> : '-' }</UI.TableColumn>
              <UI.TableColumn align="right">{utils.dateFormat(h.created_at)}</UI.TableColumn>
            </UI.TableCell>
          ))}
        </UI.Table>
      </UI.ContentBox>
    </div>
  )
}

export default connect(state => ({
  ...state.trader.bot,
}), {
  setStatusBot: traderActions.setStatusBot
})(History);
