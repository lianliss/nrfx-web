import './LanguageModal.less';

import React, { memo } from 'react';
import SVG from 'react-inlinesvg';
import * as utils from '../../../../utils';
import UI from '../../../../ui';
import { connect } from 'react-redux';
import { getLang, setLang } from '../../../../services/lang';

const getLanguageFlag = (langCode) => {
  return <SVG src={require(`../../../../asset/site/lang-flags/${langCode}.svg`)} />
};

function LanguageModal({ langList, onClose }, props) {


  const handleLanguageChange = (langCode) => {
    setLang(langCode);
    onClose();
  };

  return(
    <div className="LanguageModal">
      <UI.Modal
        isOpen={true}
        onClose={onClose}
      >
        <UI.ModalHeader>{utils.getLang("global_language")}</UI.ModalHeader>
        <div className="LanguageModal__cont">
          <div className="LanguageModal__cont__grid">
            {!!langList && langList.map(lang => (
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

export default connect( state => ({
  langList: state.default.langList
}))(memo(LanguageModal));
