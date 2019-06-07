import React from 'react';
import './SiteWrapper.less';
import Header from '../../components/site/Header/Header';
import Footer from '../../components/site/Footer/Footer';
import SVG from 'react-inlinesvg';

export default function SiteWrapper(props) {
  return (
    <div>
      <div className="SiteWrapper">
        <div className="SiteWrapper__bg">
          <SVG src={require('../../asset/site/head_bg.svg')} />
        </div>
        <Header />
        {props.children}
      </div>
      <Footer />
    </div>
  )
}
