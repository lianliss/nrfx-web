import "./Label.less";

import React from "react";
import { classNames as cn, ucfirst } from "src/utils";

export default props => {
  return (
    <span className={cn("Label", props.type ? props.type.toLowerCase() : null)}>
      {props.title || ucfirst(props.type)}
    </span>
  );
};
