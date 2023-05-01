import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { getUniqId } from 'utils';
import { currentLangSelector } from 'src/selectors';

import styles from './TradingViewWidget.module.less';

let tvScriptLoadingPromise;

function TradingViewWidget({ coins }) {
  const lang = useSelector(currentLangSelector);
  const onLoadScriptRef = useRef();
  const [elementId] = useState(getUniqId().toString());

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (document.getElementById(elementId) && 'TradingView' in window) {
        const widget = new window.TradingView.widget({
          autosize: true,
          symbol: coins[0].symbol + '-' + coins[1].symbol,
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: lang,
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_side_toolbar: false,
          container_id: elementId,
        });
      }
    }
  }, [coins, lang]);

  return (
    <div className={styles.TradingViewWidgetContainer}>
      <div id={elementId} />
    </div>
  );
}

export default TradingViewWidget;
