import "./Method.less";

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Label, Code } from "src/ui/index";
import { ContentBox } from "src/ui";
import { getMethod } from "src/actions/documentation";
import Main from "./components/Main/Main";
import Form from "./components/Form/Form";
import Params from "./components/Params/Params";
import Result from "./components/Result/Result";

import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";

const DocumentationMethod = props => {
  useEffect(() => {
    props.getMethod(props.routerParams.key);
  }, [props.routerParams.key]);

  console.log("METHOD RENDER");

  if (props.loadingStatus || !props.loaded) {
    return <LoadingStatus status={props.loadingStatus} />;
  }

  return (
    <>
      <div className="Documentation_wrapper__content Method">
        <Main />
        <Params />
        {/*<Result />*/}
      </div>
      <div className="Documentation_wrapper__subContent">
        <Form />
      </div>
    </>
  );
};

export default connect(
  state => ({
    route: state.router.route,
    loadingStatus: state.documentation.loadingStatus.method,
    loaded: !!state.documentation.method
  }),
  {
    getMethod
  }
)(DocumentationMethod);
