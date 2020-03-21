import React, { useEffect } from "react";
import { connect } from "react-redux";
import Editor from "../../../ui/components/Editor/Editor";
import { valueChange } from "../../../actions/admin/";
const WysiwygWrapper = props => {
  const value = props.values[props.id] || props.value;

  useEffect(() => valueChange(props.id, props.value), [props.id]);

  return (
    <Editor
      onChange={value => valueChange(props.id, value)}
      border
      on
      content={value}
    />
  );
};

export default connect(state => ({
  values: state.admin.values
}))(WysiwygWrapper);
