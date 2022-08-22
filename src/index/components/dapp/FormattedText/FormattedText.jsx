import React from 'react';

// Get regularExpression in string (text)
// and insert to span with className from props.
function FormattedText({
  text,
  className = '',
  regularExpression = /(-?\d(\.\d+)?%?)/g,
}) {
  const stringForHtml = text
    .replace(regularExpression, (x) => {
      const result = x.replace('{', '').replace('}', '');

      return `<span class="${className}">${result}</span>`;
    })
    .replace('\n', '<br />');

  return <span dangerouslySetInnerHTML={{ __html: stringForHtml }} />;
}

export default FormattedText;
