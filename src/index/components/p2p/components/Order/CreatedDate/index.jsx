import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import CreatedText from '../CreatedText';

function CreatedDate({ date }) {
  return (
    <CreatedText
      title={moment(date).format('YYYY-MM-DD')}
      icon={require('src/asset/icons/cabinet/calendar.svg')}
    />
  );
}

CreatedDate.propTypes = {
  date: PropTypes.instanceOf(Date),
};

export default CreatedDate;
