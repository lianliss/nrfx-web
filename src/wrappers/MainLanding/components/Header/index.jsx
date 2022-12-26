import React from 'react';
import { Link, useRoute } from 'react-router5';
import { useSelector } from 'react-redux';

// Components
import { Row, Button } from 'ui';
import SVG from 'utils/svg-wrap';
import Select from 'src/index/components/dapp/Select/Select';
import Navbar from './components/Navbar';
import BurgerMenu from './components/BurgerMenu';
import Sidebar from './components/Sidebar';

// Utils
import { getLang, classNames as cn } from 'utils';
import { setLang } from 'src/services/lang';
import { DAPP, MAIN } from 'src/index/constants/pages';
import { currentLangSelector, displayedLangListSelector } from 'src/selectors';
import languageIcon from 'src/asset/icons/social/language.svg';
import router from 'src/router';

// Styles
import './index.less';

function Header({ adaptive }) {
  const { route } = useRoute();
  const [isSidebar, setIsSidebar] = React.useState(false);
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

  const launchApp = () => router.navigate(DAPP);

  return (
    <div className={cn('MainLandingWrapperHeader', route.name)}>
      <Link routeName={MAIN} className="MainLandingWrapperHeader__logo">
        <SVG src={require('src/asset/logo/narfex-blue.svg')} />
      </Link>
      {!adaptive && <Navbar />}
      <div className="MainLandingWrapperHeader__action">
        <Select
          options={adaptive ? adaptiveLangList : langList}
          indicatorIcon={
            adaptive
              ? null
              : require('src/asset/icons/cabinet/select-arrow.svg')
          }
          value={lang}
          onChange={setLang}
        />
        <Button size="middle" type="lightBlue" onClick={launchApp}>
          <Row alignItems="center">
            {adaptive ? (
              'App'
            ) : (
              <>
                {getLang('site_launch_app')}
                <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
              </>
            )}
          </Row>
        </Button>
        {adaptive && <BurgerMenu onClick={() => setIsSidebar(true)} />}
      </div>
      <Sidebar
        active={isSidebar}
        onClose={() => setIsSidebar(false)}
        langList={langList}
        lang={lang}
        setLang={setLang}
        launchApp={launchApp}
      />
    </div>
  );
}

export default Header;
