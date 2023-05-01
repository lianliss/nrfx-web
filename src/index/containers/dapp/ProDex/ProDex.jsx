import React from 'react';
import { useSelector } from 'react-redux';

import DexSwap from '../DexSwap/DexSwap';
import TradingViewWidget from 'dapp/TradingViewWidget/TradingViewWidget';
import { Row, SwitchTabs } from 'ui';
import HistoryTable from './components/HistoryTable/HistoryTable';

import { adaptiveSelector, dappSwapSelector } from 'src/selectors';
import KNOWN_FIATS from '../../../constants/knownFiats';

import styles from './ProDex.module.less';

const ProDex = () => {
  const adaptive = useSelector(adaptiveSelector);
  const dappSwap = useSelector(dappSwapSelector);
  const [page, setPage] = React.useState('swap');

  const showMarketPage = !adaptive || page === 'market';
  const showSwapPage = !adaptive || page === 'swap';

  return (
    <div className={styles.ProDex}>
      {adaptive && (
        <SwitchTabs
          selected={page}
          onChange={setPage}
          type="secondary-alice"
          tabs={[
            { value: 'market', label: 'Market' },
            { value: 'swap', label: 'Swap' },
            { value: 'history', label: 'History' },
          ]}
        />
      )}
      <Row alignItems="stretch" gap={17}>
        {showMarketPage && (
          <div className={styles.tradingViewWidget}>
            <TradingViewWidget
              height={adaptive ? 460 : 554}
              chartSymbol={`${dappSwap.from.symbol}-${dappSwap.to.symbol}`}
            />
          </div>
        )}
        {showSwapPage && (
          <div className={styles.dexSwap}>
            <DexSwap />
          </div>
        )}
      </Row>
      {!adaptive && (
        <div className={styles.tradeHistory__wrapper}>
          <h2>Trade history</h2>
          <HistoryTable
            coin="USD"
            items={[
              {
                currency: {
                  source_token: KNOWN_FIATS[0],
                  target_token: KNOWN_FIATS[1],
                  source_amount: 0.56666,
                  target_amount: 1600000,
                },
                coinRate: 143.7,
                time: '15 sec',
                tx_hash: 'test',
              },
              {
                currency: {
                  source_token: KNOWN_FIATS[0],
                  target_token: KNOWN_FIATS[1],
                  source_amount: 0.56666,
                  target_amount: 1600000,
                },
                coinRate: 143.7,
                time: '15 sec',
                tx_hash: 'tes2t',
              },
              {
                currency: {
                  source_token: KNOWN_FIATS[0],
                  target_token: KNOWN_FIATS[1],
                  source_amount: 0.56666,
                  target_amount: 1600000,
                },
                coinRate: 143.7,
                time: '15 sec',
                tx_hash: 'te3st',
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default ProDex;
