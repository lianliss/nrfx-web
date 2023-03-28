import React from 'react';
import { classNames as cn } from 'utils';

const Step = ({ number, title, active }) => (
  <div className={cn('p2p-order-process-step', { active })}>
    <div className="p2p-order-process-step__number">
      <div>{number}</div>
    </div>
    <p>{title}</p>
  </div>
);

export default Step;
