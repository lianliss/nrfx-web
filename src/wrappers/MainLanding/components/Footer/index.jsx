import React from 'react';
import { Link } from 'react-router5';

// Components
import { Row, Col, Container } from 'ui';

// Styles
import './index.less';

function Footer({ adaptive }) {
  return (
    <footer className="MainLandingWrapperFooter">
      <Container maxWidth={1293} padding={adaptive ? 15 : 38}>
        <Row
          className="MainLandingWrapperFooter__main"
          justifyContent="space-between"
        >
          <nav className="MainLandingWrapperFooter-nav">
            <Col className="MainLandingWrapperFooter-nav__col">
              <h6>Products</h6>
              <div className="MainLandingWrapperFooter-nav__items">
                <Link routeName="">Narfex token</Link>
                <Link routeName="">Exchanger</Link>
                <Link routeName="">Dex</Link>
                <Link routeName="">Liqudity</Link>
                <Link routeName="">Farming</Link>
                <Link routeName="">Validator</Link>
              </div>
            </Col>
            <Col className="MainLandingWrapperFooter-nav__col">
              <h6>Company</h6>
              <Col className="MainLandingWrapperFooter-nav__items">
                <Link routeName="">Governance</Link>
                <Link routeName="">Support</Link>
                <Link routeName="">FAQ</Link>
              </Col>
            </Col>
            <Col className="MainLandingWrapperFooter-nav__col">
              <h6>Legasy</h6>
              <Col className="MainLandingWrapperFooter-nav__items">
                <Link routeName="">Privacy Policy</Link>
                <Link routeName="">Security</Link>
              </Col>
            </Col>
          </nav>
          <Col></Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
