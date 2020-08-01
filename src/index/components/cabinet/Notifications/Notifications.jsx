import "./Notifications.less";

import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, ContentBox } from "../../../../ui";
import HistoryTable from "../../../containers/cabinet/CabinetWalletScreen/components/HistoryTable/HistoryTable";
import { notificationsSelector } from "../../../../selectors";
import { loadNotifications } from "../../../../actions/cabinet/notifications";
import LoadingStatus from "../LoadingStatus/LoadingStatus";
import Lang from "../../../../components/Lang/Lang";

export default ({ onClose }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();

  const { history, loading } = useSelector(notificationsSelector);
  const historyLength = useRef(history.items.length);

  useEffect(() => {
    !historyLength.current && dispatch(loadNotifications());
  }, [historyLength, dispatch]);

  const handlePressEsc = e => {
    if (e.keyCode === 27) {
      onClose && onClose(e);
    }
  };

  const handleClick = e => {
    if (scrollRef?.current && !scrollRef.current.contains(e.target)) {
      onClose && onClose(e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handlePressEsc, false);
    document.addEventListener("click", handleClick, false);

    return () => {
      document.removeEventListener("keydown", handlePressEsc, false);
      document.removeEventListener("click", handleClick, false);
    };
  }, [handlePressEsc]);

  return (
    <ContentBox className="Notifications">
      <div ref={scrollRef} className="Notifications__scroll">
        {loading && !history.items.length ? (
          <LoadingStatus status="loading" />
        ) : (
          <div>
            <HistoryTable history={history.items} />

            {history.next && (
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
            )}
          </div>
        )}
      </div>
    </ContentBox>
  );
};
