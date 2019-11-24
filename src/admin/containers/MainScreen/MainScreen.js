import './MainScreen.less';
import React from 'react';
import UI from '../../../ui';
import * as toast from '../../../actions/toasts';
import * as actions from '../../../actions/';

export default props => {
  return (
    <div className="MainScreen">
      <div className="MainScreen__wrapper">
        <h1>Admin Panel</h1>
        <p>Самый лучший!</p>
        <UI.Button size="large" onClick={() => actions.openModal("auth")}>Login</UI.Button>
      </div>
    </div>
  )
}