import React from 'react';
import PropTypes from 'prop-types';

// Components

// Utils
import { classNames as cn } from 'utils';

// Styles
import './index.less';

function BenefitCard({ size, background, image, title }) {
  return (
    <div className={cn('MainLanding-BenefitCard', size, background)}>
      <p className="MainLanding-BenefitCard__title">{title}</p>
    </div>
  );
}

BenefitCard.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  background: PropTypes.oneOf(['blue', 'alice-blue', 'orange']),
};

BenefitCard.defaultProps = {
  size: 'small',
  background: 'alice-blue',
};

export default BenefitCard;
