import React from 'react';
import { connect } from 'react-redux';
import apiSchema from "../../../../services/apiSchema";
import { ContentBox } from 'src/ui';

const DocumentationMethod = props => {
  return (
    <div className="Documentation_wrapper__content">
      <ContentBox>
        <h1>{props.routerParams.method}</h1>
        <pre>{JSON.stringify(apiSchema[props.routerParams.group][props.routerParams.method], null, 2)}</pre>
      </ContentBox>
    </div>
  );
};

export default connect(state => ({
  route: state.router.route,
}))(DocumentationMethod);
