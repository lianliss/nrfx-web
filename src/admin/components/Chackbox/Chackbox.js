import React, { useEffect } from "react";
import { connect } from "react-redux";
import CheckBox from "../../../ui/components/CheckBox/CheckBox";
import { valueChange } from "../../../actions/admin/";

const CheckBoxWrapper = props => {
  const value = props.values[props.id] || props.value;

  useEffect(() => valueChange(props.id, !!props.value), [props.id]);

  return (
    <CheckBox
      onChange={value => {
        valueChange(props.id, value);
      }}
      checked={value}
    >
      {props.title}
    </CheckBox>
  );
};

export default connect(state => ({
  values: state.admin.values
}))(CheckBoxWrapper);
