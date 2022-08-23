import React from 'react';

import { openCabinetModal } from '../ConnectToWalletModal/hooks/openCabinetModal';
import { Modal } from 'src/ui';
import { classNames as cn } from 'src/utils';

import './CabinetModal.less';

function CabinetModal({ children, className, onClose }) {
  const containerRef = React.useRef(null);

  openCabinetModal();

  React.useEffect(() => {
    document.body.classList.add('noScroll');

    return () => {
      document.body.classList.remove('noScroll');
    };
  }, []);

  React.useEffect(() => {
    if (!containerRef.current) return;

    document.addEventListener('click', handleOutClick);

    return () => {
      document.removeEventListener('click', handleOutClick);
    };
  }, []);

  const handleOutClick = (e) => {
    e.preventDefault();
    console.log(containerRef.current.contains(e.target));
    if (!containerRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <Modal
      className={cn({ CabinetModal: true, [className]: className })}
      onClose={onClose}
      useOnCloseForAdaptive
    >
      <div className="CabinetModal__container" ref={containerRef}>
        {children}
      </div>
    </Modal>
  );
}

export default CabinetModal;
