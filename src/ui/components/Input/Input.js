import './Input.less';

import React  from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils';


function Input(props) {
  const className = classNames({
    Input: true,
    multiLine: props.multiLine
  });

  let params = {
    className,
    placeholder: props.placeholder,
    type: props.type,
    autoComplete: props.autocomplete,
    required: true,
  };

  if (props.multiLine) {
    return <textarea {...params} onChange={props.onChange}>{props.value}</textarea>;
  }

  return <input {...params} value={props.value} onChange={props.onChange} />;
}

Input.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  multiLine: PropTypes.bool,
  value: PropTypes.string
};

export default React.memo(Input);
