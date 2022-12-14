import React from 'react';
import useAdaptive from 'src/hooks/adaptive';
import Footer from './components/Footer';
import Header from './components/Header';

// Styles
import './index.less';

function MainLandingWrapper({ children }) {
  const adaptive = useAdaptive();

  return (
    <div className="MainLandingWrapper">
      {/* <Header adaptive={adaptive} /> */}
      <main className="MainLandingWrapper__content">{children}</main>
      <Footer adaptive={adaptive} />
    </div>
  );
}

export default MainLandingWrapper;
