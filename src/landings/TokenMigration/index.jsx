import React from 'react';
import { useSelector } from 'react-redux';

// Components
import Form from './components/Form';
import FormattedText from 'dapp/FormattedText/FormattedText';
import { Container, Button, Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import regexes from 'src/index/constants/regexes';
import rightArrowIcon from 'src/asset/24px/arrow_right_alt.svg';
import { adaptiveSelector } from 'src/selectors';
import { getLang } from 'utils';

// Styles
import './index.less';

function TokenMigration() {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <Container
      className="TokenMigrationLanding"
      maxWidth={1260}
      padding={adaptive ? 0 : 70}
    >
      <Row justifyContent="space-between">
        <div className="TokenMigrationLanding__blocks">
          <div className="TokenMigrationLanding__block">
            <FormattedText
              lang="token_migration_landing_title"
              className="blue"
              regularExpression={regexes.betweenCharacters}
              tag="h1"
            />
            <h2>{getLang('token_migration_landing_subtitle_1')}</h2>
            <p className="TokenMigrationLanding__description">
              {getLang('token_migration_landing_description_1')}
            </p>
          </div>
          {adaptive && <Form />}
          <div className="TokenMigrationLanding__block">
            <h2>{getLang('token_migration_landing_subtitle_2')}</h2>
            <p>{getLang('token_migration_landing_description_2')}</p>
            <Button
              type="secondary-lightBlue"
              size="ultra_large"
              className="TokenMigrationLanding__more"
              href="https://docs.narfex.com/narfex/main/narfex-token-nrfx/new-narfex-token-erc-20"
              target="_blank"
            >
              <Row alignItems="center">
                {getLang('token_migration_button_more')}
                <SVG
                  src={rightArrowIcon}
                  style={{ marginLeft: adaptive ? 10 : 13 }}
                  flex
                />
              </Row>
            </Button>
          </div>
          <div className="TokenMigrationLanding__block">
            <h2>{getLang('token_migration_landing_subtitle_3')}</h2>
            <ol>
              <li>{getLang('token_migration_steps_1')}</li>
              <li>{getLang('token_migration_steps_2')}</li>
              <li>{getLang('token_migration_steps_3')}</li>
            </ol>
            <p>{getLang('token_migration_landing_description_3')}</p>
          </div>
        </div>
        {!adaptive && <Form />}
      </Row>
    </Container>
  );
}

export default TokenMigration;
