import React from 'react';
import UI from '../../../../ui';
import * as utils from '../../../../utils';
import EmptyContentBlock from '../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock';

export default function TableOfPartners({partners, adaptive}) {
  if (!partners.length) {
    return (
      <EmptyContentBlock
        adaptive={adaptive}
        icon={require('../../../../asset/120/invite.svg')}
        message={utils.getLang('global_inviteDescription')}
        button={{
          text: utils.getLang('global_invite'),
          onClick: e => {}
        }}
      />
    )
  }

  let headings = [
    <UI.TableColumn>
      Partner
    </UI.TableColumn>,
    <UI.TableColumn align="right">
      Profit
    </UI.TableColumn>,
    <UI.TableColumn align="right" style={{width: 100}}>
      Date
    </UI.TableColumn>
  ];

  const rows = partners.map((item, i) => {
    return (
      <UI.TableCell key={i}>
        <UI.TableColumn>
          {'Username'.toUpperCase()}
        </UI.TableColumn>
        <UI.TableColumn align="right">
          20 098 BTC
        </UI.TableColumn>
        <UI.TableColumn align="right" style={{width: 100}}>
          12 Dec 2012
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
