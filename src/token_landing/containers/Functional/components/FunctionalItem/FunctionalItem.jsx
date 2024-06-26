import React from 'react';
import PropTypes from 'prop-types';

import {getLang} from "utils";

import './FunctionalItem.less';
import SVG from 'utils/svg-wrap';
import playIcon from '../../../../assets/play.svg';
import answerIcon from '../assets/answer.svg';

function FunctionalItem({ number, title }) {
  // Add 0 for 1,2,3,4,... === 01,02,03,04,...
  const numberFilter = (number) => {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  };

  return (
    <div className="FunctionalItem">
      <span className="FunctionalItem__number">{numberFilter(number)}</span>
      <div className="FunctionalItem__title">
        <span>{getLang(title)}</span>
        {/*<span className="FunctionalItem__answer-icon">*/}
          {/*<SVG src={answerIcon} />*/}
        {/*</span>*/}
      </div>
      <div className="FunctionalItem__icon-container">
        <SVG src={playIcon} />
      </div>
    </div>
  );
}

FunctionalItem.propTypes = {
  number: PropTypes.number,
  title: PropTypes.string,
};

FunctionalItem.defaultProps = {
  number: 0,
  title: '',
};

export default FunctionalItem;
