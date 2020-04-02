import React from "react";
import { dateFormat } from "src/utils";

export default ({ time }) => <span>{dateFormat(time)}</span>;
