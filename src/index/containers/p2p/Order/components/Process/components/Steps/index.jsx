import React from 'react';

import Step from '../Step';
import { orderProcesses as processes } from 'src/index/constants/dapp/types';

const steps = {
  buy: [
    { id: 1, type: 1, title: 'Transfer payment to Seller' },
    {
      id: 2,
      type: processes.buy.pending,
      title: 'Pending Seller to Realease Cryptos',
      answerMessage:
        'Waiting for payment confirmation. ' +
        'Please do not cancel the order if payment has' +
        ' been made. Once the counterparty confirms the payment,' +
        ' the crypto will be realeased to your wallet.',
    },
    { id: 3, type: processes.buy.completed, title: 'Completed' },
  ],
  sell: [
    {
      id: 1,
      type: processes.sell.pending,
      title: 'Pending Payment',
    },
    {
      id: 2,
      type: processes.sell.releasing,
      title: 'Release crypto to the buyer',
      answerMessage:
        'Waiting for payment confirmation. ' +
        'Please do not cancel the order if payment has' +
        ' been made. Once the counterparty confirms the payment,' +
        ' the crypto will be realeased to your wallet.',
    },
    { id: 3, type: processes.sell.completed, title: 'Completed' },
  ],
};

const stepsEnabledProcesses = [
  processes.buy.payment,
  processes.buy.pending,
  processes.sell.pending,
  processes.sell.releasing,
];

function Steps({ mode, order, adaptive }) {
  const stepsOfMode = steps[order.cache.side];
  const allowedProcess = true;

  if (!adaptive && allowedProcess) {
    return (
      <div className="p2p-order-process-steps">
        {stepsOfMode.map(({ title, id, answerMessage }) => (
          <Step
            number={id}
            key={id}
            title={title}
            active={id <= 1}
            answerMessage={answerMessage}
          />
        ))}
      </div>
    );
  }

  return <></>;
}

export default Steps;
