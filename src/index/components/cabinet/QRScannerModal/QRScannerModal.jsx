import React from 'react';
import PropTypes from 'prop-types';
import { QrReader } from 'react-qr-reader';
import Modal from 'src/ui/components/Modal/Modal';
import { getLang } from 'src/utils';
import BottomSheetModal from 'src/ui/components/BottomSheetModal/BottomSheetModal';
import LoadingStatus from 'src/index/components/cabinet/LoadingStatus/LoadingStatus';

import './QRScannerModal.less';

function QRScannerModal({ onClose, adaptive, onResult, toastPush, isOpen }) {
  const [streams, setStreams] = React.useState([]);
  const [streamIsReady, setStreamIsReady] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Open Modal.
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    setIsLoading(true);

    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { video: true },
        (mediaStream) => {
          // Set loaded, and add stream to streams.
          setStreams((streams) => [...streams, mediaStream]);
          setStreamIsReady(true);
          setIsLoading(false);
        },
        () => {
          // Set toastPush and close modal.
          toastPush(getLang('qr_scanner_cant_request'), 'warning');
          handleClose();
        }
      );
    } else {
      toastPush(getLang('qr_scanner_cant_request'), 'warning');
      handleClose();
    }
  }, [isOpen]);

  // useMemo for modal close.
  React.useMemo(() => {
    if (isOpen) {
      return;
    }

    // Stop all stream tracks
    streams.forEach((stream) => {
      if (!stream.active) {
        return;
      }

      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });
    });
  }, [streams, isOpen]);

  const handleScan = (response) => {
    if (response) {
      // Give scan value to parent component in callback.
      onResult(response.text);
      handleClose();
    }
  };

  const handleClose = () => {
    // Reset states and close modal.
    setStreamIsReady(false);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  // If stream is not work.
  if (!streamIsReady && !isLoading) {
    return null;
  }

  const ParentComponent = adaptive ? BottomSheetModal : Modal;

  return (
    <ParentComponent onClose={handleClose}>
      <div className="QRScannerModal" style={isLoading ? { padding: 25 } : {}}>
        {isLoading ? (
          <LoadingStatus status="loading" />
        ) : (
          <>
            <h3>{getLang('qr_scanner_modal_title')}</h3>
            <QrReader
              constraints={{ facingMode: 'environment' }}
              className="QRScannerModal__reader"
              scanDelay={400}
              onResult={handleScan}
            />
          </>
        )}
      </div>
    </ParentComponent>
  );
}

QRScannerModal.propTypes = {
  onResult: PropTypes.func,
  onClose: PropTypes.func,
  adaptive: PropTypes.bool,
  isOpen: PropTypes.bool,
};

QRScannerModal.defaultProps = {
  onResult: () => {},
  onClose: () => {},
  adaptive: false,
  isOpen: false,
};

export default QRScannerModal;
