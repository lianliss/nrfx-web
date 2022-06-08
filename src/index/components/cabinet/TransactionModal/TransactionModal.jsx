import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// Components
import { Modal, BottomSheetModal } from 'src/ui';
import SVG from 'utils/svg-wrap';

// Styles
import './TransactionModal.less';

function TransactionModal({ children, title, className, ...props }) {
  const adaptive = useSelector((store) => store.default.adaptive);
  const Component = adaptive ? BottomSheetModal : Modal;

  return (
    <Component
      {...props}
      className={`TransactionModal ${className}`}
      prefix="TransactionModal"
      skipClose
    >
      <div className="TransactionModal__header">
        <h5>{title}</h5>
        <SVG
          src={require('src/asset/icons/close-popup.svg')}
          onClick={props.onClose}
        />
      </div>
      <div className="TransactionModal__body">{children}</div>
    </Component>
  );
}

TransactionModal.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

TransactionModal.defaultProps = {
  title: '',
  className: '',
};

export default TransactionModal;
