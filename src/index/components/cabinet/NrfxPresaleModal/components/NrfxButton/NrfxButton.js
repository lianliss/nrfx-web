import "./NrfxButton.less";

import React from "react";
import { classNames as cn } from "src/utils";

export default props => (
  <button
    disabled={props.disabled || props.state === "loading"}
    onClick={props.onClick}
    className={cn("NrfxButton", props.size, props.state, props.className, {
      active: props.active
    })}
    children={props.children}
  />
);
