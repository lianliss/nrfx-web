import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import { Row } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Card from '../Card/Card';
import Slider from '../../../ui/Slider/Slider';

// Styles
import './Dashboard.less';

function Dashboard({ children }) {
  const prevSlideRef = React.useRef(null);
  const nextSlideRef = React.useRef(null);

  return (
    <CabinetBlock className="Referral__Dashboard">
      <h2>Dashboard</h2>
      <div className="Referral__Dashboard__arrows">
        <div className="Referral__Dashboard__arrow" ref={prevSlideRef}>
          <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
        </div>
        <div className="Referral__Dashboard__arrow" ref={nextSlideRef}>
          <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
        </div>
      </div>
      <Slider nextSlideRef={nextSlideRef} prevSlideRef={prevSlideRef}>
        <Row
          className="Referral__Dashboard__cards"
          alignItems="stretch"
          justifyContent="stretch"
        >
          {children}
        </Row>
      </Slider>
    </CabinetBlock>
  );
}

export default Dashboard;
