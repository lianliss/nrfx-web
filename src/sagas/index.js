import { all } from "redux-saga/effects";

import { rootWalletSaga } from "./wallet";
import { rootNotificationsSaga } from "./notifications";

export default function* rootSaga() {
  yield all([rootWalletSaga(), rootNotificationsSaga()]);
}
