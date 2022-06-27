import React from 'react';

// Components
import { Row, Col, NumberFormat } from 'src/ui';
import SVG from 'utils/svg-wrap';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';

// Styles
import './Header.less';

function Header({
  title,
  subtitle,
  link,
  willGetNumber,
  friendsWillGetNumber,
}) {
  return (
    <Row justifyContent="space-between" className="Referral__header" wrap>
      <Col>
        <h1>{title}</h1>
        <p className="subtitle">
          {subtitle}
          {/* Earn up to <span className="blue">30%</span> from friends&#8217;
          commission <br />
          on Fiat deposits and <span className="blue">5%</span>&nbsp; from their
          <br />
          NRFX token purchases through an Narfex Exchanger */}
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
                <span>{link}</span>
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
                  <NumberFormat number={willGetNumber} percent />
                </span>
              </Col>
              <Col>
                <SVG src={require('../../asset/box-break.svg')} />
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
              <span className="strong">Friends will get</span>
              <span className="Referral__information_procent blue-gradient-text">
                <NumberFormat number={friendsWillGetNumber} percent />
              </span>
            </Col>
          </Row>
        </CabinetBlock>
      </Col>
    </Row>
  );
}

export default Header;
