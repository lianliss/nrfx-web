import './MenuScreen.less';
//
import React from 'react';
import SVG from 'react-inlinesvg';
import {BaseLink} from 'react-router5';
//
import router from '../../../../router';
import CabinetBaseScreen from '../../CabinetBaseScreen/CabinetBaseScreen';
import * as CLASSES from "../../../../constants/classes";
import * as storeUtils from "../../../../storeUtils";
import * as PAGES from '../../../../constants/pages';
import * as utils from '../../../../utils';
import { getLang, setLang } from '../../../../services/lang';
import * as auth from '../../../../actions/auth';
import * as actions from '../../../../actions';

class MenuScreen extends CabinetBaseScreen {
  componentDidMount() {
    this.props.setTitle(utils.getLang("global_menu"));
  }

  render() {
    if (!this.props.adaptive) {
      return null;
    }

    const currentLang = getLang();
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
            <SVG src={require('../../../../asset/24px/id-badge.svg')} />
            <span>{utils.getLang("cabinet_settingsMenuPersonal")}</span>
          </BaseLink>
          <BaseLink
            router={router}
            routeName={PAGES.SETTINGS}
            routeParams={{ section: "security" }}
            className="Menu__section__item"
            activeClassName="active"
          >
            <SVG src={require('../../../../asset/24px/shield.svg')} />
            <span>{utils.getLang("global_security")}</span>
          </BaseLink>
        </div>
        <div className="Menu__section Menu__section__noSpacing Content_box">
          <div
            onClick={this.__handleChangeLanguage}
            className="Menu__section__item"
          >
            <SVG className={"Menu__section__item__flag"} src={require(`../../../../asset/site/lang-flags/${lang.value}.svg`)} />
            <span>{lang.title} {lang.value.toUpperCase()}</span>
          </div>
        </div>
        <div className="Menu__section Menu__section__noSpacing Content_box">
          <BaseLink
            router={router}
            onClick={auth.logout}
            routeName={PAGES.MAIN}
            className="Menu__section__item"
            activeClassName="active"
          >
            <SVG src={require('../../../../asset/24px/exit.svg')} />
            <span>{utils.getLang("cabinet_header_exit")}</span>
          </BaseLink>
        </div>
      </div>

    );
  }

  __handleChangeLanguage = () => {
    actions.openModal('language');
  };
}

export default storeUtils.getWithState(
  CLASSES.CABINET_MENU_SCREEN,
  MenuScreen
);