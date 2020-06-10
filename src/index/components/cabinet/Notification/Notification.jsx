import React from "react";
import * as utils from "../../../../utils";
import * as UI from "../../../../ui";

export default props => {
  let n;
  switch (props.type) {
    case "refill":
      n = {
        title: utils.getLang("cabinet_historyItem_refillTitle", true),
        message: utils
          .getLang("cabinet_historyItem_refillInfo", true)
          .replace("{bankCode}", props.data.bank_code),
        icon: require("src/asset/24px/receive.svg"),
        iconFill: utils.getCssVar("--text-green")
      };
      break;
    case "user_authorize":
      n = {
        title: utils.getLang("cabinet_historyItem_userAuthorizeTitle", true),
        message: utils
          .getLang("cabinet_historyItem_userAuthorizeInfo", true)
          .replace(
            "{device}",
            [props.data.platform_name, props.data.browser_name].join(" ")
          ),
        icon: require("src/asset/24px/attention.svg"),
        iconFill: utils.getCssVar("--primary-orange")
      };
      break;
    case "transaction_receive":
      n = {
        title: utils.getLang(
          "cabinet_historyItem_transactionReceiveTitle",
          true
        ),
        message: utils
          .getLang("cabinet_historyItem_transactionReceiveInfo", true)
          .replace("{user}", props.data.user),
        icon: require("src/asset/24px/receive.svg"),
        iconFill: utils.getCssVar("--text-green")
      };
      break;
    case "withdrawal_reject":
      n = {
        title: utils.getLang("cabinet_historyItem_withdrawalRejectTitle", true),
        message: utils
          .getLang("cabinet_historyItem_withdrawalRejectInfo", true)
          .replace("{address}", props.data.address),
        icon: require("src/asset/24px/send.svg"),
        iconFill: utils.getCssVar("--text-red")
      };
      break;
    case "transfer_receive":
      n = {
        title: utils.getLang("cabinet_historyItem_transferReceiveTitle", true),
        message: utils
          .getLang("cabinet_historyItem_transferReceiveInfo", true)
          .replace("{user}", props.data.address),
        icon: require("src/asset/24px/receive.svg"),
        iconFill: utils.getCssVar("--text-green")
      };
      break;
    default:
      n = {
        title: props.title,
        message: props.message,
        icon: require("src/asset/24px/attention.svg"),
        iconFill: utils.getCssVar("--dark-gray")
      };
      break;
  }

  return (
    <UI.Notification
      icon={n.icon}
      unread={n.unread}
      iconFill={n.iconFill}
      message={utils.getLang(n.title, true)}
      markText={utils.getLang(n.message, true)}
      date={utils.dateFormat(props.created_at, false).fromNow()}
    />
  );
};
