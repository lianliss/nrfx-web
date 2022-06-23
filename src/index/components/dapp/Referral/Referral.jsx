import React from 'react';
import { useSelector } from 'react-redux';
import { useRoute } from 'react-router5';

// Components
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import { Row, Col } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import { DAPP, DAPP_REFERRAL } from '../../../constants/pages';

// Styles
import './Referral.less';

function Referral() {
  const { router } = useRoute();
  const params = useSelector((state) => state.router.route.params);
  const type = params.type || null;

  // Redirect to DAPP page, if type !== exchange or farming.
  if (type !== 'exchange') {
    router.navigate(DAPP_REFERRAL, { type: 'exchange' });
  }

  return (
    <CabinetBlock className="Referral">
      <Row justifyContent="space-between" className="Referral__header">
        <Col>
          <h1>Invite your friends. Earn cryptocurrency together</h1>
          <p className="subtitle">
            Earn up to <span className="blue">30%</span> from friends&#8217;
            commission <br />
            on Fiat deposits and <span className="blue">5%</span>&nbsp; from
            their <br />
            NRFX token purchases through an Narfex Exchanger
          </p>
          <span className="link blue-gradient-text">Read more ›</span>
        </Col>
        <Col className="Referral__information">
          <CabinetBlock>
            <Row alignItems="center" justifyContent="space-between">
              <h2>Copy Referral Link</h2>
              <Col>
                <Row alignItems="center" className="create-new-link">
                  <span className="strong">Create new link</span>
                  <SVG
                    src={require('src/asset/icons/cabinet/add-icon-blue.svg')}
                  />
                </Row>
              </Col>
            </Row>
            <Row justifyContent="space-between">
              <Col className="Referral__copy">
                <Row alignItems="center" justifyContent="space-between">
                  <span>https://narfex.org?ref=dd4e20hfj09nrtyasdasdasd</span>
                  <SVG src={require('src/asset/icons/action/copy.svg')} />
                </Row>
              </Col>
              <Col
                className="Referral__share"
                alignItems="center"
                justifyContent="center"
              >
                <SVG src={require('src/asset/icons/action/share.svg')} />
              </Col>
            </Row>
            <Row justifyContent="space-between">
              <Row
                className="Referral__information__future"
                justifyContent="space-between"
                alignItems="center"
              >
                <Col justifyContent="center">
                  <span className="strong">You will get</span>
                  <span className="Referral__information_procent blue-gradient-text">
                    100%
                  </span>
                </Col>
                <Col>
                  <SVG src={require('./asset/box-break.svg')} />
                </Col>
                <Col justifyContent="center">
                  <span className="secondary-text">
                    NRFX purchases <span className="blue">5%</span>
                  </span>
                  <Col>
                    <span className="secondary-text">
                      Fiat replenishment <span className="blue">30%</span>
                    </span>
                    <span className="secondary-text small-text">
                      from the commission
                    </span>
                  </Col>
                </Col>
              </Row>
              <Col
                className="Referral__information__future-secondary"
                alignItems="center"
              >
                <span className="strong">You will get</span>
                <span className="Referral__information_procent blue-gradient-text">
                  0%
                </span>
              </Col>
            </Row>
          </CabinetBlock>
        </Col>
      </Row>
    </CabinetBlock>
  );
}

export default Referral;
