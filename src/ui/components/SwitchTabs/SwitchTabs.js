import './SwitchTabs.less';

import React from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../../utils';

export default function SwitchTabs({ tabs, selected, onChange }) {

  const getSelectedIndex = () => {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].value === selected) {
        return i;
      }
    }
    return 0;
  };

  const indicatorWidth = 100 / tabs.length;
  return (
    <div className="SwitchTabs">
      {tabs.map((tab) => {
        return (
          <div
            key={tab.value}
            className={classNames({
              SwitchTabs__item: true,
              active: tab.value === selected
            })}
            onClick={() => onChange(tab.value)}
          >{tab.label}</div>
        )
      })}
      <div className="SwitchTabs__indicator" style={{ width: `calc(${indicatorWidth}% + 2px)`, transform: `translateX(${getSelectedIndex() * 100}%)` }} />
    </div>
  )
}

SwitchTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string
  })).isRequired,
  selected: PropTypes.any,
  onChange: PropTypes.func.isRequired
};
