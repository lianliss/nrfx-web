import './ActionSheet.less';
import { classNames as cn } from '../../utils/index';

import React, { Component } from 'react';
import SVG from 'react-inlinesvg';

export default class ActionsSheet extends React.Component {

  state = {
    visible: false,
  };

  toggle = visible => {
    this.setState({ visible });
    if (visible) {
      document.addEventListener('click', this.__handleClick, false);
      document.addEventListener("keydown", this.__handleClickEsc, false);
    } else {
      document.removeEventListener('click', this.__handleClick, false);
      document.removeEventListener("keydown", this.__handleClickEsc, false);
    }
  };

  __handleClick  = () => {
    this.toggle(false);
  };

  __handleClickEsc = e => {
    if(e.keyCode === 27) {
      this.toggle(false);
    }
  };

  render() {
    const { props, state } = this;

    return (
      <div className={cn("ActionsSheet", props.position, { visible: state.visible, disabled: !props.items.length })}>
        <div onClick={() => this.toggle(true)}>{props.children || (
          <SVG src={require('../../../asset/24px/menu-more.svg')} />
        )}</div>
        <div className="ActionsSheet__list Content_box">
          {props.items.map(item => (
            <div className={cn('ActionsSheet__item', item.type)} onClick={e => {
              item.onClick();
              this.toggle(false);
            }}>{item.title}</div>
          ))}
        </div>
      </div>
    )
  }
}