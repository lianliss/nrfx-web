import './Timer.less';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { dateFormat } from 'src/utils/index.js';
import { classNames as cn } from 'utils';

const calculateTimeLeft = (difference) => ({
  days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  minutes: Math.floor((difference / 1000 / 60) % 60),
  seconds: Math.floor((difference / 1000) % 60),
});

const fixedNumber = (number) =>
  ((number * 0.01).toFixed(2) + '').split('.').pop();

const Timer = ({
  time,
  onFinish,
  hiddenAfterFinish,
  type,
  size,
  hideHours,
  hideMinutes,
  hideSeconds,
}) => {
  const [dateNow, setDateNow] = useState(Date.now());
  const [canFinish] = useState(time > Date.now());

  useEffect(() => {
    if (time <= dateNow) return;

    const timer = setTimeout(() => {
      setDateNow(Date.now());
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [dateNow]);

  if (time <= dateNow) {
    onFinish && canFinish && onFinish();

    if (hiddenAfterFinish) {
      return <></>;
    }
  }

  const fineTime = time - dateNow < 0 ? 0 : time - dateNow;
  const timer = calculateTimeLeft(fineTime);
  const times = {
    hours: !hideHours && timer.hours,
    minutes: !hideMinutes && timer.minutes,
    seconds: !hideSeconds && timer.seconds,
  };
  const filteredTimes = Object.values(times)
    .filter((value) => value !== false)
    .map((value) => fixedNumber(value));

  return (
    <time title={dateFormat(time)} className={cn('Timer', type, size)}>
      {filteredTimes.map((value, key, arr) => {
        return (
          <React.Fragment key={key}>
            <div className="Timer__part">
              <div className="Timer__value">{value[0]}</div>
              <div className="Timer__value">{value[1]}</div>
            </div>
            {!(key === arr.length - 1) && (
              <div className="Timer__separator">:</div>
            )}
          </React.Fragment>
        );
      })}
    </time>
  );
};

Timer.propTypes = {
  type: PropTypes.oneOf(['simple', 'light-blue']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  hideHours: PropTypes.bool,
  hideMinutes: PropTypes.bool,
  hideSeconds: PropTypes.bool,
};

Timer.defaultProps = {
  type: 'simple',
  size: 'small',
  hideHours: false,
  hideMinutes: false,
  hideSeconds: false,
};

export default Timer;
