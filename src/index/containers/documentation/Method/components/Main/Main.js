import "./Main.less";

import React from "react";
import { connect } from "react-redux";
import { updateMethod, saveMethod } from "src/actions/documentation";
import { ContentBox, Label, Button, Editor } from "src/ui";

const Main = props => {
  const handleChange = value => props.updateMethod("description", value);

  return (
    <ContentBox className="Method__main">
      <h1 className="Method__main__title">
        {props.name}
        {props.editMode && (
          <Button
            state={props.saveStatus}
            onClick={props.saveMethod}
            size="small"
          >
            Save
          </Button>
        )}
      </h1>
      <div className="Method__main__path">
        <h3>{"/" + props.path}</h3>
        <Label type={props.method} />
      </div>
      <p>
        <Editor
          readOnly={!props.editMode}
          content={props.description}
          onChange={handleChange}
        />
      </p>
      {!!props.requirements.length && (
        <div className="Method__main__requirements">
          <div className="Method__main__requirements__title">Requirements:</div>
          {props.requirements.map(item => (
            <Label title={item} />
          ))}
        </div>
      )}
    </ContentBox>
  );
};

export default connect(
  state => ({
    editMode: state.documentation.editMode,
    name: state.documentation.method.name,
    description: state.documentation.method.description,
    method: state.documentation.method.method,
    path: state.documentation.method.path,
    saveStatus: state.documentation.loadingStatus.saveMethod,
    requirements: state.documentation.method.requirements
  }),
  {
    updateMethod,
    saveMethod
  }
)(Main);
