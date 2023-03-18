import React from 'react';

// Components
import { CabinetModal } from 'dapp';

// Styles
import './index.less';

function AdaptiveTop({ title, children, ...props }) {
  return (
    <CabinetModal
      {...props}
      className="Modal-AdaptiveTop"
      closeOfRef
      closeButton
      closeButtonTop={25}
      closeButtonRight={23}
    >
      <div className="Modal-AdaptiveTop-content">
        <h3>{title}</h3>
        <div className="Modal-AdaptiveTop__blocks">{children}</div>
      </div>
    </CabinetModal>
  );
}

AdaptiveTop.title = ({ title, children }) => {
  return (
    <div className="Modal-AdaptiveTop-block__title">
      <h4>{title}</h4>
      {children}
    </div>
  );
};

export default AdaptiveTop;
