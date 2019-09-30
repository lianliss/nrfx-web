import './ChangeSecretKeyModal.less';

import React, { useState } from 'react';
import UI from '../../../ui';
import * as utils from '../../../utils';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';

const ChangeSecretKeyModal = props => {
  const [code, setCode] = useState("");
  return (
    <UI.Modal isOpen={true} onClose={() => {props.close()}} width={424}>
      <UI.ModalHeader>
        {utils.getLang('cabinet_enterSecretKey')}
      </UI.ModalHeader>
      <div className="ChangeSecretKayModal">
        <UI.Input
          autoFocus={true}
          type="password"
          autoComplete="off"
          value={code}
          onTextChange={setCode}
          placeholder={utils.getLang('site__authModalSecretKey')}
          error={false}
        />
        <div className="ChangeSecretKayModal__submit_wrapper">
          <UI.Button onClick={() => {
            props.changeSecretKay(code);
          }}>
            {utils.getLang('cabinet_settingsSave')}
          </UI.Button>
        </div>
      </div>
    </UI.Modal>
  )
}

export default storeUtils.getWithState(
  CLASSES.CHANGE_SECRET_KEY_MODAL,
  ChangeSecretKeyModal
);
