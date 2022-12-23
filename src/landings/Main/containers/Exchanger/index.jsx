import React from 'react';

// Component
import { Container, Button, Row, Col } from 'ui';
import SVG from 'utils/svg-wrap';
import ShowIn from '../../components/ShowIn';
import SuggestiveBox from '../../components/SuggestiveBox';

// Utils
import { getLang } from 'utils';
import { sizes } from '../../components/SuggestiveBox/constants/types';

// Styles
import './index.less';

const Exchanger = ({ adaptive }) => {
  return (
    <ShowIn className="MainLanding-exchanger__wrapper" animation="slideRight">
      <Container maxWidth={1356} padding={adaptive ? 15 : 22}>
        <div className="MainLanding-exchanger">
          <ShowIn
            className="MainLanding-exchanger__content"
            animation="slideRight"
            scrollRemainderPercent={60}
          >
            <h2>{getLang('main_landing_exchanger_title')}</h2>
            <p>{getLang('main_landing_exchanger_description')}</p>
            <div className="MainLanding-exchanger__action">
              <Button>
                <Row alignItems="center">
                  {getLang('main_landing_try_exchanger')}
                  <SVG src={require('src/asset/24px/arrow_right_alt.svg')} />
                </Row>
              </Button>
              <Col className="transactions-today">
                <span className="transactions-today__title">445 678</span>
                <div className="transactions-today__description">
                  <div className="transactions-today__marker" />
                  <span>{getLang('main_landing_transactions_today')}</span>
                </div>
              </Col>
            </div>
          </ShowIn>
          {!adaptive && (
            <SuggestiveBox
              title={getLang('main_landing_telegram_button_title')}
              subtitle={getLang('main_landing_telegram_button_subtitle')}
              icon={
                <SVG
                  src={require('src/asset/icons/social/telegram-solid.svg')}
                />
              }
              size={sizes.medium}
              background
            />
          )}
          <div className="MainLanding-exchanger__backgrounds exchanger-backgrounds">
            <div className="exchanger-backgrounds__shadow" />
            {adaptive ? (
              <div className="exchanger-backgrounds__monitor--adaptive">
                <SVG
                  src={require('src/asset/backgrounds/main-landing/exchanger-monitor-adaptive.svg')}
                />
              </div>
            ) : (
              <>
                <div className="exchanger-backgrounds__monitor">
                  <SVG
                    src={require('src/asset/backgrounds/main-landing/exchanger-monitor.svg')}
                  />
                </div>
                <ShowIn
                  animation="slideTop"
                  className="exchanger-backgrounds__select-tokens"
                  scrollRemainderPercent={100}
                >
                  <SVG
                    src={require('src/asset/backgrounds/main-landing/exchanger-select-tokens.svg')}
                  />
                </ShowIn>
              </>
            )}
          </div>
        </div>
      </Container>
    </ShowIn>
  );
};

export default Exchanger;
