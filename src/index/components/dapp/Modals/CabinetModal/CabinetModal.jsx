import React from 'react';

import { openCabinetModal } from '../ConnectToWalletModal/hooks/openCabinetModal';
import { Modal } from 'src/ui';
import { classNames as cn } from 'src/utils';

import './CabinetModal.less';
import Close from '../components/Close/Close';

function CabinetModal({
  children,
  className,
  closeOfRef = false,
  onClose,
  closeButton,
  closeButtonTop,
  closeButtonRight,
}) {
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
    if (!containerRef.current.contains(e.target)) {
      e.preventDefault();
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
        {closeButton && (
          <Close
            top={closeButtonTop}
            right={closeButtonRight}
            onClose={onClose}
          />
        )}
      </div>
    </Modal>
  );
}

export default CabinetModal;
