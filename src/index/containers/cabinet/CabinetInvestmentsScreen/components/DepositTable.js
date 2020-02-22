import React from 'react';
import * as UI from '../../../../../ui';

import * as utils from '../../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';
import * as actions from "../../../../../actions";

export default function WithdrawalTable({ deposits, adaptive, fromPartners, skipContentBox }) {
  if (!deposits.length) {
    return (
      <EmptyContentBlock
        adaptive={adaptive}
        icon={require('../../../../../asset/120/no_deposits.svg')}
        message={utils.getLang('cabinet_noOpenDeposits')}
        button={{
          text: utils.getLang('global_startInvest'),
          onClick: () => actions.openModal('open_deposit')
        }}
      />
    )
  }

  let headings = [
    <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
      {/*<SVG src={require('../../../../../asset/cabinet/filter.svg')} />*/}
    </UI.TableColumn>,
    <UI.TableColumn>ID</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang('cabinet_wallets_historyTable_type')}</UI.TableColumn>,
    <UI.TableColumn>{utils.getLang('rate')}</UI.TableColumn>,
    <UI.TableColumn align="right">{utils.getLang('cabinet_profileScreen_invested')}</UI.TableColumn>,
  ];

  if (fromPartners) {
    headings.push(
      <UI.TableColumn>{utils.getLang('cabinet_partners_userProfit')}</UI.TableColumn>,
      <UI.TableColumn>{utils.getLang('cabinet_partners_agentProfit')}</UI.TableColumn>
    );
  } else {
    headings.push(<UI.TableColumn align="right">{utils.getLang('cabinet_investmentsScreen_profit')}</UI.TableColumn>);
  }

  if (adaptive) {
    headings = [
      <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
        {/*<SVG src={require('../../../../../asset/cabinet/filter.svg')} />*/}
      </UI.TableColumn>,
      <UI.TableColumn sub={
        <div>{utils.getLang('rate')} / {utils.getLang('cabinet_wallets_historyTable_type')}</div>
      }>
        <div>{utils.getLang('cabinet_profileScreen_invested')}</div>
      </UI.TableColumn>,
      <UI.TableColumn align="right" sub={<>{utils.getLang('global_days')}/ID</>}>
        {utils.getLang('cabinet_investmentsScreen_profit')}
      </UI.TableColumn>,
    ];
  }

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

    if (adaptive) {
      return (
        <UI.TableCell key={item.id} onClick={() => {actions.openModal('deposit_info', {
          depositId: item.id
        })}}>
          <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
            {icon}
          </UI.TableColumn>
          <UI.TableColumn align="left" sub={`${item.percent}% ${item.description} ${item.type !== 'pool' ? utils.ucfirst(item.type) : ''}`}>
            {utils.formatDouble(item.amount)} {item.currency.toUpperCase()}
          </UI.TableColumn>
          <UI.TableColumn
            sub={<>{item.passed_days} / {item.days} {utils.getLang('global_days', true)} / {utils.formatTableId(deposits.length - i)}</>}
            align="right">{utils.formatDouble(item.profit)} {item.currency.toUpperCase()}</UI.TableColumn>
        </UI.TableCell>
      )
    }

    let onClick = false;
    if (!fromPartners) {
      onClick = () => actions.openModal('deposit_info', {
        depositId: item.id
      });
    }

    return (
      <UI.TableCell key={item.id} onClick={onClick}>
        <UI.TableColumn align="center" highlighted style={{ width: 40 }}>
          {icon}
        </UI.TableColumn>
        <UI.TableColumn>{utils.formatTableId(deposits.length - i)}</UI.TableColumn>
        <UI.TableColumn>{utils.ucfirst(item.type)}</UI.TableColumn>
        {item.type === 'pool' ? (
          <UI.TableColumn>-</UI.TableColumn>
        ) : (
          <UI.TableColumn sub={item.description}>{item.plan_percent}%</UI.TableColumn>
        )}
        <UI.TableColumn align="right">{utils.formatDouble(item.amount)} {item.currency.toUpperCase()}</UI.TableColumn>
        <UI.TableColumn
          sub={<>{item.passed_days} / {item.days} {utils.getLang('global_days')}</>}
          align={fromPartners ? 'left' : 'right'}>{utils.formatDouble(item.profit)} {item.currency.toUpperCase()}</UI.TableColumn>
        {fromPartners && <UI.TableColumn>{utils.formatDouble(item.agent_profit)} {item.currency.toUpperCase()}</UI.TableColumn>}
      </UI.TableCell>
    )
  });

  return (
    <UI.Table headings={headings} skipContentBox={skipContentBox}>
      {rows}
    </UI.Table>
  )
}
