import React from 'react';

import Step from '../Step';
import { orderProcesses as processes } from 'src/index/constants/dapp/types';

const steps = {
  buy: [
    { id: 1, title: 'Transfer payment to Seller' },
    {
      id: 2,
      title: 'Pending Seller to Realease Cryptos',
      answerMessage:
        'Waiting for payment confirmation. ' +
        'Please do not cancel the order if payment has' +
        ' been made. Once the counterparty confirms the payment,' +
        ' the crypto will be realeased to your wallet.',
    },
    { id: 3, title: 'Completed' },
  ],
  sell: [
    {
      id: 1,
      title: 'Pending Payment',
    },
    {
      id: 2,
      title: 'Release crypto to the buyer',
      answerMessage:
        'Waiting for payment confirmation. ' +
        'Please do not cancel the order if payment has' +
        ' been made. Once the counterparty confirms the payment,' +
        ' the crypto will be realeased to your wallet.',
    },
    { id: 3, title: 'Completed' },
  ],
};

function Steps({ mode, order, adaptive }) {
  const stepsOfMode = steps[order.cache.side];
  const allowedProcess = true;
  let step = 1;
  if (order.cache.isPayed) {
    step = 2;
  }
  if (!order.cache.isCanceled && !order.status) {
    step = 3;
  }

  if (!adaptive && allowedProcess) {
    return (
      <div className="p2p-order-process-steps">
        {stepsOfMode.map(({ title, id, answerMessage }) => (
          <Step
            number={id}
            key={id}
            title={title}
            active={id <= step}
            answerMessage={answerMessage}
          />
        ))}
      </div>
    );
  }

  return <></>;
}

export default Steps;
