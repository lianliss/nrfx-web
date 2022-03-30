import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'utils/svg-wrap';
import './Benefit.less';

function Benefit({ icon, title, description }) {
  return (
    <article className="Benefit">
      <div className="Benefit__icon-container">
        <SVG src={icon} />
      </div>
      <h3 className="Benefit__title">{title}</h3>
      <p className="Benefit__description">{description}</p>
    </article>
  );
}

Benefit.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

Benefit.defaultProps = {
  icon: '/',
  title: '',
  description: '',
};

export default Benefit;
