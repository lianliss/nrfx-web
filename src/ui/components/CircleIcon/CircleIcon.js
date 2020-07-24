import "./CircleIcon.less";
import "../Skeleton/Skeleton.less";

import React from "react";
import hexToRgba from "hex-to-rgba";
import SVG from "react-inlinesvg";
import { classNames as cn } from "../../utils";
import { getCssVar } from "../../../utils";

export default props => {
  const {
    currency,
    icon,
    className,
    size,
    color,
    skeleton = false,
    shadow = true
  } = props;
  if (skeleton) {
    return <div className={cn("CircleIcon", size, className, { skeleton })} />;
  }
  return (
    <div
      className={cn("CircleIcon", size, className, { color: !!color })}
      style={
        currency
          ? {
              background: currency.background,
              boxShadow:
                shadow &&
                `0px 4px 8px ${hexToRgba(currency.color || "#AAA", 0.3)}`,
              color: "white"
            }
          : {
              color: color ? getCssVar("--" + color) : null
            }
      }
    >
      {icon ? (
        <SVG src={icon} />
      ) : (
        currency &&
        currency.icon && (
          <div
            className="CircleIcon__icon"
            style={{ backgroundImage: `url(${currency.icon}` }}
          />
        )
      )}
    </div>
  );
};
