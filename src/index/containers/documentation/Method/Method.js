import "./Method.less";

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Label, Code } from "src/ui/index";
import { ContentBox } from "src/ui";
import { getMethod } from "src/actions/documentation";
import Form from "../Form/Form";
import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";

const DocumentationMethod = props => {
  useEffect(() => {
    props.getMethod(props.routerParams.key.replace(/\-/g, "."));
  }, [props.routerParams.key]);

  const { method } = props;

  if (props.loadingStatus || !method) {
    return <LoadingStatus status={props.loadingStatus} />;
  }

  return (
    <>
      <div className="Documentation_wrapper__content Method">
        <ContentBox className="Method__main">
          <h1 className="Method__main__title">{method.name}</h1>
          <div className="Method__main__path">
            <h3>{"/" + method.path}</h3>
            <Label type={method.method} />
          </div>
          <p>{method.description}</p>
          <div className="Method__main__requirements">
            <div className="Method__main__requirements__title">
              Requirements:
            </div>
            {method.requirements.map(item => (
              <Label title={item} />
            ))}
          </div>
          <Code lang="json">{JSON.stringify(props.method, null, 2)}</Code>
        </ContentBox>
        {!!method.params.length && (
          <ContentBox className="Method__params">
            <h2>Parameters</h2>
            <div className="Method__params__list">
              {method.params.map(param => (
                <div className="Method__params__list__line">
                  <div className="Method__params__param">
                    <strong>{param.name}</strong>
                    <small>optional</small>
                  </div>
                  <div className="Method__params__description">
                    <p>Number of results per call.</p>
                    <p>Accepted values: 0 - 100. Default 25</p>
                  </div>
                </div>
              ))}
            </div>
          </ContentBox>
        )}
      </div>
      <div className="Documentation_wrapper__subContent">
        <Form method={method} />
      </div>
    </>
  );
};

export default connect(
  state => ({
    route: state.router.route,
    method: state.documentation.method,
    loadingStatus: state.documentation.loadingStatus.method
  }),
  {
    getMethod
  }
)(DocumentationMethod);
