// styles
import "./Button.less";
// external
import React from "react";
import PropTypes from "prop-types";
// internal
import { classNames } from "../../utils";

const ButtonWrapper = props => (
  <div className={classNames("ButtonWrapper", props.className, props.align)}>
    {props.children}
  </div>
);

function Button(props) {
  const className = classNames(props.className, {
    Button: true,
    [props.size]: !!props.size,
    disabled: props.disabled || props.state === "disabled",
    [props.type]: !!props.type,
    [props.newClass]: !!props.newClass,
    rounded: props.rounded,
    forCabinet: !!props.forCabinet,
    smallPadding: props.smallPadding,
    [props.state]: !!props.state
  });

  const getBackground = () => {
    const { gradient } = props.currency;
    if (gradient) {
      return `linear-gradient(45deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`;
    } else {
      return props.currency.color;
    }
  };

  const fillStyle = {};

  if (props.type === "normal") {
    fillStyle.background = getBackground();
    fillStyle.color = "white";
  }

  if (props.type === "outline") {
    fillStyle.background = getBackground();
    fillStyle.color = props.currency.color;
  }

  if (props.type === "lite") {
    fillStyle.color = props.currency.color;
  }

  return (
    <button
      className={className}
      onClick={e => props.onClick && props.onClick(e)}
      style={{ ...fillStyle, ...props.style }}
      type={props.btnType}
      title={props.title}
    >
      {props.state === "loading" && <div className="Button__loader"></div>}
      <div className="Button__cont">
        {props.beforeContent}
        <div
          className="Button__label"
          style={props.fontSize ? { fontSize: props.fontSize } : {}}
        >
          {props.children}
        </div>
        {props.afterContent}
      </div>
    </button>
  );
}

Button.defaultProps = {
  type: "normal",
  size: "large",
  btnType: "button",
  currency: {}
};

Button.propTypes = {
  size: PropTypes.oneOf([
    "middle",
    "small",
    "large",
    "extra_large",
    "ultra_small"
  ]),
  type: PropTypes.oneOf([
    "normal",
    "secondary",
    "outline",
    "negative",
    "negative_outline",
    "outline_white",
    "sell",
    "buy",
    "danger",
    "success",
    "primary"
  ]),
  currency: PropTypes.object,
  className: PropTypes.string,
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  beforeContent: PropTypes.node,
  afterContent: PropTypes.node,
  smallPadding: PropTypes.bool,
  title: PropTypes.string,
  state: PropTypes.oneOf(["default", "loading", "disabled", ""])
};

export default React.memo(Button);

ButtonWrapper.propTypes = {
  align: PropTypes.oneOf(["left", "center", "right", "fill"])
};

export { ButtonWrapper };
