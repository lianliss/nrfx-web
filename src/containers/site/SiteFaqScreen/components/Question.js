import React, { useState } from 'react';

import { classNames } from '../../../../utils';


function Question({ question, answer }) {
  const [isExpanded, toggleExpand] = useState(false);

  const className = classNames({
    SiteFaqScreen__question: true,
    active_question: !!isExpanded,
  });

  return (
    <div className={className}>
      <div
        className="SiteFaqScreen__question__text"
        onClick={() => toggleExpand(!isExpanded)}
      >
        <h3>{question}</h3>
      </div>

      {isExpanded
        ? <p className="SiteFaqScreen__question__answer">{answer}</p>
        : null}
    </div>
  );
}

export default React.memo(Question);