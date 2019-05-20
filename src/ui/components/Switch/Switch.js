import React  from 'react';
import { classNames } from '../../utils';
import './Switch.less';
import PropTypes from 'prop-types';

export default function Switch(props) {
  const className = classNames({
    Switch: true,
    on: props.on,
    disabled: props.disabled
  });

  return (
    <div className={className} onClick={props.onChange}>
      <div className="Switch__control">
        <div className="Switch__indicator" />
      </div>
      <div className="Switch__label">{props.children}</div>
    </div>
  );
}

Switch.propTypes = {
  on: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};
