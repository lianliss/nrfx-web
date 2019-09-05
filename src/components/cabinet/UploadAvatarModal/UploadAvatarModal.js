import './UploadAvatarModal.less';

import React from 'react';
import UI from '../../../ui';
import "./UploadAvatarModal.less";

import UploadAvatar from './components/uploadAvatar';

export default class UploadAvatarModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => {this.props.close()}} width={384}>
        <UI.ModalHeader>
          Upload Photo
        </UI.ModalHeader>
        {this.__renderContent()}
      </UI.Modal>
    )
  }

  __renderContent() {
    return (
      <div>
        <UploadAvatar />
      </div>
    )
  }

  __handleSubmit = () => {

  }
}