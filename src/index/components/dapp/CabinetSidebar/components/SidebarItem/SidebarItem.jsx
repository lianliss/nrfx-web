import React from 'react';

import { classNames as cn } from 'src/utils/index';
import SVG from 'utils/svg-wrap';

import './SidebarItem.less';

function SidebarItem({
  title,
  icon,
  children,
  onClick,
  active,
  href,
  disabled,
}) {
  const [childIsVisible, setChildIsVisible] = React.useState(active);
  const className = cn({
    SidebarItem: true,
    // If have children list and list is visible, or this is just title that have active class
    active: (children && childIsVisible) || (!children && active),
    haveChild: children,
    disabled,
  });

  const handleClick = () => {
    onClick();

    if (children) {
      setChildIsVisible((prev) => !prev);
    }
  };

  return (
    <>
      <li className={className}>
        <div className="SidebarItem__content" onClick={handleClick}>
          {icon && (
            <div className="SidebarItem__icon">
              <SVG
                src={require(`src/asset/icons/cabinet/sidebar/${icon}.svg`)}
              />
            </div>
          )}
          <span>
            {href ? (
              <a href={href} target="_blank">
                {title}
              </a>
            ) : (
              title
            )}
          </span>
          {children && (
            <div
              className={cn({
                SidebarItem__arrow: true,
                active: childIsVisible,
              })}
            >
              <SVG
                src={require(`src/asset/icons/cabinet/sidebar/list-arrow-right.svg`)}
              />
            </div>
          )}
        </div>
        {children && childIsVisible && (
          <div className="SidebarItem__children">{children}</div>
        )}
      </li>
    </>
  );
}

SidebarItem.defaultProps = {
  onClick: () => {},
  title: '',
  icon: null,
  active: false,
  href: null,
  disabled: false,
};

export default React.memo(SidebarItem);
