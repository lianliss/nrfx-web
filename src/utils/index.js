import React, { useEffect, useRef } from 'react';

import store from '../store';
import router from '../router';

export function classNames() {
  let result = [];

  [].concat(Array.prototype.slice.call(arguments)).forEach(function (item) {
    if (!item) {
      return;
    }
    switch (typeof item === 'undefined' ? 'undefined' : typeof item) {
      case 'string':
        result.push(item);
        break;
      case 'object':
        Object.keys(item).forEach(function (key) {
          if (item[key]) {
            result.push(key);
          }
        });
        break;
      default:
        result.push('' + item);
    }
  });

  return result.join(' ');
}

export function getLang(key) {
  return store.getState().default.lang[key];
}

export const nl2br = text => text.split('\\n').map((item, i) => <span key={i}>{item}<br /></span>);

export const isEmail = (email) => (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) ? true : false;

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const formatNumber = (num, minimumFractionDigits = 2, maximumFractionDigits = 2) => {
  if (num) {
    return num.toLocaleString(undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )
  }

  return null;
};

export function ucfirst(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function formatDouble(input) {
  return Math.floor(input * 100000) / 100000;
}

export function makeModalParams(modal, params) {
  let result = Object.assign({}, router.getState().params);
  result = { ...result, modal, ...params  };
  return result;
}
