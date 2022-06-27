import React from 'react';

// Components
import { Row, Col, HoverPopup } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn } from 'src/utils';

// Styles
import './Card.less';

function Card({
  firstTitle,
  firstCount,
  firstIcon,
  firstQuestion,
  secondTitle,
  secondCount,
  secondIcon,
  secondQuestion,
  secondary,
}) {
  const CardIcon = ({ src, background }) => (
    <div className="icon-container" style={{ background }}>
      <SVG src={require(`src/${src}`)} />
    </div>
  );

  return (
    <Col
      justifyContent="center"
      className={cn('Referral__Card', { secondary })}
    >
      <Row>
        {firstIcon && (
          <Col>
            <CardIcon src={firstIcon.src} background={firstIcon.background} />
          </Col>
        )}
        <Col>
          <p className="Referral__Card__title">{firstTitle}</p>
          <p className="Referral__Card__count">{firstCount}</p>
        </Col>
        {firstQuestion && (
          <HoverPopup
            content={<span>{firstQuestion}</span>}
            type="top"
            size="small"
            windowRight={28}
            windowLeft={28}
          >
            <SVG
              src={require('src/asset/icons/warning-blue.svg')}
              style={{ width: 14, height: 14 }}
            />
          </HoverPopup>
        )}
      </Row>
      <Row>
        {secondIcon && (
          <Col>
            <CardIcon src={secondIcon.src} background={secondIcon.background} />
          </Col>
        )}
        <Col>
          <p className="Referral__Card__title">{secondTitle}</p>
          <p className="Referral__Card__count">{secondCount}</p>
        </Col>
        {secondQuestion && (
          <HoverPopup
            content={<span>{secondQuestion}</span>}
            type="top"
            size="small"
            windowRight={28}
            windowLeft={28}
          >
            <SVG
              src={require('src/asset/icons/warning-blue.svg')}
              style={{ width: 14, height: 14 }}
            />
          </HoverPopup>
        )}
      </Row>
    </Col>
  );
}

export default Card;
