import React, { useState } from 'react';
import SVG from 'react-inlinesvg';


function Dropdown({ title, subItems }) {
  const [isOpen, toggle] = useState(false);

  return (
    <div className="SiteHeader__dropdown" onMouseEnter={() => toggle(true)} onMouseLeave={() => toggle(false)}>
      <div className="SiteHeader__menu__item" >
        {title}
        <SVG src={require('../../../../asset/menu_arrow.svg')} />
      </div>

      {isOpen
        ? (
          <div className="SiteHeader__dropdown__items" onMouseEnter={() => toggle(true)}>
            {subItems.map(item => (
              <a key={item.title} className="SiteHeader__dropdown__link" href={`/#/${item.route}`}>{item.title}</a>
            ))}
          </div>
        ) : null}

    </div>
  )
}

export default React.memo(Dropdown);