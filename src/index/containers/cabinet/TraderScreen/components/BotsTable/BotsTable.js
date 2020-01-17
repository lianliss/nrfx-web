import './BotsTable.less';

import React from 'react';
import UI from '../../../../../../ui';

import EmptyContentBlock from '../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import router from '../../../../../../router';
import * as PAGES from '../../../../../constants/pages';

export default function BotsTable({ bots }) {

  if (!bots.length) {
    return (
      <EmptyContentBlock
        icon={require('../../../../../../asset/120/no_deposits.svg')}
        message="Ботов еще нет :-("
      />
    )
  }

  let headings = [
    <UI.TableColumn style={{width: '48px'}}></UI.TableColumn>,
    <UI.TableColumn>Название</UI.TableColumn>,
    <UI.TableColumn>Position</UI.TableColumn>,
    <UI.TableColumn align="right">amount</UI.TableColumn>,
    <UI.TableColumn align="right">ROE</UI.TableColumn>,
  ];

  const rows = bots.map((item, key) => {
    const roe = item.roe * item.leverage;
    return (
      <UI.TableCell key={key} onClick={() => router.navigate(PAGES.TRADER, { section: 'bot', id: item.id })}>
        <UI.TableColumn><UI.StatusIndicator status={item.status} /></UI.TableColumn>
        <UI.TableColumn>{item.name}</UI.TableColumn>
        <UI.TableColumn>{item.position}</UI.TableColumn>
        <UI.TableColumn align="right">{item.position_amount}</UI.TableColumn>
        <UI.TableColumn align="right"><UI.NumberFormat number={roe} color percent /></UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <UI.Table className="BotsTable" headings={headings} header="Bots">
      {rows}
    </UI.Table>
  )
}
