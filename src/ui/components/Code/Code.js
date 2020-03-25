import React from "react";
import Highlight from "react-highlight.js";
import { classNames as cn } from "../../utils";

import "./Code.less";

const Code = props => {
  if (props.simple) {
    return <div className={cn("Code", props.className)}>{props.children}</div>;
  }
  return (
    <Highlight className={cn("Code", props.className)} language={props.lang}>
      {props.children}
    </Highlight>
  );
};

export default React.memo(Code);
