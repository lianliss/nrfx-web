import React from 'react';
import PropTypes from 'prop-types';

// Components

// Utils
import { classNames as cn, getLang } from 'utils';
import { backgrounds, sizes } from '../../constants/benefit';

// Styles
import './index.less';

function BenefitCard({ size, background, image, title, visible }) {
  return (
    <div
      className={cn('MainLanding-BenefitCard', size, background, { visible })}
    >
      {image}
      <p className="MainLanding-BenefitCard__title">{getLang(title)}</p>
    </div>
  );
}

BenefitCard.propTypes = {
  size: PropTypes.oneOf(sizes),
  background: PropTypes.oneOf(backgrounds),
  title: PropTypes.string,
  visible: PropTypes.bool,
};

BenefitCard.defaultProps = {
  size: sizes.small,
  background: backgrounds.aliceBlue,
  title: '',
  visible: false,
};

BenefitCard.BackgroundImage = ({ children, style, className }) => {
  return (
    <div
      className={cn('MainLanding-BenefitCard__background', className)}
      style={{ position: 'absolute', ...style }}
    >
      {children}
    </div>
  );
};

export default BenefitCard;
