import React from 'react';
import { connect } from 'react-redux';
import '../constants/vars.less';

import { useAdaptive } from '../hooks/useAdaptive';

import MainScreen from './containers/MainScreen/MainScreen';
import Timeline from './containers/Timeline/Timeline';
import Membership from './containers/Membership/Membership';
import Contacts from './containers/Contacts/Contacts';

import './NarfexDAO.less';

function NarfexDAO() {
  const adaptive = useAdaptive();

  return (
    <div className="NarfexDAO">
      <MainScreen adaptive={adaptive} />
      <Timeline />
      <Membership />
      <Contacts />
    </div>
  );
}

export default NarfexDAO;
