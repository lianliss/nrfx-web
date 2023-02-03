import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Container, Row, Col } from 'ui';
import JoinUsCards from '../../components/JoinUsCards';
import SocialLinks from '../../components/SocialLinks';
import SuggestiveBox from '../../components/SuggestiveBox';
import { sizes } from '../../components/SuggestiveBox/constants/types';
import SVG from 'utils/svg-wrap';
import ShowIn from '../../components/ShowIn';
import FormattedText from 'dapp/FormattedText/FormattedText';

// Utils
import useAdaptive from 'src/hooks/adaptive';
import { DESKTOP } from 'src/index/constants/breakpoints';
import { getLang } from 'utils';
import company from 'src/index/constants/company';
import regexes from 'src/index/constants/regexes.js';

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
          <FormattedText
            lang={'main_landing_join_us_description'}
            tag="p"
            tagClassName="MainLanding-join-us__text"
            regularExpression={regexes.betweenCharacters}
          />
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
              href={company.whitePaper.en}
              target="_blank"
              border
            />
            <SuggestiveBox
              icon={<SVG src={require('src/asset/24px/code.svg')} />}
              title={getLang('main_landing_github_button_title')}
              subtitle={getLang('main_landing_github_button_subtitle')}
              size={sizes.small}
              href={company.github}
              target="_blank"
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

JoinUs.propTypes = {
  adaptive: PropTypes.bool,
};

JoinUs.defaultProps = {
  adaptive: false,
};

export default JoinUs;
