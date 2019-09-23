import "./Footer.less";
import React from "react";
import { BaseLink } from 'react-router5';
import { classNames } from '../../../utils/index';
import * as modalGroupActions from '../../../actions/modalGroup';
import LanguageModal from '../../site/LanguageModal/LanguageModal';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import {loadLang} from '../../../actions';
import * as storage from '../../../services/storage';
import moment from 'moment/min/moment-with-locales';



const Footer = (props) => {


  const handleLangChange = (value) => {
    loadLang(value);
    storage.setItem('lang', value);
    moment.locale(value);
  }

  const handleChangeLanguage = () => {
    modalGroupActions.openModalPage(null, {
    }, {
      children: ({ params }) => <LanguageModal {...params} />,
      params: {
        onClose: modalGroupActions.modalGroupClear,
        isOpen: true,
        onLanguageClick: handleLangChange,
        langList: props.langList,
      }
    })
  }

  const currentLang = storage.getItem('lang') || "en";
  const lang = props.langList.find(l => l.value === currentLang);

  return (
    <ul className={classNames("CabinetFooter", props.className)}>
      <li className="CabinetFooter__item"><a href="//bitcoinbot.wiki" target="_blank">FAQ</a></li>
      {/*<li className="CabinetFooter__item"><BaseLink router={router} routeName={pages.FAQ}>{utils.getLang("site__footerFAQ")}</BaseLink></li>*/}
      <li className="CabinetFooter__item"><a href="#" onClick={handleChangeLanguage}>{lang.title}</a></li>
    </ul>
  )
}

export default storeUtils.getWithState(
  CLASSES.COMPONENT_FOOTER,
  Footer
);
