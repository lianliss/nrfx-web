import './CabinetMerchantStatusScreen.less';

import React from 'react';

import { getLang } from '../../../../utils'
import UI from '../../../../ui';
import router from '../../../../router';

export function Status(props) {

  const success = props.status === 'success';

  return (
    <div className="MerchantStatus">
      <div
        className="MerchantStatus__icon"
        style={{backgroundImage: `url(${
          success ? require('../../../../asset/120/success.svg') : require('../../../../asset/120/error.svg')
        })`}}
      />
      <h2 className="MerchantStatus__text">{success ? getLang('cabinet_merchantSuccessText') : getLang('cabinet_merchantErrorText')}</h2>
      <UI.Button>{getLang('global_continue')}</UI.Button>
    </div>
  )
}

export default props => {
  const {merchant, status} = router.getState().params;
  return (
    <div className="MerchantScreen">
      <Status status={status.toLowerCase()} />
    </div>
  )
}
