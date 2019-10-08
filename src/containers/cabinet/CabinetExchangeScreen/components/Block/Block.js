import './Block.less';

import React, { useState } from 'react';

import * as utils from '../../../../../utils';

export default function Block(props) {
  let {
    title,
    tabs,
    selectedTab,
    onTabChange,
    children,
    controls,
    skipCollapse,
    skipPadding
  } = props;

  const [collapsed, setCollapsed] = useState(false);

  const classNames = utils.classNames({
    Exchange__block: true,
    Content_box: true,
    collapsed: !!collapsed && !skipCollapse,
    skip_collapse: !!skipCollapse,
    skip_padding: !!skipPadding
  });

  if (tabs) {
    title = tabs.map(({tag, label}) => {
      const className = utils.classNames({
        Exchange__block__tab: true,
        active: tag === selectedTab,
      });
      return (
        <div
          className={className}
          key={tag}
          onClick={() => onTabChange && onTabChange(tag)}
        >
          <div className="Exchange__block__tab__label">{label}</div>
        </div>
      )
    });

    title = (
      <div className="Exchange__block__tabs">
        {title}
      </div>
    )
  }

  return (
    <div className={classNames}>
      <div className="Exchange__block__head">
        <div className="Exchange__block__title" onClick={(e) => {
          if (!e.target.classList.contains('Exchange__block__tab')) {
            setCollapsed(!collapsed);
          }
        }}>{title}</div>
        <div className="Exchange__block__head__controls">{controls}</div>
      </div>
      <div className="Exchange__block__content">
        {children}
      </div>
    </div>
  )
}
