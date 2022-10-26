import React from 'react';

// Components
import { Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './TransactionLink.less';

function TransactionLink({ tx_hash }) {
  return (
    <a
      className={cn({
        TransactionHistory__TransactionLink: true,
        disabled: !tx_hash,
      })}
      href={`https://bscscan.com/tx/${tx_hash}`}
      target="_blank"
    >
      Link
      <div className="TransactionHistory__icon-export">
        <SVG src={require('src/asset/icons/action/export-light-bg.svg')} />
      </div>
    </a>
  );
}

export default TransactionLink;
