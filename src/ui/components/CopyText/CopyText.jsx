import React from 'react';
import { getLang } from 'utils';

import './CopyText.less';

function CopyText({ text, children, className }) {
  const [isCopied, setIsCopied] = React.useState(false);

  const handleCopy = (e) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <p
      onClick={handleCopy}
      className={`CopyTextComponent CopyTextComponent__container ${className}`}
    >
      <span className="CopyTextComponent__content">
        {children ? children : text}
      </span>
      {isCopied && (
        <span className="CopyTextComponent__copied">
          <span>{getLang('copied')}</span>
        </span>
      )}
    </p>
  );
}

CopyText.defaultProps = {
  className: '',
};

export default CopyText;
