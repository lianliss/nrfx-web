import React from 'react';
import { useSelector } from 'react-redux';

import SVG from 'utils/svg-wrap';
import arrowBottomIcon from './assets/arrow_bottom.svg';
import { setLang } from 'src/services/lang';

import { currentLangSelector, langListSelector } from 'src/selectors';

import './LanguageChanger.less';

function LanguageChanger() {
  const [languagesModal, setLanguagesModal] = React.useState(false);
  const langList = useSelector(langListSelector);
  const currentLang = useSelector(currentLangSelector);

  React.useEffect(() => {
    document.addEventListener('click', closeModal);

    return function () {
      document.removeEventListener('click', closeModal);
    };
  }, []);

  const closeModal = () => {
    setLanguagesModal(false);
  };
  const openModal = () => {
    if(languagesModal === true) {
      return;
    }
    
    setTimeout(() => {
      setLanguagesModal(true);
    });
  };

  // Get language flag function.
  const getLanguageFlag = (langCode) => {
    return (
      <SVG
        src={require(`src/ui/components/LanguageChanger/assets/${langCode}.svg`)}
      />
    );
  };

  // Set current & icon.
  const languages = langList
    .filter((l) => l.display)
    .map((l) => ({
      ...l,
      label: l.title,
      current: l.value === currentLang ? true : false,
      icon: getLanguageFlag(l.value),
    }));

  // Get current value
  const current = languages.filter((item) => item.current)[0];
  const currentTitle = current.value === 'id' ? 'in' : current.value; // Change Id to In (Indonesia)
  const currentFlag = current.icon;

  return (
    <div className="LanguageChanger">
      <div className="LanguageChanger__container" onClick={openModal}>
        {currentTitle}
        <SVG src={arrowBottomIcon} className="LanguageChanger__arrow" />
        <div className="LanguageChanger__circle">{currentFlag}</div>
      </div>
      {languagesModal && (
        <div className="LanguageChanger__languages">
          {languages.map((language, key) => (
            <div
              className="LanguageChanger__language"
              key={key}
              onClick={() => {
                setLang(language.value);
              }}
            >
              <span>{language.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageChanger;
