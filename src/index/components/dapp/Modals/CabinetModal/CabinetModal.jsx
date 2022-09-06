import React from 'react';

import { openCabinetModal } from '../ConnectToWalletModal/hooks/openCabinetModal';
import { Modal } from 'src/ui';
import { classNames as cn } from 'src/utils';

import './CabinetModal.less';

function CabinetModal({ children, className, closeOfRef = false, onClose }) {
  const containerRef = React.useRef(null);

  openCabinetModal();

  React.useEffect(() => {
    document.body.classList.add('noScroll');

    return () => {
      document.body.classList.remove('noScroll');
    };
  }, []);

  React.useEffect(() => {
    if (!closeOfRef) return;
    if (!containerRef.current) return;

    document.addEventListener('pointerup', handleOutClick);

    return () => {
      document.removeEventListener('pointerup', handleOutClick);
    };
  }, [containerRef, closeOfRef]);

  const handleOutClick = (e) => {
    e.preventDefault();
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
