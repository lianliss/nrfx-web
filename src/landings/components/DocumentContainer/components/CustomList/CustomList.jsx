import React from 'react';

function CustomList({ children, separator = '' }) {
  return (
    <ul className="custom-list" style={{ listStyleType: `"${separator}"` }}>
      {children}
    </ul>
  );
}

export default CustomList;
