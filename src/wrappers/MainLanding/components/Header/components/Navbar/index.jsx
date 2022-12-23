import React from 'react';
import { Link } from 'react-router5';

// Utils
import { getLang } from 'utils';
import navbarItems from 'src/wrappers/MainLanding/constants/navbarItems';

function Navbar({ items = navbarItems }) {
  return (
    <nav className="MainLandingWrapperHeader-nav">
      {items.map(({ title, route }, key) => (
        <Link
          className="MainLandingWrapperHeader-nav__link"
          routeName={route}
          key={key}
        >
          {getLang(title)}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
