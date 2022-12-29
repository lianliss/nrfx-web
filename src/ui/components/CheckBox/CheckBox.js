// styles
import "./CheckBox.less";
// external
import React from "react";
import PropTypes from "prop-types";
import SVG from "utils/svg-wrap";
// internal
import { classNames } from "../../utils";

function CheckBox(props) {
  const className = classNames({
    CheckBox: true,
    checked: props.checked,
    disabled: props.disabled
  }, props.type);

  return (
    <div className={className} onClick={() => props.onChange(!props.checked)}>
      <div className="CheckBox__indicator">
        <div className="CheckBox__indicator__active">
          <SVG src={require("../../asset/check_16.svg")} />
        </div>
      </div>
      <div className="CheckBox__label">{props.children}</div>
    </div>
  );
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['default', 'simple']),
};

CheckBox.defaultProps = {
  type: 'default',
};

export default React.memo(CheckBox);
