import React, { forwardRef } from 'react';

const Title = forwardRef(({ children }, ref) => {
  return (
    <h2 className="title" ref={ref}>
      {children}
    </h2>
  );
});

export default Title;
