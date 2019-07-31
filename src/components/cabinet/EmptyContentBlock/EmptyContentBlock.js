import './EmptyContentBlock.less';

import React from 'react';
import PropTypes from 'prop-types';
import UI from '../../../ui';

import * as utils from '../../../utils';

export default function EmptyContentBlock({ icon, message, button, skipContentClass }) {
  return (
    <div className={utils.classNames({
      EmptyContentBlock: true,
      Content_box: !skipContentClass
    })}>
      <div className="EmptyContentBlock__content">
        <div className="EmptyContentBlock__content__icon" style={{ backgroundImage: `url(${icon})` }} />
        <div className="EmptyContentBlock__content__message">{message}</div>
      </div>
      {button && <div className="EmptyContentBlock__call_to_action">
        <UI.Button onClick={button.onClick}>{button.text}</UI.Button>
      </div>}
    </div>
  )
}

EmptyContentBlock.propTypes = {
  icon: PropTypes.string,
  message: PropTypes.string,
  button: PropTypes.shape({
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }),
  skipContentClass: PropTypes.bool
};
