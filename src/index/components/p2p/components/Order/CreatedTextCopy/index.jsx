import React from 'react';

// Components
import { CopyText } from 'ui';
import CreatedText from '../CreatedText';

function CreatedTextCopy({ text }) {
  return (
    <CopyText text={text}>
      <CreatedText
        title={text}
        icon={require('src/asset/icons/action/copy-document.svg')}
      />
    </CopyText>
  );
}

export default CreatedTextCopy;
