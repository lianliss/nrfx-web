import './LanguageModal.less';

import React from 'react';
import SVG from 'react-inlinesvg';

import UI from '../../../ui';

const getLanguageFlag = (langCode) => {
  return <SVG src={require(`../../../asset/site/lang-flags/${langCode}.svg`)} />
}


function LanguageModal({ langList, className, onLanguageClick, isOpen, onChange }) {

  const handleLanguageChange = (langCode) => {
    onLanguageClick(langCode);
    onChange(false);
  }

  return(
    <div className={"LanguageModal " + className}>
      <UI.Modal
        isOpen={isOpen}
        onClose={() => onChange(false)}
      >

        <div className="LanguageModal__cont">
          <h2 className="LanguageModal__cont__title">Language</h2>

          <div className="LanguageModal__cont__grid">
            {langList.map(lang => (
              <p
                key={lang.value}
                className="LanguageModal__cont__lang"
                onClick={() => handleLanguageChange(lang.value)}
              >
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