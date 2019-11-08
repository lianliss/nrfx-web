import React from 'react';
import { connect } from 'react-redux';
import Input from '../../../ui/components/Input/Input';
import { valueChange } from '../../../actions/admin/';
const InputWrapper = props => {
  const value = props.values[props.id] || props.value;
  return (
    <Input {...props} onTextChange={value => {
      valueChange(props.id, value);
    }} value={value} />
  )
}

export default connect(state => ({
  values: state.admin.values
}))(InputWrapper);