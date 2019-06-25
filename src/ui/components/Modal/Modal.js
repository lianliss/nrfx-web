import './Modal.less';

import React  from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils';


function Modal(props) {
  const className = classNames({
    Modal: true,
    Modal_open: props.isOpen,
  });

  return (
    <div className={className}>
      <div className="Modal__box">
        <img 
          alt="close"
          className="Modal__box__close"
          src={require('../../../asset/site/close.svg')}
          onClick={props.onClose}
        />
        {props.children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default React.memo(Modal);
