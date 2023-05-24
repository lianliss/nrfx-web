import React from 'react';
import _ from 'lodash';

// Components
import { Row, CheckBox } from 'ui';
import { Select } from 'dapp';
import Column from '../Column/Column';

// Utils
import moment from 'moment';
import formDropdownIcon from 'src/asset/icons/arrows/form-dropdown.svg';

const HOURS = (new Array(24))
  .fill(null)
  .map((_, i) => i);

function Hours({ day, data, onChange }) {
  let startHour = null;
  let endHour = null;
  let isActive = false;
  for (let i = 0; i < 24; i++) {
    if (data[i]) {
      isActive = true;
      if (_.isNull(startHour)) {
        startHour = i;
      }
    }
  }
  for (let i = 23; i >= 0; i--) {
    if (data[i]) {
      if (_.isNull(endHour)) {
        endHour = i;
      }
    }
  }
  const hourOptions = HOURS.map((hour, index) => {
    const validHour = moment.utc(hour * 3600 * 1000).format('HH:mm');

    return {
      value: index,
      label: validHour,
    };
  });

  return (
    <Column className="ValidatorTradeForm__hours">
      <h4>
        <CheckBox checked={isActive}
                  onChange={value => {
                    onChange((new Array(24)).fill(value))
                  }}
                  type="simple">{day}</CheckBox>
      </h4>
      <Row>
        <Select
          value={startHour}
          onChange={value => {
            if (!isActive) return;
            let newHours = [];
            for (let i = 0; i < 24; i++) {
              newHours.push(i >= value && i <= endHour);
            }
            onChange(newHours);
          }}
          options={hourOptions.filter(o => o.value < endHour)}
          type="simple"
          placeholder="Start"
          indicatorIcon={formDropdownIcon}
        />
        <Select
          value={endHour}
          onChange={value => {
            if (!isActive) return;
            let newHours = [];
            for (let i = 0; i < 24; i++) {
              newHours.push(i >= startHour && i <= value);
            }
            onChange(newHours);
          }}
          options={hourOptions.filter(o => o.value > startHour)}
          type="simple"
          placeholder="End"
          indicatorIcon={formDropdownIcon}
        />
      </Row>
    </Column>
  );
}

export default Hours;
