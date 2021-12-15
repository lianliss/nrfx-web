import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  HistoryItem,
  Message,
  NumberFormat,
  WalletAddress
} from "../../../../ui";
import Lang from "../../../../components/Lang/Lang";
import { getCurrencyInfo, openModal } from "../../../../actions";
import { getLang, ucfirst } from "src/utils/index";

import SwitchIcon from "src/asset/24px/loop.svg";
import SendIcon from "src/asset/24px/send.svg";
import ClockIcon from "src/asset/24px/clock.svg";
import ReceiveIcon from "src/asset/24px/receive.svg";
import AttentionIcon from "src/asset/24px/attention.svg";
import { notificationMarkAsRead } from "../../../../actions/cabinet/notifications";

export default memo(({ item }) => {
  const dispatch = useDispatch();

  const {
    type,
    status,
    amount,
    address,
    unread,
    bank_code: bankCode,
    primary_amount: primaryAmount,
    secondary_amount: secondaryAmount,
    browser_name: browserName,
    browser_version: browserVersion,
    ip_address: ipAddress,
    // is_mobile: isMobile,
    is_mobile_application: isMobileApplication,
    platform_name: platformName
    // platform_version: platformVersion
  } = item;

  const handleClick = useCallback(() => {
    if (item.unread) {
      dispatch(notificationMarkAsRead(item.id));
    }
    openModal("operation", null, {
      operation: item
    });
  }, [dispatch, item]);

  const primaryCurrency = getCurrencyInfo(
    item?.primary_currency || item?.currency
  );
  const secondaryCurrency = getCurrencyInfo(item?.secondary_currency);

  switch (type) {
    case "withdrawal":
      return (
        <HistoryItem
          unread={unread}
          onClick={handleClick}
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
          onClick={handleClick}
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
          onClick={handleClick}
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
          onClick={handleClick}
          icon={<ReceiveIcon />}
          label={<Lang name="cabinet__historyItemTitle_transfer_receive" />}
          header={<WalletAddress isUser address={address} />}
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
    case "refill":
      return (
        <HistoryItem
          unread={unread}
          type="success"
          onClick={handleClick}
          icon={status === "pending" ? <ClockIcon /> : <ReceiveIcon />}
          label={<Lang name="cabinet__historyItemTitle_refill" />}
          header={ucfirst(bankCode)}
          headerSecondary={
            <NumberFormat
              color
              symbol
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
          onClick={handleClick}
          type={status}
          icon={status === "pending" ? <ClockIcon /> : <ReceiveIcon />}
          label={<Lang name="cabinet__historyItemTitle_transfer_receive" />}
          header={address}
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
    case "swap":
    case "buy_token":
      return (
        <HistoryItem
          unread={unread}
          onClick={handleClick}
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
          onClick={handleClick}
          type="failed"
          icon={<ReceiveIcon />}
          label={
            <Lang name="cabinet__historyItemTitle_bank_card_refill_reject" />
          }
          status="rejected"
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
          onClick={handleClick}
          type="primary"
          icon={<AttentionIcon />}
          header={<Lang name="cabinet__historyItemTitle_user_authorize" />}
          smallText={
            <Lang
              name="cabinet__historyItemTitle_user_authorize_text"
              params={{
                device: isMobileApplication
                  ? [
                      [
                        getLang("global_applicationFor", true),
                        platformName
                      ].join(", "),
                      getLang("global_ipAddress", true) + ": " + ipAddress
                    ].join(", ")
                  : [
                      [
                        getLang("global_webSite", true),
                        browserName,
                        browserVersion
                      ].join(" "),
                      getLang("global_ipAddress", true) + ": " + ipAddress
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
