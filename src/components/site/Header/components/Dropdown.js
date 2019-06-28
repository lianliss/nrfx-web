import React, { useState } from 'react';
import SVG from 'react-inlinesvg';


function Dropdown({ title, subItems, onChange }) {
  const [isOpen, toggle] = useState(false);

  const handleLinkClick = (value) => {
    onChange(value);
    toggle(false);
  }

  return (
    <div className="SiteHeader__dropdown" onMouseEnter={() => toggle(true)} onClick={() => toggle(true)} onMouseLeave={() => toggle(false)}>
      <div className="SiteHeader__menu__item" >
        {title}
        <SVG src={require('../../../../asset/menu_arrow.svg')} />
      </div>

      {isOpen
        ? (
          <div className="SiteHeader__dropdown__items" onMouseEnter={() => toggle(true)}>
            {subItems.map(item => {
              if (item.route) {
                return (
                  <a key={item.title} className="SiteHeader__dropdown__link" href={`/#/${item.route}`}>{item.title}</a>
                )
              } else {
                return (
                  <p key={item.title} className="SiteHeader__dropdown__link" onClick={() => handleLinkClick(item.value)}>{item.title}</p>
                )
              }
            }
            )}
          </div>
        ) : null}

    </div>
  )
}

export default React.memo(Dropdown);