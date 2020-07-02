import React from "react";
import { dateFormat } from "src/utils";

export default ({ time, format }) => <span>{dateFormat(time, format)}</span>;
