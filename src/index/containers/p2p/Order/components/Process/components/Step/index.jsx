import React from 'react';
import { classNames as cn } from 'utils';
import { AnswerPopup } from 'dapp';

const Step = ({ number, title, active }) => (
  <div className={cn('p2p-order-process-step', { active })}>
    <div className="p2p-order-process-step__number">
      <div>{number}</div>
    </div>
    <AnswerPopup question={<p>{title}</p>}>{title}</AnswerPopup>
  </div>
);

export default Step;
