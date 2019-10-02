// styles
import './Switch.less';
// external
import React  from 'react';
import PropTypes from 'prop-types';
// internal
import {classNames} from '../../utils';

function Switch(props) {
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

export default React.memo(Switch);
