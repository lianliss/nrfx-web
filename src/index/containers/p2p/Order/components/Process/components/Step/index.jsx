import React from 'react';
import { classNames as cn } from 'utils';
import { AnswerPopup } from 'dapp';

const Step = ({ number, title, active, answerMessage }) => (
  <div className={cn('p2p-order-process-step', { active })}>
    <div className="p2p-order-process-step__number">
      <div>{number}</div>
    </div>
    {answerMessage && active ? (
      <AnswerPopup question={<p>{title}</p>}>{answerMessage}</AnswerPopup>
    ) : (
      <p>{title}</p>
    )}
  </div>
);

export default Step;
