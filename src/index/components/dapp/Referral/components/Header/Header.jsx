import React from 'react';

// Components
import { Row, Col, NumberFormat } from 'src/ui';
import SVG from 'utils/svg-wrap';
import CabinetBlock from '../../../CabinetBlock/CabinetBlock';
import NumberToSpan from '../../../NumberToSpan/NumberToSpan';

// Styles
import './Header.less';

function Header({
  title,
  subtitle,
  link,
  willGetNumber,
  friendsWillGetNumber,
  adaptive,
}) {
  const FriendsWillGet = () => {
    const Wrapper = adaptive ? Row : Col;

    return (
      <Wrapper
        className="Referral__information__future-secondary"
        alignItems="center"
      >
        <span className="strong">Friends will get</span>
        <span className="Referral__information_procent blue-gradient-text">
          <NumberFormat number={friendsWillGetNumber} percent />
        </span>
        {adaptive && (
          <span style={{ marginLeft: 'auto' }}>
            <SVG src={require('src/asset/icons/action/share.svg')} />
          </span>
        )}
      </Wrapper>
    );
  };

  return (
    <Row justifyContent="space-between" className="Referral__header" wrap>
      <Col>
        <h1>{title}</h1>
        <p className="subtitle">
          <NumberToSpan text={subtitle} className="blue" />
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
            {!adaptive && (
              <Col
                className="Referral__share"
                alignItems="center"
                justifyContent="center"
              >
                <SVG src={require('src/asset/icons/action/share.svg')} />
              </Col>
            )}
          </Row>
          <Row justifyContent="space-between" wrap={adaptive}>
            {adaptive && <FriendsWillGet />}
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
                  <NumberToSpan text="NRFX purchases 5%" className="blue" />
                </span>
                <Col>
                  <span className="secondary-text">
                    <NumberToSpan
                      text="Fiat replenishment 30%"
                      className="blue"
                    />
                  </span>
                  <span className="secondary-text small-text">
                    from the commission
                  </span>
                </Col>
              </Col>
            </Row>
            {!adaptive && <FriendsWillGet />}
          </Row>
        </CabinetBlock>
      </Col>
    </Row>
  );
}

export default Header;
