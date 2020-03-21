import "./MethodList.less";
import React from "react";
import { connect } from "react-redux";
import { ContentBox } from "../../../../ui";
import router from "../../../../router";
import * as PAGES from "../../../constants/pages";

const MethodList = props => {
  const handleMethodClick = (method, name) => () => {
    if (method.key) {
      router.navigate(PAGES.DOCUMENTATION_API_METHOD, {
        key: method.key.replace(/\./g, "-")
      });
    } else {
      router.navigate(PAGES.DOCUMENTATION_API_LIST, {
        path: [...(path ? path.splat("-") : []), name].join("-")
      });
    }
  };

  const render = (name, schema) => (
    <div className="Documentation_wrapper__content MethodList">
      <ContentBox>
        <h1 className="MethodList__title">{name}</h1>
        <div className="MethodList__list">
          {Object.keys(schema)
            .filter(i => i !== "opened")
            .map(name => {
              const method = schema[name];
              return (
                <div
                  onClick={handleMethodClick(method, name)}
                  className="MethodList__list__line"
                >
                  <div className="MethodList__list__method">
                    <strong>{name}</strong>
                  </div>
                  <div className="MethodList__list__description">
                    <p>{method.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </ContentBox>
    </div>
  );

  const schemaPath = (name, schema, path) => {
    if (!schema) {
      return "404";
    }

    if (!path.length) {
      if (!schema.key) {
        return render(name, schema);
      }
    }

    return schemaPath(path[0], schema[path[0]], path.slice(1));
  };

  const { path } = props.routerParams;

  return schemaPath("API", props.schema, path ? path.split("-") : []);
};

export default connect(state => ({
  schema: state.documentation.schema
}))(MethodList);