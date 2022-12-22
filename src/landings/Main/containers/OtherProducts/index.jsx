import React from 'react';

// Components
import { Row, Container } from 'ui';
import { CustomButton } from 'dapp';
import ProductCards from '../../components/ProductCards';
import SVG from 'utils/svg-wrap';

// Utils
import useIsInViewport from 'src/hooks/useIsInViewport';

// Styles
import './index.less';

function OtherProducts({ adaptive }) {
  const titleRef = React.useRef(null);
  const nextSlideRef = React.useRef(null);
  const prevSlideRef = React.useRef(null);
  const visible = useIsInViewport(titleRef, 50);

  return (
    <div className="MainLanding-other-products">
      <Container maxWidth={1262} padding={adaptive ? 23 : 62}>
        <Row
          className="MainLanding-other-products__title"
          alignItems="center"
          wrap
          justifyContent="space-between"
        >
          <h2 ref={titleRef}>Other product</h2>
          <div className="slider-control">
            <CustomButton
              ref={prevSlideRef}
              className="slider-control__arrow slider-control__prev"
            >
              <SVG src={require('src/asset/24px/arrow_right_alt.svg')} flex />
            </CustomButton>
            <CustomButton
              ref={nextSlideRef}
              className="slider-control__arrow slider-control__next"
            >
              <SVG src={require('src/asset/24px/arrow_right_alt.svg')} flex />
            </CustomButton>
          </div>
        </Row>
      </Container>
      <ProductCards
        prevSlideRef={prevSlideRef}
        nextSlideRef={nextSlideRef}
        adaptive={adaptive}
        visible={visible}
      />
    </div>
  );
}

export default OtherProducts;
