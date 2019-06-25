import './Header.less';

import React, { useState } from 'react';
import SVG from 'react-inlinesvg';

import UI from '../../../ui';
import * as utils from '../../../utils/index';
import * as pages from '../../../constants/pages';
import * as steps from '../AuthModal/fixtures';
import Dropdown from './components/Dropdown';
import MobileDropdown from './components/MobileDropdown';
import AuthModal from '../AuthModal/AuthModal';


const headerLinks = [
  {
    title: 'Продукты',
    children: [
      {
        title: 'Кошелек',
        route: pages.WALLET,
      },
      {
        title: 'Биржа',
        route: pages.EXCHANGE,
      },
      {
        title: 'Роботы',
        route: pages.ROBOTS,
      },
      {
        title: 'Инвестиции',
        route: pages.INVESTMENT,
      },
      {
        title: 'Оплата',
        route: pages.COMMERCE,
      },
    ]
  },
  {
    title: 'Компания',
    children: [
      {
        title: 'О нас',
        route: pages.ABOUT,
      },
      {
        title: 'Технологии',
        route: pages.TECHNOLOGY,
      },
      {
        title: 'Безопасность',
        route: pages.SAFETY,
      },
    ]
  },
  {
    title: 'Помощь',
    children: [
      {
        title: 'ЧаВо',
        route: pages.FAQ,
      },
      {
        title: 'Связаться с нами',
        route: pages.CONTACT,
      },
      {
        title: 'Пользовательское соглашение',
        route: null,
      },
      {
        title: 'Политика конфиденциальности',
        route: null,
      },
    ]
  }
]

const langLinks = [
  {
    title: 'Ru',
    route: null,
  },
  {
    title: 'En',
    route: null,
  },
]


function Header({ showLightLogo }) {
  const [ isVerticalMenuOpen, toggleVerticalMenu ] = useState(false);

  return (
    <div className="SiteHeader">
      {isVerticalMenuOpen
        ? (
          <div className="SiteHeader__menu__vertical">
            <div className="SiteHeader__logo__row">
              <a href="/#/">
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
              <MobileDropdown key={item.title} title={item.title} subItems={item.children} />
            ))}
            <MobileDropdown title="Ru" subItems={langLinks} />

          </div>
        ) : null
      }

      {!isVerticalMenuOpen
        ? (
          <div className="SiteHeader__cont">
            <a href="/#/">
              <div className="SiteHeader__logo">
                {showLightLogo
                  ? <SVG src={require('../../../asset/logo_big_white.svg')} />
                  : <SVG src={require('../../../asset/logo_big_orange.svg')} />
                }
              </div>
            </a>
            <div className="SiteHeader__menu__horizontal">
              {headerLinks.map(item => (
                <Dropdown key={item.title} title={item.title} subItems={item.children} />
              ))}

              <div className="SiteHeader__menu_controls">
                <AuthModal>
                  <MenuItem>Войти</MenuItem>
                </AuthModal>
                <AuthModal type={steps.REGISTRATION}>
                  <UI.Button type="outline_white" rounded>Регистрация</UI.Button>
                </AuthModal>
                <Dropdown title="Ru" subItems={langLinks} />
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


export default React.memo(Header);