import React from 'react';
import './SiteWrapper.less';
import Header from '../../components/site/Header/Header';
import Footer from '../../components/site/Footer/Footer';

export default function SiteWrapper(props) {
  return (
    <div>
      <div className="SiteWrapper">
        <Header />
        {props.children}
      </div>
      <Footer />
    </div>
  )
}
