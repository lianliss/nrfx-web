import React from 'react';
import UI from '../../../../ui';
import moment from 'moment/min/moment-with-locales';

import * as utils from '../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';

export default function PartnersTable({partners, adaptive, skipContentBox}) {
  if (!partners.length) {
    return (
      <EmptyContentBlock
        adaptive={adaptive}
        icon={require('../../../../asset/120/invite.svg')}
        message={utils.getLang('cabinet_partners_tableEmpty')}
      />
    )
  }

  let headings = [
    <UI.TableColumn>
      {utils.getLang('cabinet_partner')}
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      {utils.getLang('cabinet_investmentsScreen_profit')}
    </UI.TableColumn>,
    <UI.TableColumn align="right" style={{width: 100}}>
      {utils.getLang('cabinet_wallets_historyTable_date')}
    </UI.TableColumn>
  ];

  if (adaptive) {
    headings = [
      <UI.TableColumn>
        Partner
      </UI.TableColumn>,
      <UI.TableColumn sub={utils.getLang('cabinet_wallets_historyTable_date')} align="right">
        {utils.getLang('cabinet_investmentsScreen_profit')}
      </UI.TableColumn>,
    ];
  }

  let rows;
  if (adaptive) {
    rows = partners.map((item, i) => {
      return (
        <UI.TableCell key={i}>
          <UI.TableColumn>
            {item.user.login.toUpperCase()}
          </UI.TableColumn>
          <UI.TableColumn align="right" sub={moment(item.user.created_at).format('DD MMM YYYY')}>
            ~{utils.formatDouble(item.profit, 2)} USD
          </UI.TableColumn>
        </UI.TableCell>
      )
    });
  } else {
    rows = partners.map((item, i) => {
      return (
        <UI.TableCell key={i}>
          <UI.TableColumn>
            {item.user.login.toUpperCase()}
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
  }

  return (
    <UI.Table headings={headings} skipContentBox={skipContentBox}>
      {rows}
    </UI.Table>
  )
}
