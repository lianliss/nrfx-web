import React from 'react';
import UI from '../../../../ui';

import * as utils from '../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as modalGroupActions from "../../../../actions/modalGroup";
import SVG from "react-inlinesvg";

export default function WithdrawalTable({ deposits }) {
  if (!deposits.length) {
    return (
      <EmptyContentBlock
        icon={require('../../../../asset/120/no_deposits.svg')}
        message="No Open Deposits"
        button={{
          text: 'Start Invest',
          onClick: () => modalGroupActions.openModalPage('open_deposit')
        }}
      />
    )
  }

  const headings = [
    <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
      <SVG src={require('../../../../asset/cabinet/filter.svg')} />
    </UI.TableColumn>,
    <UI.TableColumn>ID</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang('cabinet_wallets_historyTable_type')}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang('rate')}</UI.TableColumn>,
    <UI.TableColumn align="right">{utils.getLang('cabinet_profileScreen_invested')}</UI.TableColumn>,
    <UI.TableColumn align="right">{utils.getLang('Profit')}</UI.TableColumn>,
  ];

  const rows = deposits.map((item, i) => {
    const progress = Math.max(0.01, item.passed_days / item.days);
    const pathLength = 69.12472534179688;
    const offset = pathLength * progress;
    const color = progress >= 1 ? '#BFBFBF' : '#24B383';


    let icon;
    if (progress >= 1) {
      icon = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12ZM21.6 12C21.6 17.3019 17.3019 21.6 12 21.6C6.69807 21.6 2.4 17.3019 2.4 12C2.4 6.69807 6.69807 2.4 12 2.4C17.3019 2.4 21.6 6.69807 21.6 12Z" fill="#A1A1A1"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M16.7071 9.29289C16.3166 8.90237 15.6834 8.90237 15.2929 9.29289L11 13.5858L8.70711 11.2929C8.31658 10.9024 7.68342 10.9024 7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071L9.58579 15C10.3668 15.781 11.6332 15.7811 12.4142 15L16.7071 10.7071C17.0976 10.3166 17.0976 9.68342 16.7071 9.29289Z" fill="#A1A1A1"/>
        </svg>
      );
    } else {
      icon = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.2" d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z" stroke="#24B383" strokeWidth="2"/>
          <path
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
            d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength - offset}
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )
    }

    item.localId = deposits.length - i;
    return (
      <UI.TableCell key={item.id} onClick={() => {modalGroupActions.openModalPage('deposit_info', {
        deposit: JSON.stringify(item)
      })}}>
        <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
          {icon}
        </UI.TableColumn>
        <UI.TableColumn>{utils.formatTableId(deposits.length - i)}</UI.TableColumn>
        <UI.TableColumn>{utils.ucfirst(item.type)}</UI.TableColumn>
        <UI.TableColumn sub={item.description}>{item.percent}%</UI.TableColumn>
        <UI.TableColumn align="right">{utils.formatDouble(item.amount)} {item.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn
          sub={`${item.passed_days} / ${item.days} ${utils.getLang('global_days')}`}
          align="right">{utils.formatDouble(item.profit)} {item.currency.toUpperCase()}</UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <UI.Table headings={headings}>
      {rows}
    </UI.Table>
  )
}
