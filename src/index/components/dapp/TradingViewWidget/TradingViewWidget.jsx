// TradingViewWidget.jsx

import React, { useState, useEffect, useRef } from 'react';
import { getUniqId } from 'utils';

import styles from './TradingViewWidget.module.less';

let tvScriptLoadingPromise;

function TradingViewWidget() {
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
        new window.TradingView.widget({
          width: 'auto',
          height: 554,
          symbol: 'NASDAQ:AAPL',
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          container_id: elementId,
        });
      }
    }
  }, []);

  return (
    <div className={styles.TradingViewWidgetContainer}>
      <div id={elementId} />
    </div>
  );
}

export default TradingViewWidget;
