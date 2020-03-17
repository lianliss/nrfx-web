import "./StaticContentModal.less";
//
import React, { useState, useEffect } from "react";
//
import * as UI from "src/ui";
import * as utils from "utils";
import { getStaticPageContent } from "src/actions";
import ModalState from "../../cabinet/ModalState/ModalState";

export default props => {
  const { type } = props;
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState({});

  const __load = () => {
    setStatus("loading");
    getStaticPageContent(type)
      .then(data => {
        setStatus(null);
        setData(data);
      })
      .catch(() => {
        setStatus("failed");
      });
  };

  useEffect(__load, [type]);

  return status ? (
    <ModalState status={status} onRetry={__load} />
  ) : (
    <UI.Modal
      isOpen={true}
      className="StaticContentModal"
      onClose={props.onBack}
    >
      <UI.ModalHeader>{data.title}</UI.ModalHeader>
      <div className="StaticContentModal__content__wrapper">
        <div
          className="StaticContentModal__content"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        <UI.Button fontSize={15} onClick={props.onBack}>
          {utils.getLang("site__goBack")}
        </UI.Button>
      </div>
    </UI.Modal>
  );
};
