import React from 'react';
import './SiteWrapper.less';
import Header from '../../components/site/Header/Header';


export default function SiteWrapper(props) {
  return (
    <div className="SiteWrapper">
      <Header />
      {props.children}
    </div>
  )
}
