import './MenuScreen.less';
import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import React from 'react';
import { BaseLink } from 'react-router5';
import * as CLASSES from "../../../constants/classes";
import * as storeUtils from "../../../storeUtils";
import router from '../../../router';
import SVG from 'react-inlinesvg';
import * as PAGES from '../../../constants/pages';
import * as utils from '../../../utils';
import * as storage from '../../../services/storage';
import * as auth from '../../../actions/auth';
import {loadLang} from '../../../actions';
import * as modalGroupActions from '../../../actions/modalGroup';
import LanguageModal from '../../../components/site/LanguageModal/LanguageModal';
import moment from 'moment/min/moment-with-locales';


class MenuScreen extends CabinetBaseScreen {

  handleLangChange = (value) => {
    loadLang(value);
    storage.setItem('lang', value);
    moment.locale(value);
  }

  handleChangeLanguage = () => {
    modalGroupActions.openModalPage(null, {}, {
      children: ({ params }) => <LanguageModal {...params} />,
      params: {
        onClose: modalGroupActions.modalGroupClear,
        isOpen: true,
        onLanguageClick: this.handleLangChange,
        langList: this.props.langList,
      }
    })
  }

  render() {
    if (!this.props.adaptive) {
      return '0';
    }

    const currentLang = storage.getItem('lang') || "en";
    const lang = this.props.langList.find(l => l.value === currentLang);

    return (
      <div className="Menu">
        <div className="Menu__section Content_box">
          <div className="Menu__section__title">{utils.getLang('cabinet_header_settings')}</div>
          <BaseLink
            router={router}
            routeName={PAGES.SETTINGS}
            className="Menu__section__item"
            activeClassName="active"
          >
            <SVG src={require('../../../asset/24px/id-badge.svg')} />
            <span>{utils.getLang("cabinet_settingsMenuPersonal")}</span>
          </BaseLink>
        </div>
        <div className="Menu__section Menu__section__noSpacing Content_box">
          <div
            onClick={this.handleChangeLanguage}
            className="Menu__section__item"
          >
            <SVG className={"Menu__section__item__flag"} src={require(`../../../asset/site/lang-flags/${lang.value}.svg`)} />
            <span>{lang.title} {lang.value.toUpperCase()}</span>
          </div>
        </div>
        <div className="Menu__section Menu__section__noSpacing Content_box">
          <BaseLink
            router={router}
            onClick={auth.logout}
            routeName={PAGES.WALLET}
            className="Menu__section__item"
            activeClassName="active"
          >
            <SVG src={require('../../../asset/24px/exit.svg')} />
            <span>{utils.getLang("cabinet_header_exit")}</span>
          </BaseLink>
        </div>
      </div>

    );
  }
}

export default storeUtils.getWithState(
  CLASSES.CABINET_MENU_SCREEN,
  MenuScreen
);