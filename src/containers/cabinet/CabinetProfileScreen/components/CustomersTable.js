import React from 'react';
import UI from '../../../../ui';
import moment from 'moment/min/moment-with-locales';

import * as utils from '../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as actions from '../../../../actions';

export default function CustomersTable({ customers, adaptive }) {
  if (!customers.length) {
    return (
      <EmptyContentBlock
        adaptive={adaptive}
        icon={require('../../../../asset/120/invite.svg')}
        message="Here will be a list of your partners"
      />
    )
  }

  let headings = [
    <UI.TableColumn>
      Customers
    </UI.TableColumn>,
    <UI.TableColumn>
      Deposits
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      Profit Summary
    </UI.TableColumn>,
    <UI.TableColumn align="right" style={{width: 100}}>
      Date
    </UI.TableColumn>
  ];

  const rows = customers.map((item, i) => {
    return (
      <UI.TableCell key={i} onClick={() => actions.openModal('partner_info', { id: item.user.id })}>
        <UI.TableColumn>
          {item.user.login.toUpperCase()}
        </UI.TableColumn>
        <UI.TableColumn>
          {item.deposits_count}
        </UI.TableColumn>
        <UI.TableColumn align="right">
          ~{utils.formatDouble(item.profit, 2)} USD
        </UI.TableColumn>
        <UI.TableColumn align="right" style={{width: 100}}>
          {moment(item.user.created_at).format('DD MMM YYYY')}
        </UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <UI.Table headings={headings}>
      {rows}
    </UI.Table>
  )
}
