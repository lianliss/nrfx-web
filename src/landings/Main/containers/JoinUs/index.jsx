import React from 'react';

// Components
import { Container, Row, Col } from 'ui';
import JoinUsCards from '../../components/JoinUsCards';
import SocialLinks from '../../components/SocialLinks';
import SuggestiveBox from '../../components/SuggestiveBox';
import { sizes } from '../../components/SuggestiveBox/constants/types';
import SVG from 'utils/svg-wrap';
import ShowIn from '../../components/ShowIn';

// Utils
import useAdaptive from 'src/hooks/adaptive';
import { DESKTOP } from 'src/index/constants/breakpoints';
import { getLang } from 'utils';

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
          <h2>{getLang('main_landing_join_us_title')}</h2>
          <p className="MainLanding-join-us__text">
            {getLang('main_landing_join_us_subtitle')}
          </p>
          <ShowIn type="scroll">
            <SocialLinks adaptive={adaptive} />
          </ShowIn>
          <p className="MainLanding-join-us__text">
            {getLang('main_landing_join_us_description')}
          </p>
          <Row
            className="MainLanding-join-us__buttons"
            wrap
            wrapAnyway={adaptive}
            alignItems={adaptive ? 'center' : 'flex-start'}
          >
            <SuggestiveBox
              icon={<SVG src={require('src/asset/24px/draft.svg')} />}
              title={getLang('main_landing_white_paper_button_title')}
              subtitle={getLang('main_landing_white_paper_button_subtitle')}
              size={sizes.small}
              border
            />
            <SuggestiveBox
              icon={<SVG src={require('src/asset/24px/code.svg')} />}
              title={getLang('main_landing_github_button_title')}
              subtitle={getLang('main_landing_github_button_subtitle')}
              size={sizes.small}
              border
            />
          </Row>
        </Col>
        <ShowIn type="scroll" className="MainLanding-JoinUsCards__showIn">
          <JoinUsCards adaptive={adaptive} />
        </ShowIn>
      </Row>
    </Container>
  );
}

export default JoinUs;
