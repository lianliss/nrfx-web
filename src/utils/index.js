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

export function getLanguage() {
  return store.getState();
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

export function throttle(func, ms) {
  let isThrottled = false,
    savedArgs,
    savedThis;
  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments);
    isThrottled = true;
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
}

export function ucfirst(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

export function formatDouble(input, delim = 100000) {
  return Math.floor(input * delim) / delim;
}

export function formatTableId(index) {
  const lenght = `${index}`.length;
  const minLenght = 3;
  const need = minLenght - lenght;

  if (need <= 0) {
    return index;
  }

  let arr = new Array(need).fill(0);
  arr.push(index);
  return arr.join('');
}

export function makeModalParams(modal, params) {
  let result = Object.assign({}, router.getState().params);
  result = { ...result, modal, ...params  };
  return result;
}

export function clipTextMiddle(text, length = 10) {
  if (text.length <= length + length / 2) {
    return text;
  }

  let parts = [text.substr(0, length), '...', text.substr(-length / 2)];
  return parts.join('');
}

export function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
}

export function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

export function switchMatch(key, node) {
  const __DEFAULT__ = 'default';
  switch (typeof node) {
    case 'object': {
      if (node.hasOwnProperty(key)) {
        return node[key];
      } else {
        if (node.hasOwnProperty(__DEFAULT__)) {
          switch (typeof node[__DEFAULT__]) {
            case 'function': {
              return node[__DEFAULT__]();
            }
            default: return node[__DEFAULT__];
          }
        } else {
          return key;
        }
      }
    }
  }
}

export function copyText(text) {
  const input = document.createElement('input');
  input.value = text;
  input.style = {
    position: 'fixed',
    top: '-10px',
    right: '-10px',
    width: 1,
    height: 1
  };

  document.body.appendChild(input);
  input.select();

  document.execCommand("copy");

  document.body.removeChild(input);
}