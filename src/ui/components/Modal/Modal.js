/* eslint-disable */

import './Modal.less';

import React, { useEffect, useRef }  from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../utils';


function Modal(props) {
  const node = useRef();
  const className = classNames({
    Modal: true,
    Modal_open: props.isOpen,
  });

  const handleClick = e => {
    if (node.current && node.current.contains(e.target)) {
      return;
    } else {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);


  if (props.isOpen) {
    return (
      <div className={className}>
        <div className="Modal__box" ref={node}>
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
  
  return null;

}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default React.memo(Modal);
