import React from 'react';
import { Web3Context } from 'services/web3Provider';

// Components
import { Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'utils';
import { getLang } from 'utils';

// Styles
import styles from './TransactionLink.module.less';

function TransactionLink({ tx_hash }) {
  const context = React.useContext(Web3Context);

  return (
    <div className={styles.TransactionLink}>
      <a
        className={cn({ disabled: !tx_hash })}
        href={`${_.get(
          context,
          'network.scan',
          'https://bscscan.com'
        )}/tx/${tx_hash}`}
        target="_blank"
      >
        {getLang('dapp_global_link')}
        <div className={styles.TransactionLink__icon}>
          <SVG src={require('src/asset/icons/action/export-light-bg.svg')} />
        </div>
      </a>
    </div>
  );
}

export default TransactionLink;
