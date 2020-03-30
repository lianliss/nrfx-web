import React, { useEffect } from "react";
import { connect } from "react-redux";
import Dropdown from "../../../ui/components/Dropdown/Dropdown";
import { valueChange } from "../../../actions/admin/";
const DropdownWrapper = props => {
  useEffect(() => valueChange(props.id, props.value), [props.value, props.id]);
  const value = props.values[props.id];

  return (
    <Dropdown
      value={value}
      onChange={e => {
        valueChange(props.id, e.value);
      }}
      placeholder={props.placeholder}
      options={props.options.map(o => ({ title: o.label, value: o.value }))}
    />
  );
};

export default connect(state => ({
  values: state.admin.values
}))(DropdownWrapper);
