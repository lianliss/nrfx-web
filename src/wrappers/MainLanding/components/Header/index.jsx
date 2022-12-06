import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router5';

// Components
import { Row, Button } from 'ui';
import SVG from 'utils/svg-wrap';
import Select from 'src/index/components/dapp/Select/Select';
import * as pages from 'src/index/constants/pages';

// Utils
import { setLang } from 'src/services/lang';
import { currentLangSelector, displayedLangListSelector } from 'src/selectors';
import languageIcon from 'src/asset/icons/social/language.svg';

// Styles
import './index.less';

function Header() {
  const lang = useSelector(currentLangSelector);
  const langList = useSelector(displayedLangListSelector).map(
    ({ title, value }) => ({
      label: (
        <Row alignItems="center">
          <SVG src={languageIcon} />
          <span>{title}</span>
        </Row>
      ),
      value,
    })
  );

  return (
    <div className="MainLandingWrapperHeader">
      <div className="MainLandingWrapperHeader__logo">
        <SVG src={require('src/asset/logo/narfex-blue.svg')} />
      </div>
      <nav className="MainLandingWrapperHeader-nav">
        <Link
          className="MainLandingWrapperHeader-nav__link"
          routeName={pages.NARFEX_DAO}
        >
          Narfex DAO
        </Link>
        <Link
          className="MainLandingWrapperHeader-nav__link"
          routeName={pages.MAIN}
        >
          Support
        </Link>
        <Link
          className="MainLandingWrapperHeader-nav__link"
          routeName={pages.TOKEN_LANDING}
        >
          Narfex Token
        </Link>
      </nav>
      <div className="MainLandingWrapperHeader__action">
        <Select options={langList} value={lang} onChange={setLang} />
        <Button size="middle" type="lightBlue">
          <Row alignItems="center">
            Launch App
            <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
          </Row>
        </Button>
      </div>
    </div>
  );
}

export default Header;
