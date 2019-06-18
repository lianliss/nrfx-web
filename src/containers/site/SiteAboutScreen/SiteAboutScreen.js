import './SiteAboutScreen.less';

import React from 'react';

import BaseScreen from '../../BaseScreen';
import SiteWrapper from '../../../wrappers/Site/SiteWrapper';
import UI from '../../../ui';
import About from './components/About';
import Mission from './components/Mission';
import History from './components/History';
import { ABOUT, MISSION, HISTORY } from './fixtures';


const getHeading = (currentTab) => {
  switch (currentTab) {
    case ABOUT:
      return 'О BITCOINBOT';
    case MISSION:
      return 'Миссия и ценности';
    case HISTORY:
      return 'Дорожная карта';
    default:
      return 'О BITCOINBOT';
  }
}

const getClassName = (tab, currentTab) => {
  return currentTab !== tab ? 'inactive' : '';
}

const TabButton = ({ title, switchFn, tabName, currentTab }) => (
  <UI.Button
    rounded
    style={{ width: 200 }}
    onClick={() => switchFn(tabName)}
    newClass={getClassName(tabName, currentTab)}
  >
    {title}
  </UI.Button>
)


export default class SiteAboutScreen extends BaseScreen {
  state = {
    currentTab: ABOUT,
  }

  switchTab = (currentTab) => {
    this.setState({ currentTab });
  }

  render() {
    const { currentTab } = this.state;

    return (
      <SiteWrapper withOrangeBg>
        <div className="SiteAboutScreen">

          <h1 className="SiteAboutScreen__heading">{getHeading(currentTab)}</h1>

          <div className="SiteAboutScreen__tabs">
            <TabButton title="О нас" switchFn={this.switchTab} tabName={ABOUT} currentTab={currentTab} />
            <TabButton title="Миссия" switchFn={this.switchTab} tabName={MISSION} currentTab={currentTab} />
            <TabButton title="Дорожная карта" switchFn={this.switchTab} tabName={HISTORY} currentTab={currentTab} />
          </div>

          {currentTab === ABOUT
            ? <About />
            : currentTab === MISSION
              ? <Mission />
              : <History />}
        </div>


      </SiteWrapper>
    )
  }
}
