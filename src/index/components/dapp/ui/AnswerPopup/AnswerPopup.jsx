import React from 'react';

// Components
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './AnswerPopup.less';

function AnswerPopup({ question, children, className }) {
  return (
    <span className={cn('AnswerPopup', className)}>
      {question ? (
        <span className="AnswerPopup__question">{question}</span>
      ) : (
        <span className="AnswerPopup__icon">
          <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
        </span>
      )}
      <div className="AnswerPopup__container">
        <div className="AnswerPopup__triangle">
          <SVG src={require('./assets/triangle.svg')} />
        </div>
        <div className="AnswerPopup__content">{children}</div>
      </div>
    </span>
  );
}

export default AnswerPopup;
