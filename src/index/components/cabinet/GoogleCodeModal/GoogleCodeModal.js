import './GoogleCodeModal.less';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import copyText from 'clipboard-copy';

import * as UI from '../../../../ui';
import * as utils from '../../../../utils';
import * as toasts from '../../../../actions/toasts';
import * as profileActions from '../../../../actions/cabinet/profile';
import LoadingStatus from '../LoadingStatus/LoadingStatus';

const GoogleCodeModal = props => {
  const [code, setCode] = useState("");
  const [ga, setGa] = useState(null);

  useEffect(() => {
    profileActions.getGAHash().then(setGa);
  }, []);


  return (
    <UI.Modal isOpen={true} onClose={props.onClose} width={424}>
      <UI.ModalHeader>
        {utils.getLang('site__authModalTitle')}
      </UI.ModalHeader>
      { ga ? (
        <div className="GoogleCodeModal">
          <p className="GoogleCodeModal__description">{utils.getLang('site__authModalContentGA')}</p>
          <img className="GoogleCodeModal__qr_code" src={ga.url} alt="GA QR Code" />
          <UI.Clipboard className="GoogleCodeModal__hash" text={ga.hash} />
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
              copyText(ga.hash).then(() => {
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
      ) : (
        <div className="GoogleCodeModal">
          <LoadingStatus inline status="loading" />
        </div>
      )}
    </UI.Modal>
  )
}

export default connect(state => ({
  router: state.router
}), {
  gaInit: profileActions.gaInit,
  toastPush: toasts.toastPush
})(GoogleCodeModal);
