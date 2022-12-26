import React from 'react';
import { Link } from 'react-router5';

// Utils
import { getLang } from 'utils';
import navbarItems from 'src/wrappers/MainLanding/constants/navbarItems';
import _ from 'lodash';

function Navbar({ items = navbarItems, sidebarClose }) {
  return (
    <nav className="MainLandingWrapperHeader-nav">
      {items.map(({ title, scrollTo, ...item }, key) => {
        const Component = item.routeName ? Link : 'a';
        const handleScroll = () => {
          const element = document.querySelector(scrollTo);

          if (_.isFunction(element.scrollIntoView)) {
            element.scrollIntoView({ behavior: 'smooth' });
            sidebarClose();
          }
        };

        return (
          <Component
            className="MainLandingWrapperHeader-nav__link"
            key={key}
            onClick={scrollTo && handleScroll}
            target={item.href && '_blank'}
            {...item}
          >
            {getLang(title)}
          </Component>
        );
      })}
    </nav>
  );
}

export default Navbar;
