import React from 'react';
import { useSelector } from 'react-redux';

// Components
import { Modal, BottomSheetModal } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './TransactionModal.less';

function TransactionModal({ children, ...props }) {
  const adaptive = useSelector((store) => store.default.adaptive);
  const Component = adaptive ? BottomSheetModal : Modal;

  return (
    <Component {...props} className="TransactionModal" skipClose>
      <div className="TransactionModal__header">
        <h5>Transaction submitted</h5>
        <SVG
          src={require('src/asset/icons/close.svg')}
          onClick={props.onClose}
        />
      </div>
      <div className="TransactionModal__body">{children}</div>
    </Component>
  );
}

export default TransactionModal;
