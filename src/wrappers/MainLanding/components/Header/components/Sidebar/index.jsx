import React from 'react';
import PropTypes from 'prop-types';

// Components
import Navbar from '../Navbar';
import Select from 'src/index/components/dapp/Select/Select';
import { CustomButton } from 'dapp';
import { Button, Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn, getLang } from 'utils';

// Styles
import './index.less';

function Sidebar({ langList, lang, setLang, active, launchApp, onClose }) {
  React.useEffect(() => {
    if (active) {
      document.body.classList.toggle('noScroll', true);
    } else {
      document.body.classList.toggle('noScroll', false);
    }

    return () => {
      document.body.classList.toggle('noScroll', false);
    };
  }, [active]);

  return (
    <div
      className={cn('MainLandingWrapperHeader-sidebar', { active })}
      onClick={onClose}
    >
      <div
        className="MainLandingWrapperHeader-sidebar__content"
        onClick={(e) => e.stopPropagation()}
      >
        <Navbar />
        <Select options={langList} value={lang} onChange={setLang} />
        <Button size="middle" type="lightBlue" onClick={launchApp}>
          <Row alignItems="center">
            {getLang('site_launch_app')}
            <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
          </Row>
        </Button>
        <CustomButton className="close" onClick={onClose}>
          &#x2715;
        </CustomButton>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  langList: PropTypes.array,
  lang: PropTypes.string,
  setLang: PropTypes.func,
  active: PropTypes.bool,
  onClose: PropTypes.func,
};

Sidebar.defaultProps = {
  langList: [],
  lang: 'ru',
  setLang: () => {},
  active: false,
  onClose: () => {},
};

export default Sidebar;
