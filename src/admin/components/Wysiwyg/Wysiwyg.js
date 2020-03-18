import React, { useEffect } from "react";
import { connect } from "react-redux";
import Editor from "../../../ui/components/Editor/Editor";
import { valueChange } from "../../../actions/admin/";
const InputWrapper = props => {
  const value = props.values[props.id] || props.value;

  useEffect(() => valueChange(props.id, ""), [props.id]);

  return <Editor border />;
};

export default connect(state => ({
  values: state.admin.values
}))(InputWrapper);
