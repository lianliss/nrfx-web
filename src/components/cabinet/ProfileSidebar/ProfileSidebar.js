import './ProfileSidebar.less';

import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { BaseLink } from 'react-router5';

import { classNames, makeModalParams } from '../../../utils';
import router from '../../../router';


function ProfileSidebar({ count, children, items, section, appName }) {

  const getBackButton = () => {
    const routeName = section ? window.location.pathname.substr(1) : 'profile';
    return (
      <BaseLink
        router={router}
        routeName={routeName}
        className="ProfileSidebar__menu__item ProfileSidebar__menu__item_passive"
        activeClassName="_a"
      >
        <SVG src={require('../../../asset/cabinet/angle_left.svg')} />
        {section ? appName : 'Profile'}
      </BaseLink>
    )
  };

  return (
    <div className="ProfileSidebar">
      <div className="ProfileSidebar__user">
        <div className="ProfileSidebar__user__avatar__wrap">
          <img className="ProfileSidebar__user__avatar blur" src="https://images.unsplash.com/photo-1496671431883-c102df9ae8f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2253&q=80" alt="" />
          <img className="ProfileSidebar__user__avatar" src="https://images.unsplash.com/photo-1496671431883-c102df9ae8f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2253&q=80" alt="" />
        </div>
        <h3 className="ProfileSidebar__user__title">Bitcoin bot</h3>
        <p className="ProfileSidebar__user__txt">BTCBOT</p>
        <p className="ProfileSidebar__user__txt">Agent</p>
        <button className="ProfileSidebar__user__verify">Verify</button>
      </div>

      <div className="ProfileSidebar__menu">
        {getBackButton()}
        {React.Children.map(items, (child) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          return React.cloneElement(child, {
            isActive: section === child.props.section && !!child.props.section
          });
        })}
      </div>
    </div>
  )
}

ProfileSidebar.propTypes = {
  items: PropTypes.node
};

export function ProfileSidebarItem({ icon, label, onClick, section, isActive, modal }) {
  const isLink = section || modal;
  const Component = isLink ? BaseLink : 'div';

  let params = {};
  if (isLink) {
    params.routeName = router.getState().name;
    params.router = router;
    params.activeClassName = '_a';
  }

  if (section) {
    params.routeParams = { section };
  } else if (modal) {
    params.routeParams = makeModalParams(modal);
  }

  return (
    <Component
      className={classNames({
        ProfileSidebar__menu__item: true,
        active: isActive
      })}
      onClick={onClick}
      {...params}
    >
      <SVG src={icon} />
      {label}
    </Component>
  );
}

ProfileSidebarItem.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  section: PropTypes.string,
  modal: PropTypes.string
};

export default ProfileSidebar;
