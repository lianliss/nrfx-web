import React from 'react';
import { Link } from 'react-router5';

// Utils
import navbarItems from '../../../../constants/navbarItems';

function Navbar({ items = navbarItems }) {
  return (
    <nav className="MainLandingWrapperHeader-nav">
      {items.map(({ title, route }, key) => (
        <Link
          className="MainLandingWrapperHeader-nav__link"
          routeName={route}
          key={key}
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;
