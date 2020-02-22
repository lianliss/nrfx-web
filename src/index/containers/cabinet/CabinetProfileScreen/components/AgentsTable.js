import React from 'react';
import * as UI from '../../../../../ui';

import * as utils from '../../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as actions from '../../../../../actions';

export default function AgentsTable({ agents, adaptive }) {
  if (!agents.length) {
    return (
      <EmptyContentBlock
        adaptive={adaptive}
        icon={require('../../../../../asset/120/invite.svg')}
        message="Here will be a list of your partners"
      />
    )
  }

  let headings = [
    <UI.TableColumn>
      Agent
    </UI.TableColumn>,
    <UI.TableColumn>
      Customers
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      Profit Summary
    </UI.TableColumn>,
    <UI.TableColumn align="right" style={{width: 100}}>
      Date
    </UI.TableColumn>
  ];

  if (adaptive) {
    headings = [
      <UI.TableColumn sub="Partners">
        Agent
      </UI.TableColumn>,
      <UI.TableColumn sub="Date">
        Profit
      </UI.TableColumn>,
    ];
  }

  let rows;
  if (adaptive) {
    rows = agents.map((item, i) => {
      return (
        <UI.TableCell key={i} onClick={() => actions.openModal('partner_info', { login: item.user.login })}>
          <UI.TableColumn sub={item.partners_count}>
            {item.user.login.toUpperCase()}
          </UI.TableColumn>
          <UI.TableColumn align="right" sub={utils.dateFormat(item.created_at, 'DD MMM YYYY')}>
            ~{utils.formatDouble(item.profit, 2)} USD
          </UI.TableColumn>
        </UI.TableCell>
      )
    });
  } else {
    rows = agents.map((item, i) => {
      return (
        <UI.TableCell key={i} onClick={() => actions.openModal('partner_info', { login: item.user.login })}>
          <UI.TableColumn>
            {item.user.login.toUpperCase()}
          </UI.TableColumn>
          <UI.TableColumn>
            {item.partners_count}
          </UI.TableColumn>
          <UI.TableColumn align="right">
            ~{utils.formatDouble(item.profit, 2)} USD
          </UI.TableColumn>
          <UI.TableColumn align="right" style={{width: 100}}>
            {utils.dateFormat(item.created_at, 'DD MMM YYYY')}
          </UI.TableColumn>
        </UI.TableCell>
      )
    });
  }

  return (
    <UI.Table headings={headings}>
      {rows}
    </UI.Table>
  )
}
