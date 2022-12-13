import React from 'react';

// Components
import { Container, Row, Col } from 'ui';
import JoinUsCards from '../../components/JoinUsCards';
import SocialLinks from '../../components/SocialLinks';
import SuggestiveBox from '../../components/SuggestiveBox';
import { sizes } from '../../components/SuggestiveBox/constants/types';
import SVG from 'utils/svg-wrap';

// Utils
import useAdaptive from 'src/hooks/adaptive';
import { DESKTOP } from 'src/index/constants/breakpoints';

// Styles
import './index.less';

function JoinUs({ adaptive }) {
  const isDesktop = useAdaptive(DESKTOP, false);

  return (
    <Container
      maxWidth={1356}
      padding={adaptive ? 15 : 22}
      className="MainLanding-join-us__wrapper"
    >
      <Row
        className="MainLanding-join-us"
        justifyContent={adaptive ? 'center' : 'space-between'}
        alignItems="stretch"
        wrap={isDesktop}
      >
        <Col
          className="MainLanding-join-us__content"
          alignItems={adaptive ? 'center' : 'flex-start'}
        >
          <h2>Join us</h2>
          <p className="MainLanding-join-us__text">social media</p>
          <SocialLinks adaptive={adaptive} />
          <p className="MainLanding-join-us__text">
            Lorem ipsum dolor sit amet,
            <br />
            consectetur adipiscing elit
          </p>
          <Row
            className="MainLanding-join-us__buttons"
            wrap
            wrapAnyway={adaptive}
            alignItems={adaptive ? 'center' : 'flex-start'}
          >
            <SuggestiveBox
              icon={<SVG src={require('src/asset/24px/draft.svg')} />}
              title="White paper"
              subtitle="click for read"
              size={sizes.small}
              border
            />
            <SuggestiveBox
              icon={<SVG src={require('src/asset/24px/code.svg')} />}
              title="Github"
              subtitle="click for open"
              size={sizes.small}
              border
            />
          </Row>
        </Col>
        <JoinUsCards adaptive={adaptive} />
      </Row>
    </Container>
  );
}

export default JoinUs;
