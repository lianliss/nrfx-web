import React from 'react';
import '../constants/vars.less';

import MainScreen from './containers/MainScreen/MainScreen';
import Timeline from './containers/Timeline/Timeline';
import Membership from './containers/Membership/Membership';
import Contacts from './containers/Contacts/Contacts';

import './NarfexDAO.less';

function NarfexDAO() {
  return (
    <div className="NarfexDAO">
      <MainScreen />
      <Timeline />
      <Membership />
      <Contacts />
    </div>
  );
}

export default NarfexDAO;
