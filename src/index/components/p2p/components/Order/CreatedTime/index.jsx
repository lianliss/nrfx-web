import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import CreatedText from '../CreatedText';

function CreatedTime({ time }) {
  return (
    <CreatedText
      title={moment(time).format('HH:mm:ss')}
      icon={require('src/asset/icons/cabinet/clock.svg')}
    />
  );
}

CreatedTime.propTypes = {
  time: PropTypes.instanceOf(Date),
};

export default CreatedTime;
