import "./Form.less";

import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateMethod } from "src/actions/documentation";
import { Input, Dropdown, Button, Code, ContentBox, Editor } from "src/ui";
import { invoke } from "src/services/api";
import * as toast from "src/actions/toasts";

const Form = ({ method }) => {
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState(null);
  const [requestStatus, setRequestStatus] = useState("");

  const handleSetProperty = key => value => {
    setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    const defaultFormData = {};
    let value = null;
    method.params.forEach(param => {
      if (param.filters.default) value = param.filters.default;
      if (param.filters.oneOf) value = param.filters.oneOf[0];
      if (param.filters.double) value = 1.0;
      if (param.filters.positive || param.filters.int) value = 0;
      if (param.filters.min || param.filters.int)
        value = param.filters.min || param.filters.int;

      if (value !== null) defaultFormData[param.name] = value;
    });
    setFormData(defaultFormData);
  }, [method.params.filters]);

  const handleSubmit = e => {
    e.preventDefault();
    setRequestStatus("loading");
    invoke(method.method, method.path, formData)
      .then(response => {
        setResponse(response);
      })
      .catch(err => {
        toast.error(err.message);
      })
      .finally(() => {
        setRequestStatus("");
      });
  };

  const handleChange = e => {
    const value = e.target.innerText;
    updateMethod("result", value);
  };

  return (
    <ContentBox className="MethodForm">
      <form onSubmit={handleSubmit}>
        {method.params.map(param => (
          <label className="MethodForm__field">
            <div className="MethodForm__field__label">{param.name}</div>
            {param.filters.oneOf ? (
              <Dropdown
                value={formData[param.name]}
                onChangeValue={handleSetProperty(param.name)}
                options={param.filters.oneOf.map(value => ({
                  title: value,
                  value
                }))}
              />
            ) : (
              <Input
                type={
                  (param.filters.double ||
                    param.filters.positive ||
                    param.filters.int) &&
                  "number"
                }
                value={formData[param.name]}
                onTextChange={handleSetProperty(param.name)}
              />
            )}
          </label>
        ))}
        <Button state={requestStatus} btnType ype="submit">
          Submit
        </Button>
      </form>
      {response ? (
        <Code type="json" className="MethodForm__response">
          {JSON.stringify(response, null, 2)}
        </Code>
      ) : (
        <Code type="json" simple className="MethodForm__response">
          <div
            className="MethodForm__response__editor"
            contentEditable={true}
            onInput={handleChange}
          >
            {method.result_example}
          </div>
        </Code>
      )}
    </ContentBox>
  );
};

export default connect(null, {
  updateMethod
})(Form);
