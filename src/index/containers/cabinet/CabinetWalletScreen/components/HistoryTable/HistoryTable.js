import React from 'react';
import moment from 'moment/min/moment-with-locales';
import SVG from 'react-inlinesvg';
import UI from '../../../../../../ui';

import * as utils from '../../../../../../utils';
import EmptyContentBlock from '../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as modalGroupActions from '../../../../../../actions/modalGroup';

export default function HistoryTable({ history, adaptive, header}) {

  if (!history.length) {
    return (
      <EmptyContentBlock
        icon={require('../../../../../../asset/120/no_deposits.svg')}
        message={utils.getLang('no_transfers_history')}
      />
    )
  }

  let headings = [
    <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
      <SVG src={require('../../../../../../asset/cabinet/filter.svg')} />
    </UI.TableColumn>,
    <UI.TableColumn>{utils.getLang('cabinet_wallets_historyTable_addressLogin')}</UI.TableColumn>,
    <UI.TableColumn align="right">{utils.getLang('cabinet_openNewDeposit_amount')}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang('cabinet_wallets_historyTable_wallet')}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang('cabinet_wallets_historyTable_type')}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang('cabinet_wallets_historyTable_date')}</UI.TableColumn>,
  ];

  if (adaptive) {
    headings = [
      <UI.TableColumn sub={<div>{utils.getLang('cabinet_wallets_historyTable_type')}</div>}>
        <div>{utils.getLang('cabinet_wallets_historyTable_addressLogin')}</div>
      </UI.TableColumn>,
      <UI.TableColumn align="right" sub={<div>{utils.getLang('cabinet_wallets_historyTable_date')}</div>}>
        <div>{utils.getLang('cabinet_openNewDeposit_amount')}</div>
      </UI.TableColumn>,
    ];
  }

  const rows = history.map((item, i) => {
    let status;
    status = item.category === 'send' ? utils.getLang('cabinet_wallets_historyTable_sent') : utils.getLang('cabinet_wallets_historyTable_received');

    let address = utils.clipTextMiddle(item.address) || utils.getLang('cabinet_wallets_historyTable_unknown');
    if (item.type === 'transfer') {
      address = address.toUpperCase();
    }

    const createdAt = utils.dateFormat(item.created_at, null);

    if (adaptive) {
      return (
        <UI.TableCell key={i} onClick={() => modalGroupActions.openModalPage('transaction', {id:item.id, type:item.type})}>
          <UI.TableColumn>
            <div className="Wallets__history__address">
              {item.type === 'transfer' && <div className="Wallets__history__bb" />}
              <div title={item.address}>{address}</div>
            </div>
            <div className={utils.classNames({
              Wallets__history__status: true,
              [item.status]: true,
              [item.category]: true
            })}>{status}</div>
          </UI.TableColumn>
          <UI.TableColumn align="right">
            <div>{utils.formatDouble(item.amount)} {item.currency.toUpperCase()}</div>
            <div className="Wallets__history__date">{utils.dateFormat(item.created_at)}</div>
          </UI.TableColumn>
        </UI.TableCell>
      )
    }

    return (
      <UI.TableCell key={i} onClick={() => modalGroupActions.openModalPage('transaction', {id:item.id, type:item.type})}>
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
        <UI.TableColumn align="right">{utils.formatDouble(item.amount)}</UI.TableColumn>
        <UI.TableColumn>{item.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn>
          <div className={utils.classNames({
            Wallets__history__status: true,
            [item.status]: true,
            [item.category]: true
          })}>{status}</div>
        </UI.TableColumn>
        <UI.TableColumn>
          <div className="Wallets__history__date">
            {createdAt.format('DD MMM YYYY')} <br />
            {createdAt.format('HH:mm')}
          </div>
        </UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <UI.Table headings={headings} header={header}>
      {rows}
    </UI.Table>
  )
}