import React from 'react';
import moment from 'moment/min/moment-with-locales';
import SVG from 'react-inlinesvg';
import UI from '../../../../ui';

import * as utils from '../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as actions from '../../../../actions';

export default function HistoryTable({ history }) {
  if (!history.length) {
    return (
      <EmptyContentBlock
        icon={require('../../../../asset/120/no_deposits.svg')}
        message="No Profit History"
      />
    )
  }

  const headings = [
    <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
      <SVG src={require('../../../../asset/cabinet/filter.svg')} />
    </UI.TableColumn>,
    <UI.TableColumn>Address/Login</UI.TableColumn>,
    <UI.TableColumn align="right">Amount</UI.TableColumn>,
    <UI.TableColumn>Wallet</UI.TableColumn>,
    <UI.TableColumn>Type</UI.TableColumn>,
    <UI.TableColumn>Date</UI.TableColumn>,
  ];

  const rows = history.map((item, i) => {
    let status;
    if (item.category === 'send' && item.status === 'pending') {
      status = 'Confirmation';
    } else {
      status = item.category === 'send' ? 'Sent' : 'Received';
    }

    let address = utils.clipTextMiddle(item.address) || 'Unknown';
    if (item.type === 'transfer') {
      address = address.toUpperCase();
    }

    return (
      <UI.TableCell key={i} onClick={() => actions.openModal('transaction', { id: item.id, type: item.type })}>
        <UI.TableColumn align="center">
          <div className={utils.classNames({
            Wallets__history_indicator: true,
            [item.status]: true
          })} />
        </UI.TableColumn>
        <UI.TableColumn>
          <div className="Wallets__history__address">
            {item.type === 'transfer' && <div className="Wallets__history__bb" />}
            <div title={item.address}>{address}</div>
          </div>
        </UI.TableColumn>
        <UI.TableColumn>{utils.formatDouble(item.amount)}</UI.TableColumn>
        <UI.TableColumn>{item.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn>
          <div className={utils.classNames({
            Wallets__history__status: true,
            [item.status]: true,
            [item.category]: true
          })}>{status}</div>
        </UI.TableColumn>
        <UI.TableColumn>{moment(item.created_at).format('DD MMM YYYY h:mm a')}</UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <UI.Table headings={headings}>
      {rows}
    </UI.Table>
  )
}