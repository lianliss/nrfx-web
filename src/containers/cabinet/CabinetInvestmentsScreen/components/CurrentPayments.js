import React from 'react';
import UI from '../../../../ui';

import * as utils from '../../../../utils';
import * as modalGroupActions from "../../../../actions/modalGroup";
import * as actions from '../../../../actions';
import { ReactComponent as WithdrawSvg } from '../../../../asset/24px/withdraw.svg';

export default function CurrentPayments({ payments }) {
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
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang('global_available')}
    </UI.TableColumn>,
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
          {item.invested_amount + ' ' + currency}
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {item.profit}
        </UI.TableColumn>
        <UI.TableColumn align="right">
          {item.available}
        </UI.TableColumn>
        <UI.TableColumn align="right" style={{ width: 20, position: 'relative' }}>
          <UI.Button key="button" type="secondary" size="small" style={{width: 15}} onClick={() => modalGroupActions.openModalPage('withdrawal', { currency })}>
            <WithdrawSvg />
          </UI.Button>
        </UI.TableColumn>
      </UI.TableCell>
    )
  });

  return [
    <div>
      <UI.Table headings={headings} header={utils.getLang('global_current')}>
        {rows}
      </UI.Table>
    </div>
  ]
}