import React from 'react';

// Components
import { NumberFormat, Row, Col } from 'src/ui';

// Utils
import { classNames as cn } from 'src/utils';

// Styles
import './Card.less';

function Card({
  firstTitle,
  firstCount,
  firstIcon,
  secondTitle,
  secondCount,
  secondIcon,
  secondary,
}) {
  return (
    <Col
      justifyContent="center"
      className={cn('Referral__Card', { secondary })}
    >
      <Row>
        {firstIcon && <Col>{firstIcon}</Col>}
        <Col>
          <p className="Referral__Card__title">{firstTitle}</p>
          <p className="Referral__Card__count">{firstCount}</p>
        </Col>
      </Row>
      <Row>
        {secondIcon && <Col>{secondIcon}</Col>}
        <Col>
          <p className="Referral__Card__title">{secondTitle}</p>
          <p className="Referral__Card__count">{secondCount}</p>
        </Col>
      </Row>
    </Col>
  );
}

export default Card;
