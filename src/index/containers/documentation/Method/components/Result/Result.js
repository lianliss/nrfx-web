import "./Result.less";

import React, { useState } from "react";
import { connect } from "react-redux";
import { updateMethod } from "src/actions/documentation";
import { ContentBox } from "../../../../../../ui";
import { Input, Editor } from "src/ui";

const Result = ({ method, updateMethod }) => {
  const [value, setValue] = useState(method.result);

  const handleChange = value => updateMethod("result", value);

  return (
    <ContentBox className="Method__result">
      <h2>Result</h2>
      <p>
        <Editor content={method.result} onChange={handleChange} />
      </p>
    </ContentBox>
  );
};

export default connect(null, {
  updateMethod
})(Result);
