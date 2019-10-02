// styles
// external
import React from 'react';
// internal
import ModalPage from '../ModalPage/ModalPage';
import * as modalGroupActions from '../../../actions/modalGroup';
import * as modalGroupHandlers from '../../../actions/modalGroupHandlers';
import * as modalGroupConstants from '../../../constants/modalGroup';
import * as storeUtils from "../../../storeUtils";
import * as CLASSES from "../../../constants/classes";

class ModalGroup extends React.Component {
  constructor(props) {
    super(props);
    this.modalGroup = [];
    this.routeState = props.router.getState();
    if (modalGroupConstants.MODALGROUP_GET_PARAM in this.routeState.params) {
      this.__checkAllow();
      if (this.routeState.params[modalGroupConstants.MODALGROUP_GET_PARAM].length > 0) {
        this.modalGroup = this.routeState.params[modalGroupConstants.MODALGROUP_GET_PARAM]
          .split(modalGroupConstants.MODALGROUP_SEPARATOR);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (!(nextProps.router.getState().name in this.props.modalGroupRoutes)) {
      return false;
    }
    return true;
  }

  componentDidMount() {
    document.addEventListener("keyup", this.__keyListener);
    const lastModalPage = this.modalGroup.slice().pop();
    if (lastModalPage !== undefined && Object.keys(this.props.modalGroupRoutes[this.__getRouteName()]).indexOf(lastModalPage) > -1) {
      this.props.modalGroupSetActiveModal(lastModalPage);
    } else {
      this.__routerNavigateToBaseModuleLink();
    }
  }

  componentWillUnmount () {
    document.removeEventListener("keyup", this.__keyListener);
  }

  render() {
    if (!(this.__getRouteName() in this.props.modalGroupRoutes)) {
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
    Object.keys(this.props.modalGroupRoutes[this.__getRouteName()]).forEach((modalPage, i) => {
      components.push(
        <ModalPage
          adaptive={this.props.adaptive}
          id={modalPage}
          key={modalPage + i}
          close={this.__close}
          onCloseHandler={() => (modalGroupHandlers.closeHandler(modalPage))}
          openModalPage={modalGroupActions.openModalPage}
          {...this.props.modalGroupRoutes[this.__getRouteName()][modalPage]}
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
    if (!(this.__getRouteName() in this.props.modalGroupRoutes)) {
      return this.__routerNavigateToBaseModuleLink();
    }
  };

  __getPrevModal = () => {
    const routerParams = {...this.props.router.getState().params};
    if (!(modalGroupConstants.MODALGROUP_GET_PARAM in routerParams)) {
      return {};
    }
    let modal_group = routerParams[modalGroupConstants.MODALGROUP_GET_PARAM].split(
      modalGroupConstants.MODALGROUP_SEPARATOR
    );
    if (modal_group.length > 1) {
      modal_group.pop();
      let modal = modal_group[modal_group.length - 1];
      modal_group = modal_group.join(modalGroupConstants.MODALGROUP_SEPARATOR);
      routerParams[modalGroupConstants.MODALGROUP_GET_PARAM] = modal_group;
      return {
        params: routerParams,
        modal
      };
    } else {
      delete routerParams[modalGroupConstants.MODALGROUP_GET_PARAM];
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
      const rp = params.rp.split(modalGroupConstants.MODALGROUP_SEPARATOR);
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

export default storeUtils.getWithState(
  CLASSES.COMPONENT_MODALGROUP,
  ModalGroup
);