import './LanguageModal.less';

import React, { useState } from 'react';
import SVG from 'react-inlinesvg';

import UI from '../../../ui';

const getLanguageFlag = (langCode) => {
  return <SVG src={require(`../../../asset/site/lang-flags/${langCode}.svg`)} />
}


function LanguageModal({ langList, className, onLanguageClick, children }) {
  const [isOpen, toggleOpen] = useState(false);

  const handleLanguageChange = (langCode) => {
    onLanguageClick(langCode);
    toggleOpen(false);
  }

  return(
    <div className={"LanguageModal " + className}>
      <span onClick={() => toggleOpen(true)}>
        {children}
      </span>

      <UI.Modal
        isOpen={isOpen}
        onClose={() => toggleOpen(false)}
      >
        <div className="LanguageModal__cont">
          <h2 className="LanguageModal__cont__title">Language</h2>

          <div className="LanguageModal__cont__grid">
            {langList.map(lang => (
              <p key={lang.value} className="LanguageModal__cont__lang" onClick={() => handleLanguageChange(lang.value)}>
                {getLanguageFlag(lang.value)}
                {lang.title}
              </p>
            ))}
          </div>
        </div>

      </UI.Modal>
    </div>
  )
}

export default LanguageModal;