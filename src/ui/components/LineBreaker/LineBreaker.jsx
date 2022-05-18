import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './LineBreaker.less';

// Component will add <br /> instead of \n in text.
// Return just HTML text and <br /> tag which doesnt have container.
function LineBreaker({ text }) {
  const textPieces = text.split('\n');

  return (
    <>
      {textPieces.map((piece, index) => (
        <React.Fragment key={index}>
          {piece}
          <br />
        </React.Fragment>
      ))}
    </>
  );
}

LineBreaker.propTypes = {
  text: PropTypes.string,
};

LineBreaker.defaultProps = {
  text: '',
};

export default LineBreaker;
