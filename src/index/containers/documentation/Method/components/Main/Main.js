import "./Main.less";

import React from "react";
import { connect } from "react-redux";
import { updateMethod } from "src/actions/documentation";
import { ContentBox, Label, Editor } from "src/ui";

const Main = ({ method, updateMethod }) => {
  const handleChange = value => updateMethod("description", value);

  return (
    <ContentBox className="Method__main">
      <h1 className="Method__main__title">{method.name}</h1>
      <div className="Method__main__path">
        <h3>{"/" + method.path}</h3>
        <Label type={method.method} />
      </div>
      <p>
        <Editor content={method.description} onChange={handleChange} />
      </p>
      <div className="Method__main__requirements">
        <div className="Method__main__requirements__title">Requirements:</div>
        {method.requirements.map(item => (
          <Label title={item} />
        ))}
      </div>
      {/*<Code lang="json">{JSON.stringify(props.method, null, 2)}</Code>*/}
    </ContentBox>
  );
};

export default connect(null, {
  updateMethod
})(Main);
