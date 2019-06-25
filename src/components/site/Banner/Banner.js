import './Banner.less';

import React from 'react';

import UI from '../../../ui';
import AuthModal from '../AuthModal/AuthModal';

function Banner({ title, caption, btnText }) {
  return (
    <div className="Banner">
      <h2 className="Banner__title">{title}</h2>
      <p className="Banner__caption">{caption}</p>

      {/* TODO: control the wide (CTA) buttons via props */}
      <AuthModal>
        <UI.Button rounded type="outline" style={{ width: 240 }}>{btnText}</UI.Button>
      </AuthModal>
    </div>
  )
}

export default React.memo(Banner);