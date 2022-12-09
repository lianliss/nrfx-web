import React from 'react';

// Components
import { Row, Container } from 'ui';
import ProductCards from '../../components/ProductCards';

// Styles
import './index.less';

function OtherProducts({ adaptive }) {
  return (
    <div className="MainLanding-other-products">
      <Container maxWidth={1262} padding={adaptive ? 23 : 62}>
        <Row className="MainLanding-other-products-title" alignItems="center">
          <h2>Other product</h2>
        </Row>
      </Container>
      <ProductCards />
    </div>
  );
}

export default OtherProducts;
