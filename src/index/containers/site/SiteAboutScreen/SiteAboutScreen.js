import './SiteAboutScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import UI from '../../../../ui';
import About from './components/About';
import Mission from './components/Mission';
import History from './components/History';
import { ABOUT, MISSION, HISTORY } from '../../../constants/pages';
import * as utils from '../../../../utils/index';
import router from '../../../../router';


const getHeading = (currentTab) => {
  switch (currentTab) {
    case ABOUT:
      return utils.getLang('site__aboutBitcoinbotTitle');
    case MISSION:
      return utils.getLang('site__aboutMissionTitle');
    case HISTORY:
      return utils.getLang('site__aboutRoadMapTitle');
    default:
      return utils.getLang('site__aboutBitcoinbotTitle');
  }
};

const getClassName = (tab, currentTab) => {
  return currentTab !== tab ? 'inactive' : '';
};

const TabButton = ({ title, tabName, currentTab }) => (
  <span onClick={() => {
    router.navigate(tabName);
    window.scroll(0,0);
  }}>
    <UI.Button
      fontSize={15}
      rounded
      style={{ width: 200 }}
      newClass={getClassName(tabName, currentTab)}
    >
      {title}
    </UI.Button>
  </span>
);

export default class SiteAboutScreen extends BaseScreen {
  render() {
    const currentTab = router.getState().name;

    return (
      <div>
        <div className="Layout_spacing">

          <div className="SiteAboutScreen">

            <h1 className="SiteAboutScreen__heading">{getHeading(currentTab)}</h1>

            <div className="SiteAboutScreen__tabs">
              <TabButton title={utils.getLang('site__headerAboutUs')} tabName={ABOUT} currentTab={currentTab} />
              <TabButton title={utils.getLang('site__aboutFixturesMissionTitle')} tabName={MISSION} currentTab={currentTab} />
              <TabButton title={utils.getLang('site__aboutFixturesMapRoadTitle')} tabName={HISTORY} currentTab={currentTab} />
            </div>

            {currentTab === ABOUT
              ? <About />
              : currentTab === MISSION
                ? <Mission />
                : <History />}
          </div>
        </div>

      </div>
    )
  }
}
