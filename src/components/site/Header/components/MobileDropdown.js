import React, { useState } from 'react';
import SVG from 'react-inlinesvg';


function MobileDropdown({ title, subItems, onChange }) {
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
                  <a
                    key={item.title}
                    className="SiteHeader__mobileDropdown__link"
                    href={`/#/${item.route}`}
                  >
                    {item.title}
                  </a>
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