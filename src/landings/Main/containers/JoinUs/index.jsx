import React from 'react';

// Components
import { Container, Row, Col } from 'ui';
import JoinUsCards from '../../components/JoinUsCards';

// Styles
import './index.less';

function JoinUs({ adaptive }) {
  return (
    <Container
      maxWidth={1356}
      padding={adaptive ? 15 : 22}
      className="MainLanding-join-us__wrapper"
    >
      <Row className="MainLanding-join-us" justifyContent="space-between">
        <Col>
          <h2>Join us</h2>
        </Col>
        <JoinUsCards adaptive={adaptive} />
      </Row>
    </Container>
  );
}

export default JoinUs;
