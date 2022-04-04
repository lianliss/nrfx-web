import React from 'react';
import PropTypes, { object, objectOf } from 'prop-types';

import { getLang } from 'utils';
import { NumberFormat, } from "src/ui";
import './Statistics.less';

function Statistics({ price }) {

  const data = [
    {
      name: getLang('token_landing_statistics_1_name'),
      value: price ? <>$<NumberFormat number={price} currency="" /></> : "-"
    },
    {
      name: getLang('token_landing_statistics_2_name'),
      value: getLang('token_landing_statistics_2_value'),
    },
    {
      name: getLang('token_landing_statistics_3_name'),
      value: getLang('token_landing_statistics_3_value'),
    },
    {
      name: getLang('token_landing_statistics_4_name'),
      value: getLang('token_landing_statistics_4_value'),
    }
  ];

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
