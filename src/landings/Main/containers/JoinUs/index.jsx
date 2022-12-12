import React from 'react';

// Components
import { Container } from 'ui';

// Styles
import './index.less';

function JoinUs({ adaptive }) {
  return (
    <Container
      maxWidth={1356}
      padding={adaptive ? 15 : 22}
      className="MainLanding-join-us__wrapper"
    >
      <div className="MainLanding-join-us">
        <h2>Join us</h2>
      </div>
    </Container>
  );
}

export default JoinUs;
