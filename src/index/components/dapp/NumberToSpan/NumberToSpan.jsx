import React from 'react';

// Get numbers in string (text) and insert to span with className from props.
function NumberToSpan({ text, className }) {
  const format = /(-?\d(\.\d+)?%?)/g;

  const stringForHtml = text.replace(format, (x) => {
    return `<span class="${className}">${x}</span>`;
  });

  return <span dangerouslySetInnerHTML={{ __html: stringForHtml }} />;
}

export default NumberToSpan;
