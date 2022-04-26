import React from 'react';

import { classNames as cn } from 'src/utils/index';
import SVG from 'utils/svg-wrap';

import './SidebarItem.less';

function SidebarItem({ title, icon, children, onClick, active }) {
  const className = cn({ SidebarItem: true, active, haveChild: children });

  return (
    <>
      <li onClick={onClick} className={className}>
        <div className="SidebarItem__content">
          {icon && (
            <div className="SidebarItem__icon">
              <SVG
                src={require(`src/asset/icons/cabinet/sidebar/${icon}.svg`)}
              />
            </div>
          )}
          <span>{title}</span>
          {active && (
            <div className="SidebarItem__arrow">
              <SVG
                src={require(`src/asset/icons/cabinet/sidebar/list-arrow-right.svg`)}
              />
            </div>
          )}
        </div>
        <div>{children && children}</div>
      </li>
    </>
  );
}

export default SidebarItem;
