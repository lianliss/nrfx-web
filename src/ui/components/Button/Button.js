import React from 'react';
import { classNames } from '../../utils';
import './Button.less';

export default function Button(props) {
  const className = classNames({
    Button: true,
    red: props.type === 'red'
  });
  return (
    <div
      className={className}
      onClick={() => props.onClick && props.onClick()}
    >{props.children}</div>
  )
}
