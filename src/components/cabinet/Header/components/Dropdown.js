import React, { useState } from 'react';

function Dropdown({title, subItems, onChange, onNavigate, lastItemText, onLastItemClick, className }) {
  const [isOpen, toggle] = useState(false);

  const handleLinkClick = (value) => {
    onChange && onChange(value);
    toggle(false);
  };

  const handleLastItemClick = () => {
    toggle(false);
    onLastItemClick();
  };

  return (
    <div className={"CabinetHeader__dropdown " + className}>
      <div
        className="CabinetHeader__menu__item"
        onClick={() => toggle(true)}
        onMouseEnter={() => toggle(true)}
        onMouseLeave={() => toggle(false)}
      >
        {title}
      </div>

      {isOpen
        ? (
          <div className="CabinetHeader__dropdown__items" onMouseEnter={() => toggle(true)} onMouseLeave={() => toggle(false)}>
            {subItems.map((item, i) => {
              if (item.route) {
                return (
                  <span
                    key={item.title}
                    className="CabinetHeader__dropdown__link"
                    onClick={() => {
                      if (item.action) item.action();
                      if (item.hasOwnProperty('useLocation')) {
                        window.location.href = item.route;
                      } else {
                        onNavigate(item.route)
                      }
                    }}
                  >
                    {item.title}
                  </span>
                );
              } else if (typeof item.title === 'string') {
                return (
                  <p key={item.title} className="CabinetHeader__dropdown__link" onClick={() => handleLinkClick(item.value)}>{item.title}</p>
                );
              } else {
                return (
                  <div key={i} className="CabinetHeader__dropdown__link">{item.title}</div>
                );
              }
            })}

            {lastItemText && (
              <span className="CabinetHeader__dropdown__link" onClick={handleLastItemClick}>
                {lastItemText}
              </span>
            )}
          </div>
        ) : null}

    </div>
  )
}

export default React.memo(Dropdown);