import React from 'react';

// Components
import { CopyText } from 'ui';
import CreatedText from '../CreatedText';

function CreatedNumber({ number }) {
  return (
    <CopyText text={number}>
      <CreatedText
        title={number}
        icon={require('src/asset/icons/action/copy-document.svg')}
      />
    </CopyText>
  );
}

export default CreatedNumber;
