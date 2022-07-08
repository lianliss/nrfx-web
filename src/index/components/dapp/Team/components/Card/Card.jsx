import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Row, Col } from 'src/ui';

// Utils
import { classNames as cn } from 'src/utils';

// Styles
import './Card.less';

function Card({ name, job, bio, image }) {
  const [isActive, setIsActive] = React.useState(false);

  return (
    <article className="Team__Card">
      <Col>
        <div className="Team__Card__icon">
          <img src={image} alt={name} />
        </div>
        <h3 className="Team__Card__title">{name}</h3>
        <span className="Team__Card__tag">{job}</span>
        <p className={cn('Team__Card__description', { active: isActive })}>
          {bio}
        </p>
        <Row
          className="Team__Card__show-all"
          onClick={() => setIsActive((prev) => !prev)}
          alignItems="center"
        >
          <span>Read more</span>
          <div className={cn('Team__Card__arrow', { active: isActive })}>›</div>
        </Row>
      </Col>
    </article>
  );
}

Card.propTypes = {
  name: PropTypes.string,
  job: PropTypes.string,
  bio: PropTypes.string,
  image: PropTypes.string,
};

Card.defaultProps = {
  name: '',
  job: '',
  bio: '',
  image: '',
};

export default Card;
