// styles
import "./Button.less";
// external
import React, { memo } from "react";
import PropTypes from "prop-types";
// internal
import { classNames } from "../../utils";
import SVG from "utils/svg-wrap";

const ButtonWrapper = props => (
  <div className={classNames("ButtonWrapper", props.className, props.align)}>
    {props.children}
  </div>
);

const Button = memo(props => {
  const className = classNames(
    "Button",
    props.className,
    props.type,
    props.size,
    props.newClass,
    props.state,
    {
      disabled: props.disabled || props.state === "disabled",
      forCabinet: props.forCabinet,
      smallPadding: props.smallPadding
    },
    { shadow: props.shadow }
  );

  const fillStyle = {};

  if (props.type === "normal") {
    fillStyle.color = "white";
  }

  const Component = props.href ? 'a' : 'button';

  return (
    <Component
      className={className}
      onClick={e => props.onClick && props.onClick(e)}
      style={{ ...fillStyle, ...props.style }}
      type={props.btnType}
      title={props.title}
      href={props.href}
      target={props.target}
    >
      {props.state === "loading" && (
        <div className="Button__loader">
          <SVG src={require(`../../asset/spinner.svg`)} />
        </div>
      )}
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
    </Component>
  );
});

Button.defaultProps = {
  type: "default",
  size: "large",
  btnType: "button",
  currency: {},
  shadow: false,
};

Button.propTypes = {
  size: PropTypes.oneOf([
    "middle",
    "small",
    "medium",
    "large",
    "extra_large",
    "ultra_small",
    "big"
  ]),
  type: PropTypes.oneOf([
    "default",
    "normal",
    "secondary",
    "negative",
    "sell",
    "buy",
    "danger",
    "success",
    "primary",
    "lite",
    "green",
    "green-light",
    "lightBlue",
    "secondary-lightBlue",
    "primary-blue",
    "gray",
    "secondary-blue",
    "secondary-alice",
    "secondary-light",
    "light",
    "dark",
    "orange",
    "white",
  ]),
  shadow: PropTypes.bool,  
  currency: PropTypes.object,
  className: PropTypes.string,
  btnType: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object,
  beforeContent: PropTypes.node,
  afterContent: PropTypes.node,
  smallPadding: PropTypes.bool,
  title: PropTypes.string,
  state: PropTypes.oneOf(["default", "loading", "disabled", ""]),
};

export default React.memo(Button);

ButtonWrapper.propTypes = {
  align: PropTypes.oneOf(["left", "center", "right", "fill", "justify"])
};

export { ButtonWrapper };