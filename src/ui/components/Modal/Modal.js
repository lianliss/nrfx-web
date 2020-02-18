/* eslint-disable */
// styles
import './Modal.less';
// external
import React, { useEffect, useRef }  from 'react';
import PropTypes from 'prop-types';
// internal
import {classNames} from '../../utils';
import SVG from 'react-inlinesvg';

function Modal(props) {
  const node = useRef();
  const adaptive = document.body.classList.contains('adaptive');

  const className = classNames(props.className, {
    Modal: true,
    Modal__noSpacing: props.noSpacing,
    Modal__grayBackground: props.grayBackground,
  });

  const handlePressEsc = e => {
    if(e.keyCode === 27) {
      props.onClose && props.onClose(e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handlePressEsc, false);

    return () => {
      document.removeEventListener("keydown", handlePressEsc, false);
    };
  }, []);


  if (props.isOpen) {
    return (
      <div className={className}>
        <div className="Modal__back" onClick={props.onClose} />
        <div className="Modal__box" onClick={e => e.stopPropagation()} ref={node} style={{ width: props.width }}>
          {!props.skipClose && <div className="Modal__box__close" onClick={props.onClose}>
            <SVG src={adaptive ? require('src/asset/cabinet/angle_left.svg') : require('src/asset/site/close.svg')} />
          </div>}
          {props.children}
        </div>
      </div>
    );
  }

  return null;
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  noSpacing: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.number,
  skipClose: PropTypes.bool,
  grayBackground: PropTypes.bool,
};

export function ModalHeader({ children }) {
  return (
    <div className="Modal__header">
      {children}
    </div>
  )
}

export default React.memo(Modal);
