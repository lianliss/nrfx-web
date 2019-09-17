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

    item.localId = i + 1;
    return (
      <UI.TableCell key={item.id} onClick={() => {modalGroupActions.openModalPage('deposit_info', {
        deposit: JSON.stringify(item)
      })}}>
        <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
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
        </UI.TableColumn>
        <UI.TableColumn>{utils.formatTableId(deposits.length - i)}</UI.TableColumn>
        <UI.TableColumn>{utils.ucfirst(item.type)}</UI.TableColumn>
        <UI.TableColumn sub={item.description}>{item.percent}%</UI.TableColumn>
        <UI.TableColumn align="right">{item.amount} {item.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn sub={`${item.passed_days} / ${item.days} Days`} align="right">10 {item.currency.toUpperCase()}</UI.TableColumn>
      </UI.TableCell>
    )
  });

  return (
    <UI.Table headings={headings}>
      {rows}
    </UI.Table>
  )
}
