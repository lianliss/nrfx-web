import "./Notifications.less";

import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, ContentBox } from "../../../../ui";
import HistoryTable from "../../../containers/cabinet/CabinetWalletScreen/components/HistoryTable/HistoryTable";
import { notificationsSelector } from "../../../../selectors";
import { loadNotifications } from "../../../../actions/cabinet/notifications";
import LoadingStatus from "../LoadingStatus/LoadingStatus";
import Lang from "../../../../components/Lang/Lang";

export default () => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const { history, loading } = useSelector(notificationsSelector);
  const historyLength = useRef(history.items.length);

  useEffect(() => {
    !historyLength.current && dispatch(loadNotifications());
  }, [historyLength, dispatch]);

  return (
    <ContentBox className="Notifications">
      <div ref={scrollRef} className="Notifications__scroll">
        {loading && !history.items.length ? (
          <LoadingStatus status="loading" />
        ) : (
          <div>
            <HistoryTable history={history.items} />
            <div className="Notifications__buttonWrapper">
              <Button
                onClick={() => {
                  dispatch(loadNotifications());
                }}
                size="middle"
                state={loading && "loading"}
                type="secondary"
              >
                <Lang name="cabinet_loadingMore_more" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </ContentBox>
  );
};
