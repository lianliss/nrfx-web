import React from 'react';
import UI from '../../../../ui';

export default (props) => {
  const defaultProps = {
    height: 320,
    buttonProps: {
      size: "large"
    }
  };

  return (
    <div className="ActionCardBox Content_box" style={{
      height: props.height || defaultProps.height
    }}>
      <div className="ActionCardBox__icon">
        <div className="ActionCardBox__icon_content" style={{backgroundImage:`url(${props.icon})`}}>
        </div>
        <div className="ActionCardBox__description">
          {props.description}
        </div>
        <div className="ActionCardBox__button">
          <UI.Button {...(props.buttonProps||defaultProps.buttonProps)} onClick={props.action}>
            {props.actionTitle}
          </UI.Button>
        </div>
      </div>
    </div>
  )
}