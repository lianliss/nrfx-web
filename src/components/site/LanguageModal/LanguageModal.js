import './LanguageModal.less';

import React from 'react';
import SVG from 'react-inlinesvg';
import * as utils from '../../../utils';

import UI from '../../../ui';
import {ModalHeader} from '../../../ui/components/Modal/Modal';

const getLanguageFlag = (langCode) => {
  return <SVG src={require(`../../../asset/site/lang-flags/${langCode}.svg`)} />
}


function LanguageModal({ langList, className, onLanguageClick, isOpen, onClose }) {

  const handleLanguageChange = (langCode) => {
    onLanguageClick(langCode);
    onClose();
  }

  return(
    <div className={"LanguageModal " + className}>
      <UI.Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <UI.ModalHeader>{utils.getLang("global_language")}</UI.ModalHeader>
        <div className="LanguageModal__cont">
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