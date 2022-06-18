import "./PageContainer.less";

import React from "react";
import PropTypes from "prop-types";
import * as UI from "../../../../ui";
import useAdaptive from "src/hooks/adaptive";

function PageContainer({ children, sideBar, sidebarOptions }) {
  const adaptive = useAdaptive();

  return (
    <div className="PageContainer">
      <div className="PageContainer__sideBar">{sideBar}</div>
      <div className="PageContainer__content">{children}</div>
    </div>
  );
}

PageContainer.propTypes = {
  sideBar: PropTypes.node,
  sidebarOptions: PropTypes.array
};

export default React.memo(PageContainer);
