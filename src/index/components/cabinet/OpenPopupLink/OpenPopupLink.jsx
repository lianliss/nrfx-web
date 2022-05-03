import React from 'react';
import PropTypes from 'prop-types';

import './OpenPopupLink.less';
import SVG from 'utils/svg-wrap';

function OpenPopupLink({ title, onClick }) {
  return (
    <span className="OpenPopupLink" onClick={onClick}>
      {title}
      <SVG src={require('src/asset/icons/export.svg')} />
    </span>
  );
}

OpenPopupLink.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

OpenPopupLink.defaultProps = {
  title: '',
  onClick: () => {},
};

export default OpenPopupLink;
