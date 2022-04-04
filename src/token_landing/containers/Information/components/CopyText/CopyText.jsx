import React from 'react';
import PropTypes from 'prop-types';

import './CopyText.less';

import SVG from 'utils/svg-wrap';
import maximizeIcon from './assets/maximize.svg';
import {getLang} from 'utils';

function CopyText({ text }) {
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <div className="CopyText" onClick={e => {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }}>
      <span>{text}</span>
      <SVG src={maximizeIcon} />
      {isCopied && <div className="CopyText__copied">{getLang('copied')}</div>}
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
