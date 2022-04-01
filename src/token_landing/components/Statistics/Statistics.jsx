import React from 'react';
import PropTypes, { object, objectOf } from 'prop-types';

import { getLang } from 'utils';
import './Statistics.less';

function Statistics({ data }) {
  return (
    <div className="StatisticsContainer">
      <div className="Statistics">
        {data.map((item, key) => (
          <div className="Statistics__item Statistic" key={key}>
            <div className="Statistic__content">
              <span className="Statistic__value">{item.value}</span>
              <span className="Statistic__name">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Statistics.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Statistics;
