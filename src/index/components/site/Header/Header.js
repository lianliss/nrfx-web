import './Header.less';

import React, { useState } from 'react';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';

import UI from '../../../../ui';
import * as utils from '../../../../utils/index';
import * as pages from '../../../constants/pages';
import router from '../../../../router';
import * as steps from '../../../../components/AuthModal/fixtures';
import { getLang, setLang } from '../../../../services/lang';
import Dropdown from './components/Dropdown';
import MobileDropdown from './components/MobileDropdown';
import * as actions from '../../../../actions';
import * as auth from '../../../../actions/auth';


function Header({ showLightLogo, langList, routerState, profile }) {
  const headerLinks = [
    {
      title: utils.getLang('site__headerProducts'),
      children: [
        {
          title: utils.getLang('site__homeWallet'),
          route: pages.WALLET,
        },
        {
          title: utils.getLang('site__headerExchange'),
          route: pages.SITE_EXCHANGE,
        },
        {
          title: utils.getLang('site__headerRobots'),
          route: pages.ROBOTS,
        },
        {
          title: utils.getLang('site__headerInvestment'),
          route: pages.INVESTMENT,
        },
        // {
        //   title: utils.getLang('site__headerPayment'),
        //   route: pages.COMMERCE,
        // },
      ]
    },
    {
      title: utils.getLang('site__headerCompany'),
      children: [
        {
          title: utils.getLang('site__headerAboutUs'),
          route: pages.ABOUT,
        },
        {
          title: utils.getLang('site__headerContactUs'),
          route: pages.CONTACT,
        },
        {
          title: utils.getLang('site__headerTechnology'),
          route: pages.TECHNOLOGY,
        },
        {
          title: utils.getLang('site__headerSecurity'),
          route: pages.SAFETY,
        },
      ]
    },
    {
      title: utils.getLang('site__headerHelp'),
      children: [
        {
          title: utils.getLang('site__headerFAQ'),
          route: pages.FAQ,
        },
        {
          title: (
            <span onClick={ () => actions.openModal('static_content',{type: "terms"})}>
              {utils.getLang('site__headerTerms')}
            </span>
          ),
          route: null,
        },
        {
          title: (
            <span onClick={ () => actions.openModal('static_content', {type: "privacy"})}>
              {utils.getLang('site__headerPrivacyPolicy')}
            </span>
          ),
          route: null,
        },
      ]
    }
  ];

  const [ isVerticalMenuOpen, toggleVerticalMenu ] = useState(false);
  const currentLang = getLang();;
  const currentLangTitle = langList.find(l => l.value === currentLang).title;

  const isLogin = !!profile.role;

  const handleLangChange = (value) => {
    setLang(value);
  };

  const handleNavigate = (route) => {
    toggleVerticalMenu(false);
    router.navigate(route);
  };

  return (
    <div className="SiteHeader">
      {isVerticalMenuOpen
        ? (
          <div className="SiteHeader__menu__vertical">
            <div className="SiteHeader__header">
              <a href="/" className="SiteHeader__header__logo SiteHeader__logo_white">
                <UI.Logo type="white" />
              </a>
              <div onClick={() => toggleVerticalMenu(false)}>
                <SVG src={require('./asset/close.svg')}  />
              </div>
            </div>
            <div className="SiteHeader__menu__CTA">
              { !isLogin ? [
                <UI.Button
                  type="outline"
                  fontSize={15}
                  onClick={() => actions.openModal('auth', { type: steps.LOGIN })}
                >
                  {utils.getLang('site__headerLogIn')}
                </UI.Button>,
                <UI.Button
                  type="outline_white"
                  fontSize={15}
                  onClick={() => actions.openModal('auth', { type: steps.REGISTRATION })}
                >
                  {utils.getLang('site__commerceRegistration')}
                </UI.Button>
              ] : [
                <UI.Button
                  onClick={() => router.navigate(pages.PROFILE)}
                  fontSize={15}
                  type="outline"
                >
                  {utils.getLang('cabinet_header_cabinet')}
                </UI.Button>,
                <UI.Button
                  onClick={auth.logout}
                  type="outline_white"
                  fontSize={15}
                >
                  {utils.getLang('cabinet_header_exit')}
                </UI.Button>
              ]}
            </div>

            {headerLinks.map(item => (
              <MobileDropdown key={item.title} onNavigate={handleNavigate} title={item.title} subItems={item.children} />
            ))}
            <MobileDropdown
              title={currentLangTitle}
              subItems={langList.slice(0, 3)}
              onChange={handleLangChange}
              lastItemText={utils.getLang('site__headerMore')}
              onLastItemClick={() => {
                actions.openModal('language');
              }}
            />

          </div>
        ) : null
      }

      {!isVerticalMenuOpen
        ? (
          <div className="SiteHeader__cont">
            <a href="/">
              <div className="SiteHeader__logo">
                <UI.Logo type={showLightLogo ? "white" : "default"} />
              </div>
            </a>
            <div className="SiteHeader__menu__horizontal">
              {headerLinks.map(item => (
                <Dropdown key={item.title} title={item.title} onNavigate={handleNavigate} subItems={item.children} />
              ))}

              <div className="SiteHeader__menu_controls">
                { !isLogin ? [
                  <MenuItem onClick={() => actions.openModal('auth', {type: steps.LOGIN})}>{utils.getLang('site__headerLogIn')}</MenuItem>,
                  <UI.Button
                    onClick={() => actions.openModal('auth', {type: steps.REGISTRATION})}
                    type="outline_white"
                    rounded
                    fontSize={15}
                  >
                    {utils.getLang('site__commerceRegistration')}
                  </UI.Button>
                ] : [
                  <MenuItem onClick={auth.logout}>{utils.getLang("cabinet_header_exit")}</MenuItem>,
                  <UI.Button
                    type="outline_white"
                    rounded
                    fontSize={15}
                    onClick={() => router.navigate(pages.PROFILE)}
                  >
                    {utils.getLang("cabinet_header_cabinet")}
                  </UI.Button>
                ]}

                <Dropdown
                  className="SiteHeader__lang__dropdown"
                  title={currentLangTitle}
                  subItems={langList.slice(0, 3)}
                  onChange={handleLangChange}
                  lastItemText={utils.getLang('site__headerMore')}
                  onLastItemClick={() => {
                    actions.openModal('language');
                  }}
                />
              </div>
            </div>

            <div className="SiteHeader__icon" onClick={() => toggleVerticalMenu(true)}>
              {showLightLogo
                ? <SVG src={require('./asset/menu_white.svg')} />
                : <SVG src={require('./asset/menu.svg')} />
              }
            </div>
          </div>
        ) : null}

    </div>
  )
}

function MenuItem(props) {
  return (
    <div onClick={props.onClick} className="SiteHeader__menu__item">
      {props.children}
      {props.arrow && <SVG src={require('../../../../asset/menu_arrow.svg')} />}
    </div>
  )
}

const mapStateToProps = (state) => ({
  profile: state.default.profile,
  langList: state.default.langList,
  lang: state.default.lang,
  routerState: state.router,
});

export default connect(mapStateToProps)(React.memo(Header));
