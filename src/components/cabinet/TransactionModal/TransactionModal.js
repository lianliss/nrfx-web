import './TransactionModal.less';

import React from 'react';

import Modal from '../../../ui/components/Modal/Modal';
import TransactionTable from './components/TransactionTable';


function TransactionModal({ children, isOpen, onChange }) {
  const data = [
    {
      key: 'From',
      value: 'L0748c746172be088d663d8dae715f46fc2c1d14a',
    },
    {
      key: 'To',
      value: 'My Litecoin',
    },
    {
      key: 'Amount',
      value: '700.00 LTC',
    },
  ];

  return (
    <div className="TransactionModal">
      <Modal noSpacing isOpen={isOpen} onClose={() => onChange(false)}>
        <div className="TransactionModal__content">
          <h2 className="TransactionModal__title">Received Litecoin</h2>

          <TransactionTable data={data} />

          <div>
            Total
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TransactionModal;