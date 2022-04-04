import React from 'react';
import PropTypes from 'prop-types';

import './Card.less';

import { getLang } from 'utils';
import SVG from 'utils/svg-wrap';
import playIcon from '../../../../assets/play.svg';

function Card({ actionText, src, title, position, onClick, link }) {
  // Line break for title.
  const titleArray = getLang(title).split('/n');
  const result =
    titleArray.length > 1 ? (
      <>
        {titleArray[0]}
        <br />
        {titleArray[1]}
      </>
    ) : (
      titleArray[0]
    );

  return (
    <div className="Card">
      <div className="Card__image-container" style={position}>
        <SVG src={src} />
      </div>
      <span className="Card__title">{result}</span>
      {link ? (
        <a
          onClick={onClick}
          className="Card__action"
          href={link}
          target={link ? '_blank' : false}
        >
          <SVG src={playIcon} className="Roadmap__icon" />
          <span>{getLang(actionText)}</span>
        </a>
      ) : (
        <div
          onClick={onClick}
          className="Card__action"
        >
          <SVG src={playIcon} className="Roadmap__icon" />
          <span>{getLang(actionText)}</span>
        </div>
      )}
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
