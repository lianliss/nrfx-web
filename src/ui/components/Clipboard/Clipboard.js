import "./Clipboard.less";

import React from "react";
import SVG from "utils/svg-wrap";
import { classNames as cn } from "../../utils";

export default props => {
  return (
    <div
      title={props.title}
      onClick={() => props.onClick(props.text)}
      className={cn("Clipboard", props.className)}
    >
      {props.displayText || props.text}
      {!props.skipIcon && <SVG src={require("src/asset/24px/copy.svg")} />}
    </div>
  );
};
