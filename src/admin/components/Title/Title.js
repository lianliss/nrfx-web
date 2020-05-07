import React from "react";
import { classNames as cn } from "src/utils/index";

export default ({ title, level }) => (
  <div className={cn("AdminTitle", { ["level-" + level]: level })}>{title}</div>
);
