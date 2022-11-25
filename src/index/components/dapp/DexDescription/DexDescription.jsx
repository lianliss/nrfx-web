import React from 'react';

import './DexDescription.less';

function DexDescription({ children }) {
  return <div className="DexSwap__description">{children}</div>;
}

DexDescription.Item = ({ children }) => (
  <div className="DexSwap__description-item">{children}</div>
);

export default DexDescription;
