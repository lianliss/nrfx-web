import './PageContainer.less';

import React from 'react';
import PropTypes from 'prop-types';
import * as UI from '../../../../ui';
import ProfileSidebar from '../../cabinet/ProfileSidebar/ProfileSidebar';

function PageContainer({ children, leftContent, sidebarOptions }) {
  const adaptive = document.body.classList.contains('adaptive');
  return (
    <div className="PageContainer">
      {!adaptive && <ProfileSidebar sidebarOptions={sidebarOptions} />}

      <div className="PageContainer__content">
        <div className="PageContainer__content__primary">
          {children}
        </div>

        {leftContent && <div className="PageContainer__content__secondary">
          {leftContent}
        </div>}
      </div>
      { adaptive && sidebarOptions.length && (
        <UI.FloatingButton wrapper icon={require('../../../../asset/24px/options.svg')}>
          {sidebarOptions}
        </UI.FloatingButton>
      )}
    </div>
  )
}

PageContainer.propTypes = {
  leftContent: PropTypes.node,
  sidebarOptions: PropTypes.array
};

export default React.memo(PageContainer);
