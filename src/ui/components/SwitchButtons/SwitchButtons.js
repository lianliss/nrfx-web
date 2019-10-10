// styles
import './SwitchButtons.less';
// external
import React from 'react';
import PropTypes from 'prop-types';
// internal
import UI from '../../index';

const SwitchButtons = props => {
  return (
    <div className="SwitchButtons">
      {props.tabs.map(tab => (
        <UI.Button
          key="all"
          size="ultra_small"
          rounded
          type={tab.value !== props.selected ? "secondary" : null}
          onClick={() => props.onChange(tab.value)}
        >{tab.label}</UI.Button>
      ))}
    </div>
  )
}

SwitchButtons.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string
  })).isRequired,
  selected: PropTypes.any,
  currency: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default SwitchButtons;