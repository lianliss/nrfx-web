import './Header.less';

import React, { useState } from 'react';
import SVG from 'react-inlinesvg';

import UI from '../../../ui';
import * as utils from '../../../utils/index';
import * as pages from '../../../constants/pages';
import router from '../../../router';
// TODO: use connect instead of direct calling
import { loadLang } from '../../../actions';
import * as steps from '../AuthModal/fixtures';
import { getItem, setItem } from '../../../services/storage';
import Dropdown from './components/Dropdown';
import MobileDropdown from './components/MobileDropdown';
import AuthModal from '../AuthModal/AuthModal';


const langList = [
  {
    title: 'Ru',
    value: 'ru',
  },
  {
    title: 'En',
    value: 'en',
  },
]

const currentLang = getItem('lang');


function Header({ showLightLogo }) {
  const headerLinks = [
    {
      title: utils.getLang('site__headerProducts'),
      children: [
        {
          title: utils.getLang('site__headerWallet'),
          route: pages.WALLET,
        },
        {
          title: utils.getLang('site__headerExchange'),
          route: pages.EXCHANGE,
        },
        {
          title: utils.getLang('site__headerRobots'),
          route: pages.ROBOTS,
        },
        {
          title: utils.getLang('site__headerInvestment'),
          route: pages.INVESTMENT,
        },
        {
          title: utils.getLang('site__headerPayment'),
          route: pages.COMMERCE,
        },
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
          title: utils.getLang('site__headerContactUs'),
          route: pages.CONTACT,
        },
        {
          title: utils.getLang('site__headerTerms'),
          route: null,
        },
        {
          title: utils.getLang('site__headerPrivacyPolicy'),
          route: null,
        },
      ]
    }
  ]

  const [ isVerticalMenuOpen, toggleVerticalMenu ] = useState(false);
  const [ curLang, changeLang ] = useState(currentLang);

  const currentLangObj = langList.find(l => l.value === curLang);
  const currentLangTitle = currentLangObj ? currentLangObj.title : 'Ru';

  const handleLangChange = (value) => {
    loadLang(value);
    changeLang(value);
    setItem('lang', value);
  }

  const handleNavigate = (route) => {
    router.navigate(route);
  }

  return (
    <div className="SiteHeader">
      {isVerticalMenuOpen
        ? (
          <div className="SiteHeader__menu__vertical">
            <div className="SiteHeader__header">
              <a href="/" className="SiteHeader__header__logo">
                <SVG src={require('../../../asset/logo_big_white.svg')} />
              </a>
              <div onClick={() => toggleVerticalMenu(false)}>
                <SVG src={require('./asset/close.svg')}  />
              </div>
            </div>
            <div className="SiteHeader__menu__CTA">
              <AuthModal>
                <UI.Button type="outline">{utils.getLang('site__headerLogIn')}</UI.Button>
              </AuthModal>
              <AuthModal type={steps.REGISTRATION}>
                <UI.Button type="outline_white">{utils.getLang('site__headerRegistration')}</UI.Button>
              </AuthModal>
            </div>

            {headerLinks.map(item => (
              <MobileDropdown key={item.title} onNavigate={handleNavigate} title={item.title} subItems={item.children} />
            ))}
            <MobileDropdown title={currentLangTitle} subItems={langList} onChange={handleLangChange} />

          </div>
        ) : null
      }

      {!isVerticalMenuOpen
        ? (
          <div className="SiteHeader__cont">
            <a href="/">
              <div className="SiteHeader__logo">
                {showLightLogo
                  ? <SVG src={require('../../../asset/logo_big_white.svg')} />
                  : <SVG src={require('../../../asset/logo_big_orange.svg')} />
                }
              </div>
            </a>
            <div className="SiteHeader__menu__horizontal">
              {headerLinks.map(item => (
                <Dropdown key={item.title} title={item.title} onNavigate={handleNavigate} subItems={item.children} />
              ))}

              <div className="SiteHeader__menu_controls">
                <AuthModal>
                  <MenuItem>{utils.getLang('site__headerLogIn')}</MenuItem>
                </AuthModal>
                <AuthModal type={steps.REGISTRATION}>
                  <UI.Button type="outline_white" rounded>{utils.getLang('site__headerRegistration')}</UI.Button>
                </AuthModal>
                <Dropdown title={currentLangTitle} subItems={langList} onChange={handleLangChange} />
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
    <div className="SiteHeader__menu__item">
      {props.children}
      {props.arrow && <SVG src={require('../../../asset/menu_arrow.svg')} />}
    </div>
  )
}


export default Header;