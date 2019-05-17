import React  from 'react';
import { classNames } from '../../utils';
import './Input.less';
import PropTypes from 'prop-types';

export default function Input(props) {
  const className = classNames({
    Input: true,
    multiLine: props.multiLine
  });

  let params = {
    className,
    placeholder: props.placeholder,
    required: true
  };

  if (props.multiLine) {
    return <textarea {...params}>{props.value}</textarea>;
  }

  return <input {...params} value={props.value} />;
}

Input.propTypes = {
  placeholder: PropTypes.string,
  multiLine: PropTypes.bool,
  value: PropTypes.string
};
