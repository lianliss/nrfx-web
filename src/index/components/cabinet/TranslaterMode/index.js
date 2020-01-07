import React from 'react';
import { openModal } from 'actions'
import './TranslaterMode.less';

export default function TranslaterMode({langString, keys}) {
  const __handleOpenModalTranslate = (e, langString, keys) => {
    e.preventDefault();
    openModal('translator', {langString, keys})
  }

  return (
    <span className="Translation" onContextMenu={(e) => __handleOpenModalTranslate(e, langString, keys)}>
      {langString}
    </span>
  )
}