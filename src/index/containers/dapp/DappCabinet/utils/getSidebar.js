import React from 'react';
import { Sidebar as P2PModeratorSidebar } from '../../../p2p/ModeratorPanel/components';
import CabinetSidebar from 'src/index/components/dapp/CabinetSidebar/CabinetSidebar';
import * as PAGES from 'src/index/constants/pages';

const getSidebar = (routeName) => {
  let sidebar;

  switch (routeName) {
    case PAGES.P2P_MODERATOR:
      sidebar = { Component: P2PModeratorSidebar, width: '236px' };
      break;
    default:
      sidebar = { Component: CabinetSidebar, width: '190px' };
  }

  return sidebar;
};

export default getSidebar;
