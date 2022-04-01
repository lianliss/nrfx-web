import React from 'react';
import PropTypes from 'prop-types';

import './Card.less';

import Lang from "src/components/Lang/Lang";
import SVG from 'utils/svg-wrap';
import playIcon from '../../../../assets/play.svg';

function Card({ actionText, src, title, position, onClick }) {
  // Line break for title.
  const titleArray = title.split('/n');
  const result = (
    <>
      {titleArray[0]}
      <br />
      {titleArray[1]}
    </>
  );

  return (
    <div className="Card">
      <div className="Card__image-container" style={position}>
        <SVG src={src} />
      </div>
      <span className="Card__title">{result}</span>
      <div className="Card__action" onClick={onClick}>
        <SVG src={playIcon} className="Roadmap__icon" />
        <span>{actionText}</span>
      </div>
    </div>
  );
}

Card.defaultProps = {
  actionText: '',
  src: '/',
  title: '',
  position: { left: 0, top: 0 },
  onClick: () => {},
};

Card.propTypes = {
  actionText: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  position: PropTypes.objectOf(PropTypes.number),
  onClick: PropTypes.func,
};

export default Card;
