import React from 'react';
import Header from './components/Header';

// Styles
import './index.less';

function MainLandingWrapper({ children }) {
  return (
    <div className="MainLandingWrapper">
      <Header />
      <main className="MainLandingWrapper__content">{children}</main>
    </div>
  );
}

export default MainLandingWrapper;
