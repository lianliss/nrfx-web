import './SecretKeyDescModal.less';

import React from 'react';
import UI from '../../../ui';
import * as utils from '../../../utils';
import router from '../../../router';

export default class SecretKeyDescModal extends React.Component {
  render() {
    return (
      <UI.Modal isOpen={true} className="SecretKeyDescModal__wrapper" onClose={() => {this.props.close()}}>
        <UI.ModalHeader>{utils.getLang('global_attention')}</UI.ModalHeader>
        <div className="SecretKeyDescModal">
          <UI.MarkDown className="SecretKeyDescModal__content" content={utils.getLang("cabinet_secretKeyDescriptionText")} />
          <div className="SecretKeyDescModal__content">
            <UI.Button onClick={() => {
              router.navigate('profile', { modal_group: 'change_secret_key'});
            }}>{utils.getLang("global_understand")}</UI.Button>
          </div>
        </div>
      </UI.Modal>
    )
  }
}
