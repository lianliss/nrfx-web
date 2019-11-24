import React from 'react';
import UI from '../../../../ui';
import * as modalGroupActions from '../../../../actions/modalGroup';
import RateDetailsModal from '../RateDetailsModal/RateDetailsModal';

export default class ChangeNumberModal extends React.Component {


  render() {
    return (
      <UI.Modal isOpen={true} onClose={() => {this.props.close()}} width={424}>
        <div onClick={() => {
          modalGroupActions.openModalPage(null, {}, {
            children: RateDetailsModal,
            params: {
              currency: this.state.currency,
              plans: this.state.plans.map(p => p[this.state.selectDepositType])
            }
          })
        }}>123</div>
      </UI.Modal>
    )
  }
}