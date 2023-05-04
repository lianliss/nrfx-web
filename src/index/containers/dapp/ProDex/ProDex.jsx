import React from 'react';
import { useSelector } from 'react-redux';

import DexSwap from '../DexSwap/DexSwap';
import TradingViewWidget from 'dapp/TradingViewWidget/TradingViewWidget';
import { Row, SwitchTabs } from 'ui';
import HistoryTable from './components/HistoryTable/HistoryTable';

import router from 'src/router';
import { adaptiveSelector, dappSwapSelector } from 'src/selectors';
import { DAPP_TRANSACTION_HISTORY } from 'src/index/constants/pages';
import KNOWN_FIATS from '../../../constants/knownFiats';

import styles from './ProDex.module.less';

const ProDex = () => {
  const adaptive = useSelector(adaptiveSelector);
  const dappSwap = useSelector(dappSwapSelector);
  const [page, setPage] = React.useState('swap');

  const showMarketPage = !adaptive || page === 'market';
  const showSwapPage = !adaptive || page === 'swap';

  const handlePageChange = (newPage) => {
    if (page === newPage) return;
    if (newPage === 'history') {
      router.navigate(DAPP_TRANSACTION_HISTORY);
    }

    setPage(newPage);
  };

  return (
    <div className={styles.ProDex}>
      {adaptive && (
        <SwitchTabs
          selected={page}
          onChange={handlePageChange}
          type="secondary-alice"
          tabs={[
            { value: 'market', label: 'Market' },
            { value: 'swap', label: 'Swap' },
            { value: 'history', label: 'History' },
          ]}
        />
      )}
      {/* <Row alignItems="stretch" gap={17}>
        {showMarketPage && (
          <div className={styles.tradingViewWidget}>
            <TradingViewWidget
              height={adaptive ? 460 : 554}
              coins={[dappSwap.from, dappSwap.to]}
            />
          </div>
        )}
        {showSwapPage && (
          <div className={styles.dexSwap}>
            <DexSwap />
          </div>
        )}
      </Row> */}
      {!adaptive && (
        <div className={styles.tradeHistory__wrapper}>
          <h2>Trade history</h2>
          <HistoryTable
            coin="USD"
          />
        </div>
      )}
    </div>
  );
};

export default ProDex;
