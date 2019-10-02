import React, { memo } from 'react';
import { connect } from 'react-redux';

import UI from '../../../../../ui';
import * as utils from '../../../../../utils';
import Block from '../Block/Block';
import { openModal } from '../../../../../actions/';

class Balances extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.balances !== this.props.balances;
  }

  __handleOpenBalance() {
    openModal('manage_balance', {}, {
      a: 1,
    });
  }

  render() {
    console.log('RENDER balances');
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
          <UI.Button
            key="withdraw"
            size="ultra_small"
            rounded type="secondary"
            onClick={this.__handleOpenBalance}
          >Manage</UI.Button>
        ]}
      >
        <UI.Table headings={headings} compact skipContentBox>
          {rows}
        </UI.Table>
      </Block>
    )
  }
}

export default connect((state) => ({ ...state.exchange }), {

})(memo(Balances));
