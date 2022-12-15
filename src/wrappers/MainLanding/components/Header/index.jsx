import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { Row, Button } from 'ui';
import SVG from 'utils/svg-wrap';
import Select from 'src/index/components/dapp/Select/Select';
import Navbar from './components/Navbar';
import BurgerMenu from './components/BurgerMenu';

// Utils
import { setLang } from 'src/services/lang';
import { currentLangSelector, displayedLangListSelector } from 'src/selectors';
import languageIcon from 'src/asset/icons/social/language.svg';

// Styles
import './index.less';

function Header({ adaptive }) {
  const lang = useSelector(currentLangSelector);
  const LangLabel = ({ title }) => (
    <Row alignItems="center">
      <SVG src={languageIcon} />
      <span>{title}</span>
    </Row>
  );
  const langList = useSelector(displayedLangListSelector).map(
    ({ title, value }) => ({
      label: <LangLabel title={title} />,
      value,
    })
  );
  const adaptiveLangList = langList.map(({ value }) => ({
    label: <LangLabel title={value} />,
    value,
  }));

  return (
    <div className="MainLandingWrapperHeader">
      <div className="MainLandingWrapperHeader__logo">
        <SVG src={require('src/asset/logo/narfex-blue.svg')} />
      </div>
      {!adaptive && <Navbar />}
      <div className="MainLandingWrapperHeader__action">
        <Select
          options={adaptive ? adaptiveLangList : langList}
          DropdownIndicator={null}
          value={lang}
          onChange={setLang}
        />
        <Button size="middle" type="lightBlue">
          <Row alignItems="center">
            {adaptive ? (
              'App'
            ) : (
              <>
                Launch App
                <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
              </>
            )}
          </Row>
        </Button>
        {adaptive && <BurgerMenu />}
      </div>
    </div>
  );
}

export default Header;
