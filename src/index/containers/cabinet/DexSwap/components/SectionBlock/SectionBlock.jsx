import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './SectionBlock.less';

function SectionBlock({ className, title, children }) {
  return (
    <div className={`SectionBlock ${className}`}>
      <span className={`SectionBlock__title ${className}__title`}>{title}</span>
      <div className={`SectionBlock__content ${className}__content`}>{children}</div>
    </div>
  );
}

SectionBlock.propTypes = {
  className: PropTypes.string,
  title: PropTypes.any,
  children: PropTypes.any,
};

SectionBlock.defaultProps = {
  className: '',
  title: '',
  children: '',
};

export default SectionBlock;
