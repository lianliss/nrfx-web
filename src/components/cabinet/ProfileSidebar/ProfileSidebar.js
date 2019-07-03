import './ProfileSidebar.less';

import React from 'react';
import SVG from 'react-inlinesvg';


function ProfileSidebar({ count, children }) {
  return (
    <div className="ProfileSidebar">
      <div className="ProfileSidebar__user">
        {/* TODO: Add shadow */}
        <img className="ProfileSidebar__user__avatar" src="https://images.unsplash.com/photo-1496671431883-c102df9ae8f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2253&q=80" alt="" />
        <h3 className="ProfileSidebar__user__title">Bitcoin bot</h3>
        <p className="ProfileSidebar__user__txt">BTCBOT</p>
        <p className="ProfileSidebar__user__txt">Agent</p>
      </div>

      <div className="ProfileSidebar__menu">
        <div className="ProfileSidebar__menu__item ProfileSidebar__menu__item_passive">
          <SVG src={require('../../../asset/cabinet/angle_left.svg')} />
          Profile
        </div>
        <div className="ProfileSidebar__menu__item">
          <SVG src={require('../../../asset/cabinet/transactions_icon.svg')} />
          Transactions
        </div>
        <div className="ProfileSidebar__menu__item">
          <SVG src={require('../../../asset/cabinet/send_icon.svg')} />
          Send
        </div>
        <div className="ProfileSidebar__menu__item">
          <SVG src={require('../../../asset/cabinet/receive_icon.svg')} />
          Receive
        </div>

      </div>
    </div>
  )
}

export default ProfileSidebar;