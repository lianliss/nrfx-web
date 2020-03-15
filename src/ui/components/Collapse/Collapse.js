import "./Collapse.less";

import React, { useState } from "react";
import SVG from "react-inlinesvg";
import PropTypes from "prop-types";

import ContentBox from "../ContentBox/ContentBox";
import { classNames as cn } from "../../utils/index";

const Collapse = props => {
  const [isOpenState, toggle] = useState(props.isOpenDefault);

  const handleToggle = () => {
    if (props.isOpen === undefined) {
      toggle(!isOpenState);
    } else if (props.onChange) {
      props.onChange(!props.isOpen);
    }
  };

  const isOpen = props.isOpen !== undefined ? props.isOpen : isOpenState;

  return (
    <ContentBox className={cn("Collapse", props.className, { isOpen })}>
      <div className="Collapse__header" onClick={handleToggle}>
        <div className="Collapse__arrow">
          <SVG src={require("../../../asset/24px/angle-down-small.svg")} />
        </div>
        <div className="Collapse__title">{props.title}</div>
        {!!props.controls && (
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            className="Collapse__controls"
          >
            {props.controls}
          </div>
        )}
      </div>
      {isOpen && <div className="Collapse__content">{props.children}</div>}
    </ContentBox>
  );
};

Collapse.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool,
  isOpenDefault: PropTypes.bool,
  title: PropTypes.string,
  controls: PropTypes.arrayOf(PropTypes.element)
};

export default Collapse;
