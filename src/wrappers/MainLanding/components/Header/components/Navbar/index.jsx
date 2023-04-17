import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router5';

// Utils
import { getLang } from 'utils';
import navbarItems from 'src/wrappers/MainLanding/constants/navbarItems';
import _ from 'lodash';

function Navbar({ items, sidebarClose }) {
  return (
    <nav className="MainLandingWrapperHeader-nav">
      {items.map(({ title, scrollTo, ...item }, key) => {
        const Component = item.routeName ? Link : 'a';
        const handleScroll = () => {
          const element = scrollTo
            .map((selector) => document.querySelector(selector))
            .find((element) => element);

          if (!element) return;
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

Navbar.propTypes = {
  items: PropTypes.array,
  sidebarClose: PropTypes.func,
};

Navbar.defaultProps = {
  items: navbarItems,
  sidebarClose: () => {},
};

export default Navbar;
