import "./Main.less";

import React from "react";
import { connect } from "react-redux";
import { updateMethod, saveMethod } from "src/actions/documentation";
import { ContentBox, Label, Button, Editor } from "src/ui";
import router from "../../../../../../router";
import { getLang } from "src/utils";
import * as PAGES from "../../../../../constants/pages";

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
            {getLang("global_save")}
          </Button>
        )}
      </h1>
      <div className="Method__main__path">
        <h3>{"/" + props.path}</h3>
        <Label type={props.method} />
      </div>
      <div className="Method__main__content">
        <Editor
          readOnly={!props.editMode}
          content={props.description}
          onChange={handleChange}
        />
      </div>
      {!!props.requirements.length && (
        <div className="Method__main__requirements">
          <div className="Method__main__requirements__title">
            {getLang("cabinet_docsRequirements")}:
          </div>
          {props.requirements.map(item => (
            <Label
              onClick={() => {
                router.navigate(PAGES.DOCUMENTATION_PAGE, {
                  page: item
                });
              }}
              title={item}
            />
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
