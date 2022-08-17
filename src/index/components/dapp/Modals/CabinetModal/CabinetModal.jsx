import React from 'react';

import { openCabinetModal } from '../ConnectToWalletModal/hooks/openCabinetModal';
import { Modal } from 'src/ui';

import './CabinetModal.less';

function CabinetModal({ children, onClose }) {
  openCabinetModal();

  React.useEffect(() => {
    document.body.classList.add('noScroll');

    return () => {
      document.body.classList.remove('noScroll');
    };
  }, []);

  return (
    <Modal className="CabinetModal" onClose={onClose}>
      {children}
    </Modal>
  );
}

export default CabinetModal;
