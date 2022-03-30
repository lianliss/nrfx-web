import React from 'react';

import './CopyText.less';
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

export default CopyText;
