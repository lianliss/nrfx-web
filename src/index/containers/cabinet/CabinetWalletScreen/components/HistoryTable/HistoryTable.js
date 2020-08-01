import "./HistoryTable.less";

import React from "react";
import moment from "moment";

import * as UI from "../../../../../../ui";
import * as utils from "../../../../../../utils";
import { classNames as cn } from "../../../../../../utils";
import { openModal } from "../../../../../../actions";
import EmptyContentBlock from "../../../../../components/cabinet/EmptyContentBlock/EmptyContentBlock";
import LoadingStatus from "../../../../../components/cabinet/LoadingStatus/LoadingStatus";
import HistoryItemWidget from "../../../../../components/cabinet/HistoryItemWidget/HistoryItemWidget";

const formatDate = time => {
  if (time > Date.now() - 2 * 24 * 60 * 60 * 1000) {
    return moment(time).fromNow();
  } else if (new Date(time).getFullYear() === new Date().getFullYear()) {
    return utils.dateFormat(time, "DD MMMM");
  } else {
    return utils.dateFormat(time, "DD MMMM YYYY");
  }
};

export default ({ history, status, header }) => {
  const transactions = history
    .map(t => ({
      ...t,
      group: formatDate(t.created_at * 1000)
    }))
    .reduce((r, a) => {
      r[a.group] = [...(r[a.group] || []), a];
      return r;
    }, {});

  if (status) {
    return (
      <UI.ContentBox className="HistoryTable">
        <LoadingStatus status={status} />
      </UI.ContentBox>
    );
  }

  if (!history.length) {
    return (
      <EmptyContentBlock
        icon={require("src/asset/120/clock.svg")}
        message={utils.getLang("cabinet_noFiatHistory")}
      />
    );
  }

  return (
    <UI.ContentBox className="HistoryTable">
      {header && <div className="HistoryTable__header">{header}</div>}
      {Object.keys(transactions).map(key => (
        <div key={key} className="HistoryTable__group">
          <div
            className={cn("HistoryTable__group__title", {
              unread: transactions[key][0].unread
            })}
          >
            {utils.ucfirst(key)}
          </div>
          {transactions[key].map(item => (
            <HistoryItemWidget key={item.type + item.id} item={item} />
          ))}
        </div>
      ))}
    </UI.ContentBox>
  );
};
