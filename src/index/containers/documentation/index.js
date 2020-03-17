import React from "react";
import { connect } from "react-redux";
import { ContentBox } from "src/ui";

const Documentation = props => {
  const path = Object.values(props.routerParams);

  const schemaPath = (schema, path) => {
    if (!schema) {
      return "404";
    }
    if (!path.length) {
      if (schema.path) {
        return <pre>{JSON.stringify(schema, null, 4)}</pre>;
      }
    }

    return schemaPath(schema[path[0]], path.slice(1));
  };

  return schemaPath(props.schema, path);

  return (
    <div className="Documentation_wrapper__content">
      <ContentBox>
        <pre>{JSON.stringify(props, null, 4)}</pre>
        {Object.values(props.routerParams).join(", ")}
        {props.children}
      </ContentBox>
    </div>
  );
};

export default connect(state => ({
  schema: state.documentation.schema
}))(Documentation);
