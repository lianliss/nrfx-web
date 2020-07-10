import "./Timer.less";

import React, { useState, useEffect } from "react";
import { dateFormat } from "src/utils/index.js";

const calculateTimeLeft = difference => ({
  days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  minutes: Math.floor((difference / 1000 / 60) % 60),
  seconds: Math.floor((difference / 1000) % 60)
});

const fixedNumber = number =>
  ((number * 0.01).toFixed(2) + "").split(".").pop();

export default ({ time, onFinish }) => {
  const [dateNow, setDateNow] = useState(Date.now());
  useEffect(() => {
    setTimeout(() => {
      setDateNow(Date.now());
    }, 1000);
  }, [dateNow]);

  if (time <= dateNow) {
    onFinish && onFinish();
    return <span className="Timer">00:00:00</span>;
  }

  const timer = calculateTimeLeft(time - dateNow);
  return (
    <span title={dateFormat(time)} className="Timer">
      {[timer.hours, timer.minutes, timer.seconds].map(fixedNumber).join(":")}
    </span>
  );
};
