import './GoogleCodeModal.less';

import React, { useState } from 'react';
import copyText from 'clipboard-copy';

import UI from '../../../ui';
import * as utils from '../../../utils';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from '../../../constants/classes';

const GoogleCodeModal = props => {
  const [code, setCode] = useState("");

  const { options } = props.router.route.meta;

  if (!options) {
    return null;
  }

  return (
    <UI.Modal isOpen={true} onClose={() => {props.close()}} width={424}>
      <UI.ModalHeader>
        {utils.getLang('site__authModalTitle')}
      </UI.ModalHeader>
      <div className="GoogleCodeModal">
        <p className="GoogleCodeModal__description">{utils.getLang('site__authModalContentGA')}</p>
        <img className="GoogleCodeModal__qr_code" src={options.url} alt="GA QR Code" />
        <b className="GoogleCodeModal__hash">{options.hash}</b>
        <UI.Input
          autoFocus={true}
          autoComplete="off"
          value={code}
          onTextChange={value => {
            if (value.length <= 6) {
              setCode(value);
            }
            if (value.length === 6) {
              props.gaInit(value);
            }
          }}
          placeholder={utils.getLang('site__authModalGAPlaceholder')}
          error={false}
        />
        <div className="GoogleCodeModal__submit_wrapper">
          <UI.Button onClick={() => {
            copyText(options.hash).then(() => {
              props.toastPush(utils.getLang("cabinet_ keyCopiedSuccessfully"), "success");
            })
          }} type="outline">{utils.getLang('cabinet_CopyKey')}</UI.Button>
          <UI.Button onClick={() => {
            props.gaInit(code);
          }}>
            {utils.getLang('site__authModalSubmit')}
          </UI.Button>
        </div>
      </div>
    </UI.Modal>
  )
}

export default storeUtils.getWithState(
  CLASSES.GOOGLE_CODE_MODAL,
  GoogleCodeModal
);
