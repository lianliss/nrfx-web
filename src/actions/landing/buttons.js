import * as actions from "../index";
import * as steps from "../../components/AuthModal/fixtures";
import store from "../../store";
import router from "../../router";
import * as pages from "../../index/constants/pages";

export const singUp = () => {
  const user = store.getState().default.profile.user;
  if (user) {
    router.navigate(pages.PARTNERS);
  } else {
    actions.openModal("auth", { type: steps.REGISTRATION });
  }
};

export const swap = () => {
  // TODO Set swap state
  const user = store.getState().default.profile.user;
  if (user) {
    router.navigate(pages.FIAT);
  } else {
    actions.openModal("auth", { type: steps.REGISTRATION });
  }
};
