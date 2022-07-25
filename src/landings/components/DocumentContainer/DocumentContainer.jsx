import React from 'react';

// Components
import { Title, CustomList, LongText, Br } from './components';

// Styles
import './DocumentContainer.less';

function DocumentContainer({ children }) {
  return (
    <div className="DocumentContainer__wrap">
      <div className="DocumentContainer">{children}</div>
    </div>
  );
}

DocumentContainer.Title = Title;
DocumentContainer.CustomList = CustomList;
DocumentContainer.LongText = LongText;
DocumentContainer.Br = Br;

export default DocumentContainer;
