import "./CircleIcon.less";

import React from "react";
import hexToRgba from "hex-to-rgba";
import SVG from "react-inlinesvg";
import { classNames as cn } from "../../utils";

export default props => {
  const { currency, icon, className, size } = props;
  return (
    <div
      className={cn("CircleIcon", size, className)}
      style={
        currency
          ? {
              background: currency.background,
              boxShadow: `0px 4px 8px ${hexToRgba(
                currency.color || "#AAA",
                0.3
              )}`,
              color: "white"
            }
          : null
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
