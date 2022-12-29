import React from 'react';

import { AnswerPopup } from 'dapp';

function ColumnTitle({ title, description }) {
  return (
    <div className="ValidatorTradeForm-col__title">
      <h3>{title}</h3>
      {description && <AnswerPopup>{description}</AnswerPopup>}
    </div>
  );
}

export default ColumnTitle;
