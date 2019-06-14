import './Banner.less';

import React from 'react';

import UI from '../../../ui';

function Banner({ title, caption, btnText }) {
  return (
    <div className="Banner">
      <h2 className="Banner__title">{title}</h2>
      <p className="Banner__caption">{caption}</p>

      {/* TODO: control the wide (CTA) buttons via props */}
      <UI.Button rounded type="outline" style={{ width: 240 }}>{btnText}</UI.Button>
    </div>
  )
}

export default React.memo(Banner);