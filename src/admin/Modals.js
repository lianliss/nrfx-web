// styles
// external
import React from "react";
import { connect } from "react-redux";
// internal
import router from "../router";
import AuthModal from "../components/AuthModal/AuthModal";
import ConfirmModal from "../index/components/cabinet/ConfirmModal/ConfirmModal";
import { openCloseModal } from "../actions";

function Modals(props) {
  const routerParams = props.route.params;
  delete routerParams.ref;
  const { options } = props.route.meta;
  const modal = routerParams.modal || props.modal.name;

  let Component = false;

  switch (modal) {
    case "test":
      Component = () => <div>Test</div>;
      break;
    case "auth":
      Component = AuthModal;
      break;
    case "confirm":
      Component = ConfirmModal;
      break;
    default:
      return null;
  }

  return (
    <Component
      {...routerParams}
      {...props.modal.params}
      {...options}
      onBack={() => {
        window.history.back();
      }}
      onClose={() => {
        if (props.modal.name) {
          openCloseModal();
        } else {
          router.navigate(props.route.name, {
            ...props.route.params,
            modal: undefined
          });
        }
      }}
    />
  );
}

export default connect(state => ({
  route: state.router.route,
  modal: state.modal
}))(Modals);
