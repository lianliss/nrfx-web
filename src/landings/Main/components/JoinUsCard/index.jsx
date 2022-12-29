import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './index.less';

function JoinUsCard({ title, icon, link, className }) {
  return (
    <div className={cn('MainLanding-JoinUsCard', className)}>
      <img src={icon} className="MainLanding-JoinUsCard__background" />
      <p className="MainLanding-JoinUsCard__title">{title}</p>
      {link}
    </div>
  );
}

JoinUsCard.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  link: PropTypes.node,
};

JoinUsCard.defaultProps = {
  title: '',
  icon: '',
  className: '',
  link: null,
};

export default JoinUsCard;
