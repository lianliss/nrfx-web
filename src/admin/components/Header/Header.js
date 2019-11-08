import './Header.less';
import React from 'react';

import Logo from '../../../ui/components/Logo/Logo';
import * as auth from '../../../actions/auth';
import * as actions from '../../../actions';
import * as utils from '../../../utils';
import * as exchange from '../../../actions/cabinet/exchange';

export default props => {
  return (
    <div className="Header">
      <Logo />
      <div className="Header__title">Admin Panel</div>
      <div className="Header__menu">
        <div className="Header__menu_item" onClick={() => {
          // auth.logout();
          actions.confirm({
            title: "Exit from admin panel",
            content: "Do you really want to logout?",
            okText: "Logout",
          }).then(() => {
            auth.logout();
          });
        }}>Logout</div>
      </div>
    </div>
  )
}