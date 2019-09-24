import './FloatingButton.less';
import React, { useState } from 'react';
import { classNames } from '../../utils';
import SVG from 'react-inlinesvg';
import * as utils from '../../utils/index'

export default function FloatingButton(props) {

  const [opened, open] = useState(false);

  return (
    <div className={utils.classNames("FloatingButton", { opened })}>
      <div className="FloatingButton__menu">{props.children}</div>
      <div className="FloatingButton__button" onClick={() => {
        open(!opened);
      }}>
        <SVG src={props.icon} />
      </div>
    </div>
  )
}

export function FloatingButtonItem(props) {
  return (
    <div className="FloatingButton__menu__item">
      <span>{props.children}</span>
      <SVG src={props.icon} />
    </div>
  )
}