import React from 'react';

import './DexDescription.less';

function DexDescription({ children }) {
  return <div className="DexDescription">{children}</div>;
}

DexDescription.Item = ({ children }) => (
  <div className="DexDescription-item">{children}</div>
);

export default DexDescription;
