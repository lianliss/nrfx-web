// styles
import './SwitchTabs.less';
// external
import React from 'react';
import PropTypes from 'prop-types';
// internal
import {classNames} from '../../../utils';
import UI from '../../index';

export default function SwitchTabs({ tabs, selected, onChange, currency }) {

  const getSelectedIndex = () => {
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].value === selected) {
        return i;
      }
    }
    return 0;
  };

  const { gradient, color } = currency;

  const fillIndicatorStyle = {
    background: (gradient ? `linear-gradient(45deg, ${gradient[0]} 0%, ${gradient[1]} 100%)` : null)
  };

  const indicatorWidth = 100 / tabs.length;
  return (
    <div className="SwitchTabs" style={{ color }}>
      {tabs.map((tab) => {
        return (
          <div
            key={tab.value}
            className={classNames({
              SwitchTabs__item: true,
              active: tab.value === selected,
            })}
            onClick={tab.onClick || (() => onChange(tab.value))}
          >{tab.label}</div>
        )
      })}
      <div
        className="SwitchTabs__indicator"
        style={{
          width: `calc(${indicatorWidth}% + 2px)`,
          transform: `translateX(calc((100% - 2px) * ${getSelectedIndex()}))`,
          ...fillIndicatorStyle
        }} />
    </div>
  )
}

SwitchTabs.defaultProps = {
  currency: {},
};

SwitchTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string
  })).isRequired,
  selected: PropTypes.any,
  currency: PropTypes.object,
  onChange: PropTypes.func.isRequired
};
