import React, { useEffect } from "react";
import { connect } from "react-redux";
import Select from "../../../ui/components/Select/Select";
import { valueChange } from "../../../actions/admin/";
const InputWrapper = props => {
  const value = props.values[props.id] || props.value || [];
  const currentValue = [];

  const selectValue = props.multiple
    ? value
        .map(v => {
          return (
            Object.values(props.options).find(v2 => v2.value === v) || false
          );
        })
        .filter(Boolean)
    : Object.values(props.options).find(v => v.value === value);

  useEffect(() => valueChange(props.id, ""), [props.id]);

  return (
    <Select
      {...props}
      options={Object.values(props.options)}
      isMulti={props.multiple}
      onChange={value => {
        console.log(value);
        if (props.multiple) {
          valueChange(props.id, value ? value.map(v => v.value) : []);
        } else {
          valueChange(props.id, value ? value.value : null);
        }
      }}
      value={selectValue}
    />
  );
};

export default connect(state => ({
  values: state.admin.values
}))(InputWrapper);
