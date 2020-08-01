import React, { memo } from "react";
import {
  HistoryItem,
  Message,
  NumberFormat,
  WalletAddress
} from "../../../../ui";
import Lang from "../../../../components/Lang/Lang";
import { getCurrencyInfo } from "../../../../actions";
import { getLang, ucfirst } from "src/utils/index";

import { ReactComponent as SwitchIcon } from "src/asset/24px/loop.svg";
import { ReactComponent as SendIcon } from "src/asset/24px/send.svg";
import { ReactComponent as ClockIcon } from "src/asset/24px/clock.svg";
import { ReactComponent as ReceiveIcon } from "src/asset/24px/receive.svg";
import { ReactComponent as AttentionIcon } from "src/asset/24px/attention.svg";

export default memo(({ item, onClick }) => {
  console.log(item.type, item);

  const {
    type,
    status,
    amount,
    address,
    unread,
    bank_code: bankCode,
    primary_amount: primaryAmount,
    secondary_amount: secondaryAmount,
    data
  } = item;

  const primaryCurrency = getCurrencyInfo(
    item?.primary_currency || item?.currency
  );
  const secondaryCurrency = getCurrencyInfo(item?.secondary_currency);

  switch (type) {
    case "withdrawal":
      return (
        <HistoryItem
          unread={unread}
          onClick={onClick}
          type={status}
          icon={status === "pending" ? <ClockIcon /> : <SendIcon />}
          label={<Lang name="cabinet_fiatWithdrawalModal_title" />}
          // status={status}
          header={ucfirst(bankCode)}
          headerSecondary={
            <NumberFormat
              color={status === "failed"}
              number={-amount}
              currency={primaryCurrency.abbr}
            />
          }
        />
      );
    case "transaction_send":
      return (
        <HistoryItem
          unread={unread}
          onClick={onClick}
          type={status}
          icon={status === "pending" ? <ClockIcon /> : <SendIcon />}
          label={<Lang name="cabinet__historyItemTitle_transfer_send" />}
          // status={status}
          header={<WalletAddress address={address} />}
          headerSecondary={
            <NumberFormat number={-amount} currency={primaryCurrency.abbr} />
          }
        />
      );
    case "transfer_send":
      return (
        <HistoryItem
          unread={unread}
          onClick={onClick}
          icon={<SendIcon />}
          label={<Lang name="cabinet__historyItemTitle_transfer_send" />}
          header={<WalletAddress isUser address={address} />}
          headerSecondary={
            <NumberFormat number={-amount} currency={primaryCurrency.abbr} />
          }
        />
      );
    case "transfer_receive":
      return (
        <HistoryItem
          unread={unread}
          type="success"
          onClick={onClick}
          icon={<ReceiveIcon />}
          label={<Lang name="cabinet__historyItemTitle_transfer_receive" />}
          header={<WalletAddress isUser address={address} />}
          headerSecondary={
            <NumberFormat
              color
              number={amount}
              currency={primaryCurrency.abbr}
            />
          }
        />
      );
    case "refill":
      return (
        <HistoryItem
          unread={unread}
          type="success"
          onClick={onClick}
          icon={status === "pending" ? <ClockIcon /> : <ReceiveIcon />}
          label={<Lang name="cabinet__historyItemTitle_refill" />}
          header={ucfirst(bankCode)}
          headerSecondary={
            <NumberFormat
              color
              number={amount}
              currency={primaryCurrency.abbr}
            />
          }
        />
      );
    case "transaction_receive":
      return (
        <HistoryItem
          unread={unread}
          onClick={onClick}
          type={status}
          icon={status === "pending" ? <ClockIcon /> : <ReceiveIcon />}
          label={<Lang name="cabinet__historyItemTitle_transfer_receive" />}
          header={address}
          headerSecondary={
            <NumberFormat
              color
              number={amount}
              currency={primaryCurrency.abbr}
            />
          }
        />
      );
    case "swap":
    case "buy_token":
      return (
        <HistoryItem
          unread={unread}
          onClick={onClick}
          type="primary"
          icon={<SwitchIcon />}
          label={<Lang name="cabinet__historyItemTitle_swap" />}
          header={
            <NumberFormat
              symbol
              number={-primaryAmount}
              currency={primaryCurrency.abbr}
            />
          }
          headerSecondary={
            <NumberFormat
              symbol
              color
              number={secondaryAmount}
              currency={secondaryCurrency.abbr}
            />
          }
          smallText={
            <Lang
              name="cabinet_historyItem_got"
              params={{ currency: primaryCurrency.name }}
            />
          }
          smallTextSecondary={
            <Lang
              name="cabinet_historyItem_gave"
              params={{ currency: secondaryCurrency.name }}
            />
          }
        />
      );
    case "bank_card_refill_reject":
      return (
        <HistoryItem
          unread={unread}
          onClick={onClick}
          type="failed"
          icon={<ReceiveIcon />}
          label={
            <Lang name="cabinet__historyItemTitle_bank_card_refill_reject" />
          }
          status="failed"
          header={
            <NumberFormat
              symbol
              number={primaryAmount}
              currency={primaryCurrency.abbr}
            />
          }
          headerSecondary={
            <NumberFormat
              symbol
              color
              number={amount}
              currency={primaryCurrency.abbr}
            />
          }
        />
      );
    case "user_authorize":
      return (
        <HistoryItem
          unread={unread}
          onClick={onClick}
          type="primary"
          icon={<AttentionIcon />}
          header={<Lang name="cabinet__historyItemTitle_user_authorize" />}
          // browser_name: "Chrome"
          // browser_version: "83.0.4103.116"
          // ip_address: "175.158.49.148"
          // is_mobile: false
          // is_mobile_application: false
          // platform_name: "OS X"
          // platform_version: "10.15.2"

          smallText={
            <Lang
              name="cabinet__historyItemTitle_user_authorize_text"
              params={{
                device: data.is_mobile_application
                  ? [
                      [
                        getLang("global_applicationFor", true),
                        data.platform_name
                      ].join(", "),
                      getLang("global_ipAddress", true) + ": " + data.ip_address
                    ].join(", ")
                  : [
                      [
                        getLang("global_webSite", true),
                        data.browser_name,
                        data.browser_version
                      ].join(" "),
                      getLang("global_ipAddress", true) + ": " + data.ip_address
                    ].join(", ")
              }}
            />
          }
          headerSecondary={
            <NumberFormat
              symbol
              color
              number={amount}
              currency={primaryCurrency.abbr}
            />
          }
        />
      );
    default:
      return <Message type="error">Error type "{type}"</Message>;
  }
});
