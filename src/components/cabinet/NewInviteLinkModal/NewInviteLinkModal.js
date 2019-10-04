import React, {memo} from 'react';
import UI from '../../../ui';

import * as utils from '../../../utils';
import apiSchema from '../../../services/apiSchema';
import * as api from '../../../services/api';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import * as toastsActions from '../../../actions/cabinet/toasts';
import * as profileActions from '../../../actions/cabinet/profile';

class NewInviteLinkModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isFailed: false,
      isLoading: false
    };
  }

  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => window.history.back()} width={384}>
        <UI.ModalHeader>
          New Link
        </UI.ModalHeader>
        <div className="ChangeEmailModal__input_wrapper">
          <UI.Input
            placeholder="Enter Link Name"
            value={this.state.name}
            onTextChange={(name) => this.setState({ name, isFailed: false })}
            autoComplete="off"
            error={this.state.isFailed}
            ref="name"
            autoFocus
          />
        </div>
        <div className="ChangeEmailModal__submit_wrapper">
          <UI.Button onClick={this.__buttonDidPress} state={this.state.isLoading ? 'loading' : ''}>
            {utils.getLang('cabinet_settingsSave')}
          </UI.Button>
        </div>
      </UI.Modal>
    )
  }

  __buttonDidPress = () => {
    const name = this.state.name.trim();
    if (!name.length) {
      this.refs['name'].focus();
      return this.setState({ isFailed: true });
    }

    this.setState({ isLoading: true });
    this.props.createInviteLink(name).then(() => {
      window.history.back();
      this.props.toastPush('Link created', 'success');
    }).catch((err) => {
      this.setState({ isLoading: false });
      this.props.toastPush(err.message, 'error')
    });
  };
}

export default connect(() => ({}), {
  toastPush: toastsActions.toastPush,
  createInviteLink: profileActions.createInviteLink,
})(memo(NewInviteLinkModal));
