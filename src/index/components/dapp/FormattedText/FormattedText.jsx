import React from 'react';
import { getLang } from 'utils';

// Get regularExpression in string (text||lang)
// and insert to span with className from props.
function FormattedText({
  text,
  lang,
  className = '',
  tagClassName = '',
  regularExpression = /(-?\d(\.\d+)?%?)/g,
  tag: Tag = 'span',
}) {
  const initialString = text ? text : getLang(lang, true);
  const stringForHtml = initialString
    .replace(/(\\n|\n)/g, '<br />')
    .replace(regularExpression, (x) => {
      const result = x.replace('{', '').replace('}', '');

      return `<span class="${className}">${result}</span>`;
    });

  return (
    <Tag
      className={tagClassName}
      dangerouslySetInnerHTML={{ __html: stringForHtml }}
    />
  );
}

export default FormattedText;
