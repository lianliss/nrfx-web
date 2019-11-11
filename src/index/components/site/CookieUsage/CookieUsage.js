import './CookieUsage.less';

import React from 'react';
import { connect } from 'react-redux';

import UI from '../../../../ui';
import * as storage from '../../../../services/storage';


function CookieUsage({ lang }) {
  const [isOpen, toggleOpen] = React.useState(true);

  const handleAgree = () => {
    storage.setItem('acceptedCookies', true);
    toggleOpen(false);
  }

  if (isOpen) {
    return (
      <div className="CookieUsage">
        <h3 className="CookieUsage__title">{lang.site__cookieTitle}</h3>
        <p className="CookieUsage__text">
          {lang.site__cookieText1}
          <span> {lang.site__cookiePrivacyPolicy}</span>
          {lang.site__cookieText2}
        </p>
        <UI.Button fontSize={15} onClick={handleAgree}>{lang.site__cookieAgree}</UI.Button>
      </div>
    )
  }

  return null;
}

const mapStateToProps = (state) => ({
  lang: state.default.lang,
})

export default connect(mapStateToProps)(CookieUsage);