import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { adaptiveSelector } from 'src/selectors';

// Components
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import { Row } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Card from '../Card/Card';
import Slider from '../../../ui/Slider/Slider';

// Styles
import './Dashboard.less';

function Dashboard({ mainChild, children }) {
  const adaptive = useSelector(adaptiveSelector);
  const prevSlideRef = React.useRef(null);
  const nextSlideRef = React.useRef(null);

  return (
    <CabinetBlock className="Referral__Dashboard">
      <h2>Dashboard</h2>
      {!adaptive && (
        <div className="Referral__Dashboard__arrows">
          <div className="Referral__Dashboard__arrow" ref={prevSlideRef}>
            <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
          </div>
          <div className="Referral__Dashboard__arrow" ref={nextSlideRef}>
            <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
          </div>
        </div>
      )}
      <Row
        className="Referral__Dashboard__cards"
        alignItems="stretch"
        justifyContent="stretch"
      >
        {mainChild}
        <Slider
          adaptive={adaptive}
          nextSlideRef={nextSlideRef}
          prevSlideRef={prevSlideRef}
        >
          <Row>{children}</Row>
        </Slider>
      </Row>
    </CabinetBlock>
  );
}

export default Dashboard;
