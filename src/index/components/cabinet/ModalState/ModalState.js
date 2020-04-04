import "./ModalState.less";

import React from "react";
import * as UI from "../../../../ui";

import * as utils from "../../../../utils";
import LoadingStatus from "../LoadingStatus/LoadingStatus";

export default function ModalState({
  status,
  className,
  icon,
  description,
  onRetry
}) {
  return (
    <UI.Modal
      isOpen
      className={className}
      skipClose={status === "loading"}
      onClose={() => window.history.back()}
    >
      <div
        className={utils.classNames({
          ModalState: true,
          [status]: true
        })}
      >
        <LoadingStatus
          icon={icon}
          status={status}
          description={description}
          inline
          onRetry={onRetry}
        />
      </div>
    </UI.Modal>
  );
}
