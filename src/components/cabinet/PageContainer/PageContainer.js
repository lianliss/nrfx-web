import './PageContainer.less';

import React from 'react';
import PropTypes from 'prop-types';

import ProfileSidebar from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';

function PageContainer({ children, leftContent, sidebarOptions }) {
  return (
    <div className="PageContainer">
      <ProfileSidebar {...sidebarOptions} />

      <div className="PageContainer__content">
        <div className="PageContainer__content__primary">
          {children}
        </div>

        <div className="PageContainer__content__secondary">
          {leftContent}
        </div>
      </div>
    </div>
  )
}

PageContainer.propTypes = {
  leftContent: PropTypes.node,
  sidebarOptions: PropTypes.object
};

export default PageContainer;
