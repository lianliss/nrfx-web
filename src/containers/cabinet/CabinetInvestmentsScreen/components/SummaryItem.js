import React from 'react';

import * as utils from '../../../../utils';

export default function SummaryItem({ currency }) {
  return (
    <div className="Investments__summary__item Content_box">
      <div className="Investments__summary__item__icon" />
      <InfoRow label="Invested">120.7050 {currency}</InfoRow>
      <InfoRow label="Profit" highlighted>120.7050 {currency}</InfoRow>
      <InfoRow label="Paid" highlighted>120.7050 {currency}</InfoRow>
    </div>
  )
}

function InfoRow({ label, children, highlighted }) {
  return (
    <div className="Investments__summary__item__info_row">
      <div className="Investments__summary__item__info_row__label">{label}</div>
      <div className={utils.classNames({
        Investments__summary__item__info_row__value: true,
        highlighted: !!highlighted
      })}>{children}</div>
    </div>
  )
}
