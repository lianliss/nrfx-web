import './SecretKeyInfoModal.less';

import React from 'react';
import UI from '../../../../ui';
import * as utils from '../../../../utils';

export default class SecretKeyInfoModal extends React.Component {
  render() {
    const email = "support@bitcoinbot.pro";
    return (
      <UI.Modal isOpen={true} className="SecretKeyInfoModal__wrapper" onClose={() => {this.props.close()}}>
        <UI.ModalHeader>{utils.getLang('global_attention')}</UI.ModalHeader>
        <div className="SecretKeyInfoModal">
          <div className="SecretKeyInfoModal__content">
            <p>{utils.getLang("cabinet_secretKeyInfoModalText1")}</p>
            <p>
              {utils.getLang("cabinet_secretKeyInfoModalText2")} <a href={"mailto:"+email}>{email}</a> {utils.getLang("cabinet_secretKeyInfoModalText3")}
            </p>
            <UI.Button onClick={() => {this.props.close()}}>{utils.getLang("global_understand")}</UI.Button>
          </div>
        </div>
      </UI.Modal>
    )
  }
}