import "./Footer.less";
import React from "react";
import { BaseLink } from 'react-router5';
import { classNames } from '../../../utils/index';
import * as pages from '../../../constants/pages';
import router from '../../../router';
import * as modalGroupActions from '../../../actions/modalGroup';
import LanguageModal from '../../site/LanguageModal/LanguageModal';
import RateDetailsModal from '../RateDetailsModal/RateDetailsModal';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import {loadLang} from '../../../actions';
import * as storage from '../../../services/storage';
import * as utils from '../../../utils/index';



// const Footer = (props) => {
//
//
//   const handleLangChange = (value) => {
//     loadLang(value);
//     // changeLang(value);
//     storage.setItem('lang', value);
//   }
//
//   debugger;
//
//   return (
//     <ul className={classNames("CabinetFooter", props.className)}>
//       <LanguageModal isOpen={true} onClose={console.log} onLanguageClick={handleLangChange} langList={Zprops.langList} />
//       <li className="CabinetFooter__item"><BaseLink router={router} routeName="#">Blog</BaseLink></li>
//       <li className="CabinetFooter__item"><BaseLink router={router} routeName="#">Vacancies</BaseLink></li>
//       <li className="CabinetFooter__item"><BaseLink router={router} routeName={pages.ABOUT}>About</BaseLink></li>
//       <li className="CabinetFooter__item"><BaseLink router={router} routeName={"profile"}>Legal Information</BaseLink></li>
//       <li className="CabinetFooter__item"><BaseLink router={router} routeName={"profile"}>Developers</BaseLink></li>
//       <li className="CabinetFooter__item"><BaseLink router={router} routeName={"profile"}>English</BaseLink></li>
//     </ul>
//   )
// }


const Footer = (props) => {


  const handleLangChange = (value) => {
    loadLang(value);
    storage.setItem('lang', value);
  }

  storage.getItem('lang');

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

  const currentLang = storage.getItem('lang');
  const lang = props.langList.find(l => l.value === currentLang);

  return (
    <ul className={classNames("CabinetFooter", props.className)}>
      <li className="CabinetFooter__item"><a href="//bitcoinbot.wiki" target="_blank">Wiki</a></li>
      {/*<li className="CabinetFooter__item"><BaseLink router={router} routeName={pages.FAQ}>{utils.getLang("site__footerFAQ")}</BaseLink></li>*/}
      <li className="CabinetFooter__item"><a href="#" onClick={handleChangeLanguage}>{lang.title}</a></li>
    </ul>
  )
}

export default storeUtils.getWithState(
  CLASSES.COMPONENT_FOOTER,
  Footer
);
