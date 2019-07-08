import React, { useState } from 'react';
import SVG from 'react-inlinesvg';


function MobileDropdown({ title, subItems, onChange, onNavigate }) {
  const [isOpen, toggle] = useState(false);
  const icon = isOpen ? require('../asset/less.svg') : require('../asset/more.svg');

  const handleLinkClick = (value) => {
    onChange(value);
    toggle(false);
  }

  return (
    <div className="SiteHeader__mobileDropdown" onClick={() => toggle(!isOpen)}>
      <div className="SiteHeader__menu__item" >
        <SVG src={icon} />
        {title}
      </div>

      {isOpen
        ? (
          <div className="SiteHeader__mobileDropdown__items">
            {subItems.map(item => {
              if (item.route) {
                return (
                  <span
                    key={item.title}
                    className="SiteHeader__mobileDropdown__link"
                    onClick={() => onNavigate(item.route)}
                  >
                    {item.title}
                  </span>
                )
              } else {
                return (
                  <p key={item.title} className="SiteHeader__mobileDropdown__link" onClick={() => handleLinkClick(item.value)}>{item.title}</p>
                )
              }
            })}
          </div>
        ) : null}
    </div>
  )
}

export default React.memo(MobileDropdown);