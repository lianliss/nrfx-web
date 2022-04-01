import React from 'react';
import PropTypes from 'prop-types';

import './CopyText.less';

import { getLang } from 'utils';
import SVG from 'utils/svg-wrap';
import maximizeIcon from './assets/maximize.svg';

function CopyText({ text }) {
  return (
    <div className="CopyText">
      <span>{text}</span>
      <SVG src={maximizeIcon} />
    </div>
  );
}

CopyText.propTypes = {
  text: PropTypes.string,
};

CopyText.defaultProps = {
  text: '',
};

export default CopyText;
