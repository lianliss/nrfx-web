import './Banner.less';

import React from 'react';

import UI from '../../../ui';
import * as actions from '../../../actions';
import * as steps from '../AuthModal/fixtures';

function Banner({ title, caption, btnText }) {
  return (
    <div className="Banner">
      <h2 className="Banner__title">{title}</h2>
      <p className="Banner__caption">{caption}</p>
      {/* TODO: control the wide (CTA) buttons via props */}
      <UI.Button onClick={() => actions.openModal('auth', {type: steps.REGISTRATION})} fontSize={15} rounded type="outline" style={{ width: 240 }}>{btnText}</UI.Button>
    </div>
  )
}

export default React.memo(Banner);