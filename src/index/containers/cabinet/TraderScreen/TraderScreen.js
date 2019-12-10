import React from 'react';

import CabinetBaseScreen from '../CabinetBaseScreen/CabinetBaseScreen';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';
import PageContainer from '../../../components/cabinet/PageContainer/PageContainer';
import { ProfileSidebarItem } from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';

import { ReactComponent as PlusCircleSvg } from '../../../../asset/24px/plus-circle.svg';
import * as actions from '../../../../actions';

class TraderScreen extends CabinetBaseScreen {
  render() {

    return (
      <div>
        <PageContainer
          sidebarOptions={[
            <ProfileSidebarItem
              onClick={() => {

              }}
              icon={<PlusCircleSvg />}
              label={'Exchange'}
            />,
            <ProfileSidebarItem
              onClick={() => actions.openModal('trader_new_bot')}
              icon={<PlusCircleSvg />}
              label={'Bot'}
            />,
          ]}
        >
          {this.__renderContent()}
        </PageContainer>
      </div>
    )
  }

  __renderContent() {
    return (
      <div>test</div>
    )
  }
}

export default storeUtils.getWithState(
  CLASSES.CABINET_TRADER_SCREEN,
  TraderScreen
);
