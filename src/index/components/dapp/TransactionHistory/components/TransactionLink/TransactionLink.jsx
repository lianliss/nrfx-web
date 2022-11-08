import React from 'react';

// Components
import { Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'utils';
import { getLang } from 'utils';

// Styles
import './TransactionLink.less';

function TransactionLink({ tx_hash }) {
  return (
    <div className="TransactionHistory__TransactionLink">
      <a
        className={cn({ disabled: !tx_hash })}
        href={`https://bscscan.com/tx/${tx_hash}`}
        target="_blank"
      >
        {getLang('dapp_global_link')}
        <div className="TransactionHistory__icon-export">
          <SVG src={require('src/asset/icons/action/export-light-bg.svg')} />
        </div>
      </a>
    </div>
  );
}

export default TransactionLink;