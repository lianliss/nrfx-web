import React from 'react';

import TestModalFirst from '../../../components/cabinet/TestModalFirst/TestModalFirst';
import TestModalSecond from '../../../components/cabinet/TestModalSecond/TestModalSecond';
import TestModalThird from '../../../components/cabinet/TestModalThird/TestModalThird';

// wallets
import SendCoinsModal from '../../../components/cabinet/SendCoinsModal/SendCoinsModal';
import ReceiveCoinsModal from '../../../components/cabinet/ReceiveCoinsModal/ReceiveCoinsModal';
import WalletTransactionModal from '../../../components/cabinet/WalletTransactionModal/WalletTransactionModal';
import SendCoinsConfirmModal from '../../../components/cabinet/SendCoinsConfirmModal/SendCoinsConfirmModal';

// investments
import OpenDepositModal from '../../../components/cabinet/OpenDepositModal/OpenDepositModal';
import DepositInfoModal from '../../../components/cabinet/DepositInfoModal/DepositInfoModal';

// settings
import GAConfirmModal from '../../../components/cabinet/GAConfirmModal/GAConfirmModal';
import ChangeEmailModal from '../../../components/cabinet/ChangeEmailModal/ChangeEmailModal';
import ChangeNumberModal from '../../../components/cabinet/ChangeNumberModal/ChangeNumberModal';

import ModalPage from '../ModalPage/ModalPage';

import * as modalGroupActions from '../../../actions/modalGroup';
import * as modalGroupConstant from '../../../constants/modalGroup';

import router from '../../../router';

import {connect} from "react-redux";

const ModalGroupRoutes = {
  start_profile: {
    first: {children: TestModalFirst},
    second: {children: TestModalSecond},
    third: {children: TestModalThird}
  },
  cabinet_wallet: {
    send: {
      children: SendCoinsModal,
      onCloseHandler: () => {
        if (!router.getState().params.hasOwnProperty(modalGroupConstant.MODALGROUP_GET_PARAM)) {
          modalGroupActions.setStateByModalPage('send', {
            selectedWallet: false,
            currency: 'btc',
            loadingStatus: '',
            wallets: [],
            amount: 0,
            amountUSD: 0,
            address: ''
          });
        }
      }},
    confirm: {
      children: SendCoinsConfirmModal
    },
    receive: {children: ReceiveCoinsModal},
    transaction: {children: WalletTransactionModal,}
  },
  investments: {
    deposit_info: {children: DepositInfoModal},
    open_deposit: {children: OpenDepositModal}
  },
  settings: {
    ga_confirm: {children: GAConfirmModal},
    change_email: {children: ChangeEmailModal},
    change_number: {children: ChangeNumberModal},
  }
};

class ModalGroup extends React.Component {
  constructor(props) {
    super(props);

    this.modalGroup = [];
    this.routeState = props.router.getState();
    if (modalGroupConstant.MODALGROUP_GET_PARAM in this.routeState.params) {
      this.__checkAllow();
      if (this.routeState.params[modalGroupConstant.MODALGROUP_GET_PARAM].length > 0) {
        this.modalGroup = this.routeState.params[modalGroupConstant.MODALGROUP_GET_PARAM]
          .split(modalGroupConstant.MODALGROUP_SEPARATOR);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!(nextProps.router.getState().name in ModalGroupRoutes)) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    document.addEventListener("keyup", this.__keyListener);
    const lastModalPage = this.modalGroup.slice().pop();
    if (lastModalPage !== undefined && Object.keys(ModalGroupRoutes[this.__getRouteName()]).indexOf(lastModalPage) > -1) {
      this.props.modalGroupSetActiveModal(lastModalPage);
    } else {
      this.__routerNavigateToBaseModuleLink();
    }
  }

  componentWillUnmount () {
    document.removeEventListener("keyup", this.__keyListener);
  }

  render() {
    if (!(this.__getRouteName() in ModalGroupRoutes)) {
      return '';
    }
    return <div className="ModalGroup">
      {this.__getComponents().map(modalPage => {
        return modalPage.props.id !== this.props.activeModal || modalPage;
      })}
    </div>;
  }

  __getComponents = () => {
    const components = [];
    Object.keys(ModalGroupRoutes[this.__getRouteName()]).forEach((modalPage, i) => {
      components.push(
        <ModalPage
          id={modalPage}
          key={modalPage + i}
          close={this.__close}
          openModalPage={modalGroupActions.openModalPage}
          {...ModalGroupRoutes[this.__getRouteName()][modalPage]}
          {...this.props}
        />
      )
    });
    return components;
  };

  __getRouteName = () => {
    return this.props.router.getState().name;
  };

  __routerNavigateToBaseModuleLink = () => {
    this.props.router.navigate(this.__getRouteName());
  };

  __checkAllow = () => {
    if (!(this.__getRouteName() in ModalGroupRoutes)) {
      return this.__routerNavigateToBaseModuleLink();
    }
  };

  __getPrevModal = () => {
    const routerParams = {...this.props.router.getState().params};
    if (!(modalGroupConstant.MODALGROUP_GET_PARAM in routerParams)) {
      return {};
    }
    let modal_group = routerParams[modalGroupConstant.MODALGROUP_GET_PARAM].split(
      modalGroupConstant.MODALGROUP_SEPARATOR
    );
    if (modal_group.length > 1) {
      modal_group.pop();
      let modal = modal_group[modal_group.length - 1];
      modal_group = modal_group.join(modalGroupConstant.MODALGROUP_SEPARATOR);
      routerParams[modalGroupConstant.MODALGROUP_GET_PARAM] = modal_group;
      return {
        params: routerParams,
        modal
      };
    } else {
      delete routerParams[modalGroupConstant.MODALGROUP_GET_PARAM];
      return {
        params: routerParams,
        modal: null
      };
    }
  };

  __close = () => {
    const prevModal = this.__getPrevModal();
    if (Object.keys(prevModal).length < 1) {
      return;
    }
    const {name, params} = {...this.props.router.getState()};
    if ('rp' in params) {
      const rp = params.rp.split(modalGroupConstant.MODALGROUP_SEPARATOR);
      rp.push('rp');
      rp.forEach(param => {
        if (param in prevModal.params) {
          delete prevModal.params[param];
        }
      });
    }
    this.props.router.navigate(name, prevModal.params, () => {
      this.props.modalGroupSetActiveModal(prevModal.modal);
    });
  };

  __keyListener = e => {
    e = e || window.event;
    switch (e.keyCode) {
      default:break;
      case 27:
        this.__close();
        break;
    }
  };
}

const mapStateToProps = (state) => ({...state.modalGroup});

export default connect(mapStateToProps, {
  modalGroupSetActiveModal: modalGroupActions.modalGroupSetActiveModal
})(React.memo(ModalGroup));