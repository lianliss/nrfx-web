import './EditorTooltip.less';
import React from 'react';

import { classNames as cn } from '../../utils';

export default props => {
  return <div style={props.style} className={cn("EditorTooltip", props.className, { visible: props.visible })}>
    {props.buttons.map( button => (
      <div onMouseDown={e => {
        e.stopPropagation();
        e.preventDefault();
        props.onChange(button)
      }} className={cn("EditorTooltip__item", (button.style || button.block).toLowerCase())}>{button.title}</div>
    ))}
  </div>
}
