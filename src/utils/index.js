//styles
// external
import React, { useEffect, useRef } from 'react';
// internal
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

export function removeProperty(object, ...properties) {
  let newObject = Object.assign({}, object);
  for (let property of properties) {
    delete newObject[property];
  }
  return newObject;
}

export function getLang(key) {
  return store.getState().default.lang[key];
}

export function getLanguage() {
  return store.getState();
}

export const nl2br = text => text.split('\\n').map((item, i) => <span key={i}>{item}<br /></span>);

export const isEmail = (email) => (/^[a-zA-Z0-9/.-]+@[a-zA-Z0-9/.-]+\.[A-Za-z]+$/.test(email)) ? true : false;
export const isName = name => /^([a-z\-]{2,20})$/i.test((name||"").toLowerCase())

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

export function formatDouble(input, fractionDigits = 8) {
  return parseFloat(parseFloat(input).toFixed(fractionDigits));
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
  return {
    ...result,
    modal,
    ...params
  };
}

export function InputNumberOnKeyPressHandler(e) {
  if (isNaN(parseInt(e.key))) {
    return e.preventDefault();
  }
}

export function __doubleInputOnKeyPressHandler(e, value = '') {
  switch (e.key) {
    default:
      if (isNaN(parseInt(e.key)) || value.length === 1 && value[0] === '0') {
        e.preventDefault();
      }
      break;
    case '.': {
      return value.length === 0 ? e.preventDefault() : value.indexOf(e.key) > -1 && e.preventDefault();
    }
  }
}

export function clipTextMiddle(text, length = 10) {
  if (text.length <= length + length / 2) {
    return text;
  }

  let parts = [text.substr(0, length), '...', text.substr(-length / 2)];
  return parts.join('');
}

export function switchMatch(key, node) {
  const __DEFAULT__ = 'default';
  switch (typeof node) {
    case 'object': {
      switch (typeof key) {
        case 'boolean':
          return node[key];
        default:
        case 'string': {
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
    default: break;
  }
}

export function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  document.body.appendChild(outer);
  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";
  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);
  const widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return widthNoScroll - widthWithScroll;
}

export function isFiat(currency) {
  return currency.toLowerCase() === 'usdt';
}