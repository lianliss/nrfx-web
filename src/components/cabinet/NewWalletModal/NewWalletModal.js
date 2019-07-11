import './NewWalletModal.less';

import React, { useState } from 'react';

import Modal from '../../../ui/components/Modal/Modal';
import Currency from './components/Currency';


function NewWalletModal({ children }) {
  const [isOpen, toggleOpen] = useState(false);

  return (
    <div className="NewWalletModal">
      <span onClick={() => toggleOpen(!isOpen)}>
        {children}
      </span>

      <Modal noSpacing isOpen={isOpen} onClose={() => toggleOpen(false)}>
        <div className="NewWalletModal__content">
          <h2 className="NewWalletModal__title">Create New Wallet</h2>

          <div className="NewWalletModal__currencies">

            <Currency />
            <Currency />
            <Currency />

          </div>
        </div>
      </Modal>
    </div>
  )
}

export default NewWalletModal;