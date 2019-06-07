import React from 'react';
import './Header.less';
import SVG from 'react-inlinesvg';
import UI from '../../../ui';

export default class Header extends React.PureComponent {
  render() {
    return (
      <div className="SiteHeader">
        <div className="SiteHeader__cont">
          <div className="SiteHeader__logo">
            <SVG src={require('../../../asset/logo_big_orange.svg')} />
          </div>
          <div className="SiteHeader__menu">
            <MenuItem arrow>Продукты</MenuItem>
            <MenuItem arrow>Компания</MenuItem>
            <MenuItem arrow>Помощь</MenuItem>
            <div className="SiteHeader__menu_controls">
              <MenuItem>Войти</MenuItem>
              <UI.Button type="outline_white" rounded>Регистрация</UI.Button>
              <MenuItem arrow>Ru</MenuItem>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function MenuItem(props) {
  return (
    <div className="SiteHeader__menu__item">
      {props.children}
      {props.arrow && <SVG src={require('../../../asset/menu_arrow.svg')} />}
    </div>
  )
}
