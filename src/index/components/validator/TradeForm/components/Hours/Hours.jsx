import React from 'react';

// Components
import { Row } from 'ui';
import { Select } from 'dapp';
import Column from '../Column/Column';

// Utils
import hours from '../../constants/hours';
import moment from 'moment';
import formDropdownIcon from 'src/asset/icons/arrows/form-dropdown.svg';

function Hours({ day }) {
  const hourOptions = hours.map((hour) => {
    const validHour = moment.utc(hour * 3600 * 1000).format('HH:mm');

    return {
      value: validHour,
      label: validHour,
    };
  });

  return (
    <Column className="ValidatorTradeForm__hours">
      <h4>{day}</h4>
      <Row>
        <Select
          value={null}
          onChange={() => {}}
          options={hourOptions}
          type="simple"
          placeholder="Start"
          indicatorIcon={formDropdownIcon}
        />
        <Select
          value={null}
          onChange={() => {}}
          options={hourOptions}
          type="simple"
          placeholder="End"
          indicatorIcon={formDropdownIcon}
        />
      </Row>
    </Column>
  );
}

export default Hours;
