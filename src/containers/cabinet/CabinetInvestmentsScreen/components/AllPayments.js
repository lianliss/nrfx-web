import React from 'react';
import UI from '../../../../ui';

import * as utils from '../../../../utils';
import * as actions from '../../../../actions';

export default function CurrentPayments({ payments, adaptive }) {
  if (!payments.length) {
    return <></>;
  }

  const headings = [
    <UI.TableColumn>
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang('global_invested')}
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang('cabinet_investmentsProfit')}
    </UI.TableColumn>
  ];

  const rows = payments.map((item, i) => {
    const currencyInfo = actions.getCurrencyInfo(item.currency);
    const currency = item.currency.toUpperCase();
    return (
      <UI.TableCell key={Math.random()}>
        <UI.TableColumn align="right" style={{ width: 20, position: 'relative' }}>
          <div className="Investments__CurrentPayments__item__icon" style={{backgroundImage: `url(${currencyInfo.icon})`}} />
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {utils.formatDouble(item.total_invested_amount, 6) + ' ' + currency}
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {utils.formatDouble(item.total_profit, 6) || 0}
        </UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <UI.Table hidden={true} adaptive={adaptive} headings={headings} header={utils.getLang('global_for_all_time')}>
      {rows}
    </UI.Table>
  )
}