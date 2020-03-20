import "./Form.less";

import React, { useState } from "react";

import { Input, Button, Code } from "src/ui";
import { ContentBox } from "../../../../ui";
import { invoke } from "src/services/api";
import * as toast from "../../../../actions/toasts";

export default ({ method }) => {
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState({});
  const [requestStatus, setRequestStatus] = useState("");

  const handleSetProperty = key => value => {
    setFormData({ ...formData, [key]: value });
  };

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

  return (
    <ContentBox className="MethodForm">
      <form onSubmit={handleSubmit}>
        {method.params.map(param => (
          <label className="MethodForm__field">
            <div className="MethodForm__field__label">{param.name}</div>
            <Input onTextChange={handleSetProperty(param.name)} />
          </label>
        ))}
        <Button state={requestStatus} type="submit">
          Submit
        </Button>
      </form>
      <Code type="json" className="MethodForm__response">
        {JSON.stringify(response, null, 2)}
      </Code>
    </ContentBox>
  );
};
