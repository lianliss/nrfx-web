import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Br.less';

function Br({ type }) {
  return <span className={`DocumentContainer__br-${type}`} />;
}

Br.PropTypes = {
  type: PropTypes.string,
};

Br.defaultProps = {
  type: 'default',
};

export default Br;
