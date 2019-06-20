import React from 'react';

export default class BaseScreen extends React.PureComponent {
  get lang() {
    let site ={};
    let lang = this.props.state.lang;
    Object.keys(lang).forEach(function(key) {
      let siteKey = key.replace('site__', '');
      site[siteKey] = lang[key];
    });

    lang.site = site;
    return lang;
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
}
