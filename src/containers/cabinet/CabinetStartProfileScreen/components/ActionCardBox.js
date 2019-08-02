import React from 'react';
import UI from '../../../../ui';

export default (props) => {
  return (
    <div className="ActionCardBox Content_box">
      <div className="ActionCardBox__icon">
        <div className="ActionCardBox__icon_content" style={{backgroundImage:`url(${props.icon})`}}>
        </div>
        <div className="ActionCardBox__description">
          {props.description}
        </div>
        <div className="ActionCardBox__button">
          <UI.Button size="large" onClick={props.action}>
            {props.actionTitle}
          </UI.Button>
        </div>
      </div>
    </div>
  )
}