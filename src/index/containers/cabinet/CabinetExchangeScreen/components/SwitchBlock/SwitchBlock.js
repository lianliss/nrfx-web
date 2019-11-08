import './SwitchBlock.less';
import React, { useState } from 'react';

import Balances from '../Balances/Balances';

import UI from '../../../../../../ui';

export default props => {

  const [tab, changeTab] = useState(0);

  const Switch = props.type === 'buttons' ? UI.SwitchButtons : UI.SwitchTabs;

  return (
    <div className="SwitchBlock Content_box">
      { !props.hideTabs && <Switch
        selected={tab}
        onChange={changeTab}
        tabs={
          props.contents.map((item, value) => ({
            label: item.title,
            disabled: item.disabled,
            value,
          }))
        }
      /> }
      {props.contents.find((item, value) => value === tab).content}
    </div>
  )
}