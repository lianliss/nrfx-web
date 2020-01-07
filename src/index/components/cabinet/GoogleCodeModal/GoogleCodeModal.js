import './GoogleCodeModal.less';

import React, { useState } from 'react';
import { connect } from 'react-redux';
import copyText from 'clipboard-copy';

import UI from '../../../../ui';
import * as utils from '../../../../utils';
import * as toasts from '../../../../actions/toasts';
import * as profileActions from '../../../../actions/cabinet/profile';

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
              toasts.success(utils.getLang("cabinet_ keyCopiedSuccessfully"));
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

export default connect(state => ({
  router: state.router
}), {
  gaInit: profileActions.gaInit,
  toastPush: toasts.toastPush
})(GoogleCodeModal);
