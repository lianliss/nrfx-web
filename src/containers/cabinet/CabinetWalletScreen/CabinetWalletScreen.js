import './CabinetWalletScreen.less';

import React from 'react';

import CabinetWrapper from '../../../wrappers/Cabinet/CabinetWrapper';
import ProfileSidebar from '../../../components/cabinet/ProfileSidebar/ProfileSidebar';

function CabinetWalletScreen() {
  return (
    <CabinetWrapper>
      <div className="CabinetWalletScreen">
        <ProfileSidebar />

        <div className="CabinetWalletScreen__content">
          CabinetWalletScreen
        </div>
      </div>
    </CabinetWrapper>
  )
}


export default CabinetWalletScreen;