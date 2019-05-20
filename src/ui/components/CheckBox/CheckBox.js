import React  from 'react';
import { classNames } from '../../utils';
import './CheckBox.less';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

export default function CheckBox(props) {
  const className = classNames({
    CheckBox: true,
    checked: props.checked,
    disabled: props.disabled
  });

  return (
    <div className={className} onClick={props.onChange}>
      <div className="CheckBox__indicator">
        <div className="CheckBox__indicator__active">
          <SVG src={require('../../asset/check_16.svg')} />
        </div>
      </div>
      <div className="CheckBox__label">{props.children}</div>
    </div>
  );
}

CheckBox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func
};
