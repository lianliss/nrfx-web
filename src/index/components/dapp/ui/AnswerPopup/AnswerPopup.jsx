import React from 'react';

// Components
import SVG from 'utils/svg-wrap';

// Styles
import './AnswerPopup.less';

function AnswerPopup({ children }) {
  return (
    <div className="AnswerPopup">
      <div className="AnswerPopup__icon">
        <SVG src={require('src/asset/icons/cabinet/question-icon.svg')} />
      </div>
      <div className="AnswerPopup__container">
        <div className="AnswerPopup__triangle">
          <SVG src={require('./assets/triangle.svg')} />
        </div>
        <div className="AnswerPopup__content">{children}</div>
      </div>
    </div>
  );
}

export default AnswerPopup;