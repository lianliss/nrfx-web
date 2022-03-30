import React from 'react';
import PropTypes from 'prop-types';

import SVG from 'utils/svg-wrap';
import './Service.less';

function Service({ icon, title }) {
  return (
    <div className="Service">
      <div className="Service__icon icon-container">
        <SVG src={icon} />
      </div>
      <span className="Service__title gradient-text">{title}</span>
    </div>
  );
}

Service.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
};

Service.defaultProps = {
  icon: '/',
  title: '',
};

export default Service;
