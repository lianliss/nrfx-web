import React from 'react';
import { ContentBox } from 'src/ui';

export default props => {
  return (
    <div className="Documentation_wrapper__content">
      <ContentBox>{props.children}</ContentBox>
    </div>
  );
}
