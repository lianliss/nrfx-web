import React from 'react';

// Component
import { Container, Button, Row, Col } from 'ui';
import SVG from 'utils/svg-wrap';

// Styles
import './index.less';

function Exchanger() {
  return (
    <Container
      maxWidth={1356}
      padding={22}
      className="MainLanding-exchanger__wrapper"
    >
      <div className="MainLanding-exchanger">
        <div className="MainLanding-exchanger__content">
          <h2>Exchanger</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna
          </p>
          <div className="MainLanding-exchanger__action">
            <Button>
              <Row alignItems="center">
                Try exchanger
                <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
              </Row>
            </Button>
            <Col className="transactions-today">
              <span className="transactions-today__title">445 678</span>
              <div className="transactions-today__description">
                <div className="transactions-today__marker" />
                <span>transaction today</span>
              </div>
            </Col>
          </div>
        </div>
        <div className="MainLanding-exchanger__backgrounds exchanger-backgrounds">
          <div className="exchanger-backgrounds__monitor">
            <SVG
              src={require('src/asset/backgrounds/main-landing/exchanger-monitor.svg')}
            />
          </div>
          <div className="exchanger-backgrounds__monitor--adaptive"></div>
          <div className="exchanger-backgrounds__select-tokens">
            <SVG
              src={require('src/asset/backgrounds/main-landing/exchanger-select-tokens.svg')}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Exchanger;
