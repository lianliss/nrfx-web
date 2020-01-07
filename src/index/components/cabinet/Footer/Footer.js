import "./Footer.less";

import React from "react";
import { connect } from 'react-redux';

import { classNames } from '../../../../utils/index';
import * as actions from '../../../../actions';
import COMPANY from '../../../constants/company';

const Footer = (props) => {
  const handleChangeLanguage = e => {
    e.preventDefault();
    actions.openModal('language');
  };

  const lang = actions.getCurrentLang();

  return (
    <ul className={classNames("CabinetFooter", props.className)}>
      <li className="CabinetFooter__item"><a href={COMPANY.wikiUrl} target="_blank" rel="noopener noreferrer">FAQ</a></li>
      {/*<li className="CabinetFooter__item"><BaseLink router={router} routeName={pages.FAQ}>{utils.getLang("site__footerFAQ")}</BaseLink></li>*/}
      <li className="CabinetFooter__item"><a href="#" onClick={handleChangeLanguage}>{lang.title}</a></li>
    </ul>
  )
};

export default connect(state => ({
  langList: state.default.langList,
}))(Footer);
