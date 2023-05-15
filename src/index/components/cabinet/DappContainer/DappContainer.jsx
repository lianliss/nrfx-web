import './DappContainer.less';

import React from 'react';
import PropTypes from 'prop-types';
import * as UI from '../../../../ui';
import useAdaptive from 'src/hooks/adaptive';

function DappContainer({ children, sideBar, sidebarOptions }) {
  const adaptive = useAdaptive();

  return (
    <div
      className="DappContainer"
      style={{
        '--sidebar-width': sideBar.width,
      }}
    >
      <div className="DappContainer__sideBar">{<sideBar.Component />}</div>
      <div className="DappContainer__content">{children}</div>
      {adaptive && sidebarOptions && sidebarOptions.length && (
        <UI.FloatingButton
          wrapper
          icon={require('../../../../asset/24px/options.svg')}
        >
          {sidebarOptions}
        </UI.FloatingButton>
      )}
    </div>
  );
}

DappContainer.propTypes = {
  sideBar: PropTypes.node,
  sidebarOptions: PropTypes.array,
};

export default React.memo(DappContainer);
