import "./Block.less";
import React from "react";

import ContentBox from "../../../ui/components/ContentBox/ContentBox";

export default props => {
  return (
    <ContentBox className="Block">
      <div className="Block__title">{props.title}</div>
      <div>{props.children}</div>
    </ContentBox>
  );
};
