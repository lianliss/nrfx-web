import "./Footer.less";

import React from "react";
import { connect } from 'react-redux';
import { classNames, getLang } from 'utils';
import * as actions from 'src/actions/index';
import COMPANY from '../../../constants/company';
import UI from 'src/ui'


const Footer = (props) => {
  const handleChangeLanguage = e => {
    e.preventDefault();
    actions.openModal('language');
  };

  const toggleTranslator = () => {
    props.toggleTranslator(!props.translator);
  };

  const lang = actions.getCurrentLang();

  return (
    <ul className={classNames("CabinetFooter", props.className)}>
      {props.role === 'Translator' && <div className="CabinetFooter__translator">{getLang('cabinet__translation_mode', true)}<UI.Switch on={props.translator} onChange={toggleTranslator}/></div>}
      <li className="CabinetFooter__item"><a href={COMPANY.faqUrl} target="_blank" rel="noopener noreferrer">FAQ</a></li>
      {/*<li className="CabinetFooter__item"><BaseLink router={router} routeName={pages.FAQ}>{utils.getLang("site__footerFAQ")}</BaseLink></li>*/}
      <li className="CabinetFooter__item"><a href="#" onClick={handleChangeLanguage}>{lang.title}</a></li>
    </ul>
  )
};

export default connect(state => ({
  langList: state.default.langList,
  translator: state.settings.translator,
  role: state.default.profile.role
}), {
  toggleTranslator: actions.toggleTranslator
})(Footer);

