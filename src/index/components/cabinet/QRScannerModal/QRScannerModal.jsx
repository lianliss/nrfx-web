import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { QrReader } from 'react-qr-reader';
import Modal from 'src/ui/components/Modal/Modal';
import BottomSheetModal from 'src/ui/components/BottomSheetModal/BottomSheetModal';

import './QRScannerModal.less';

function QRScannerModal({ onClose, adaptive, onResult, toastPush }) {
  const [value, setValue] = React.useState('');
  const [isDone, setIsDone] = React.useState(false);

  const resultHandler = (result) => {
    if (value === result) {
      return;
    }

    setValue(result);
    if (result.text.length > 10) {
      onResult(result);
      setIsDone(true);
      onClose();
    }
  };

  return (
    <>
      {adaptive ? (
        <BottomSheetModal onClose={onClose}>
          <div className="QRScannerModal">
            <h3>Scan your code</h3>
            {!isDone && (
              <QrReader
                constraints={{facingMode: "environment"}}
                className="QRScannerModal__reader"
                scanDelay={400}
                onResult={(result) => resultHandler(result || '')}
              />
            )}
          </div>
        </BottomSheetModal>
      ) : (
        <Modal onClose={onClose}>
          <div className="QRScannerModal">
            <h3>Scan your code</h3>
            {!isDone && (
              <QrReader
                className="QRScannerModal__reader"
                scanDelay={400}
                onResult={(result) => resultHandler(result || '')}
              />
            )}
          </div>
        </Modal>
      )}
    </>
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
