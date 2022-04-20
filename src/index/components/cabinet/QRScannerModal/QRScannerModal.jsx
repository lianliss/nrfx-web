import React from 'react';
import PropTypes from 'prop-types';
import { QrReader } from 'react-qr-reader';
import Modal from 'src/ui/components/Modal/Modal';
import BottomSheetModal from 'src/ui/components/BottomSheetModal/BottomSheetModal';

import './QRScannerModal.less';

function QRScannerModal({ onClose, adaptive, onResult, toastPush }) {
  const handleScan = (response) => {
    if (response) {
      // Give scan value to parent component in callback.
      onResult(response.text);
      onClose();
    }
  };

  const ParentComponent = adaptive ? BottomSheetModal : Modal;

  return (
    <ParentComponent onClose={onClose}>
      <div className="QRScannerModal">
        <h3>Scan your code</h3>
        <QrReader
          constraints={{ facingMode: 'environment' }}
          className="QRScannerModal__reader"
          scanDelay={400}
          onResult={handleScan}
        />
      </div>
    </ParentComponent>
  );
}

QRScannerModal.propTypes = {
  onResult: PropTypes.func,
  onClose: PropTypes.func,
  adaptive: PropTypes.bool,
};

QRScannerModal.defaultProps = {
  onResult: () => {},
  onClose: () => {},
  adaptive: false,
};

export default QRScannerModal;
