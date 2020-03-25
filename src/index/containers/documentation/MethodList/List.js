import { ContentBox, Editor } from "../../../../ui";
import React from "react";
import router from "../../../../router";
import * as PAGES from "../../../constants/pages";

export default props => (
  <ContentBox>
    <h1 className="MethodList__title">{props.name}</h1>
    <div className="MethodList__list">
      {Object.keys(props.methods)
        .filter(i => i !== "opened")
        .map(name => {
          const method = props.methods[name];
          return (
            <div
              onClick={handleMethodClick(props.methods, props.name, props.path)}
              className="MethodList__list__line"
            >
              <div className="MethodList__list__method">
                <strong>{name}</strong>
              </div>
              <div className="MethodList__list__description">
                <p>
                  <Editor readOnly content={method.description} />
                </p>
              </div>
            </div>
          );
        })}
    </div>
  </ContentBox>
);

const handleMethodClick = (method, name, path) => () => {
  if (method.key) {
    router.navigate(PAGES.DOCUMENTATION_API_METHOD, {
      key: method.key
    });
  } else {
    router.navigate(PAGES.DOCUMENTATION_API_LIST, {
      path: [...(path ? path.split("-") : []), name].join("-")
    });
  }
};
