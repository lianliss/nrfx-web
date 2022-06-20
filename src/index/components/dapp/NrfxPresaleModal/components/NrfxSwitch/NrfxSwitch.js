import "./NrfxSwitch.less";

import React from "react";
import NrfxButton from "../NrfxButton/NrfxButton";

export default props => {
  return (
    <div className="NrfxSwitch">
      {props.options.map((b, i) => (
        <NrfxButton
          key={i}
          onClick={() => props.onChange(b.value)}
          size="small"
          active={props.value === b.value}
          children={b.label}
        />
      ))}
    </div>
  );
};
