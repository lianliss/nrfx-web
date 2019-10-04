import "./Footer.less";
import React from "react";
import * as emitter from '../../../services/emitter';
import { classNames } from '../../../utils/index';
import * as modalGroupActions from '../../../actions/modalGroup';
import LanguageModal from '../../site/LanguageModal/LanguageModal';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import { getLang, setLang } from '../../../services/lang';
import * as utils from '../../../utils'

const Footer = (props) => {
  const handleLangChange = (value) => {
    setLang(value, e => emitter.emit('headerUpdate') && Footer(props));
  };

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
  };

  const currentLang = getLang();
  const lang = props.langList.find(l => l.value === currentLang);

  return (
    <ul className={classNames("CabinetFooter", props.className)}>
      <li className="CabinetFooter__item"><a href="//bitcoinbot.wiki" target="_blank" rel="noopener noreferrer">FAQ</a></li>
      {/*<li className="CabinetFooter__item"><BaseLink router={router} routeName={pages.FAQ}>{utils.getLang("site__footerFAQ")}</BaseLink></li>*/}
      <li className="CabinetFooter__item"><a href="#" onClick={handleChangeLanguage}>{lang.title}</a></li>
      <li className="CabinetFooter__item"><a href="http://cabinet.bitcoinbot.pro">{utils.getLang("global_oldDesign")}</a></li>
    </ul>
  )
};

export default storeUtils.getWithState(
  CLASSES.COMPONENT_FOOTER,
  Footer
);

