/* eslint-disable */
// styles
import './Modal.less';
// external
import React, { useEffect, useRef }  from 'react';
import PropTypes from 'prop-types';
// internal
import {classNames} from '../../utils';

function Modal(props) {
  const node = useRef();
  const adaptive = document.body.classList.contains('adaptive');

  const className = classNames(props.className, {
    Modal: true,
    Modal__noSpacing: props.noSpacing,
  });

  const handleClick = e => {
    if (node.current && node.current.contains(e.target)) {
      return () => {};
    } else {
      !adaptive && props.onClose();
    }
  };

  const handlePressEsc = e => {
    if(e.keyCode === 27) {
      props.onClose && props.onClose();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handlePressEsc, false);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handlePressEsc, false);
    };
  }, []);


  if (props.isOpen) {
    return (
      <div className={className}>
        <div className="Modal__box" ref={node} style={{ width: props.width }}>
          <div className="Modal__box__close" onClick={props.onClose} />
          {props.children}
        </div>
      </div>
    );
  } 
  
  return null;
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.number
};

export function ModalHeader({ children }) {
  return (
    <div className="Modal__header">
      {children}
    </div>
  )
}

export default React.memo(Modal);
