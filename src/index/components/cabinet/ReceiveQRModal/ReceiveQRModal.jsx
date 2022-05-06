import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QRCode from 'react-qr-code';
import { getLang } from 'src/utils';

import { Modal, CopyText } from 'src/ui';
import SVG from 'utils/svg-wrap';
import maximizeIcon from 'src/ui/components/CopyText/assets/maximize.svg';
import './ReceiveQRModal.less';
import { web3WalletsSelector } from 'src/selectors';
import BottomSheetModal from 'src/ui/components/BottomSheetModal/BottomSheetModal';

function ReceiveQRModal({ web3Wallets, onClose, adaptive }) {
  const wallet = web3Wallets[0];
  const { address } = wallet;

  const ParentComponent = adaptive ? BottomSheetModal : Modal;

  return (
    <ParentComponent onClose={onClose}>
      <div className="ReceiveQRModal">
        <h3 className="ReceiveQRModal__title">
          {getLang('receive_qr_global')}
        </h3>
        <QRCode value={address} size={250} />
        <p className="ReceiveQRModal__subtitle">
          {getLang('receive_qr_modal_subtitle')}
        </p>
        <div className="ReceiveQRModal__CopyText-container">
          <CopyText text={address} className="ReceiveQRModal__CopyText" />
          <SVG src={maximizeIcon} />
        </div>
      </div>
    </ParentComponent>
  );
}

ReceiveQRModal.propTypes = {
  web3Wallets: PropTypes.array,
  onClose: PropTypes.func,
  adaptive: PropTypes.bool,
};

ReceiveQRModal.defaultProps = {
  web3Wallets: [],
  onClose: () => {},
  adaptive: false,
};

export default connect((state) => ({
  web3Wallets: web3WalletsSelector(state),
}))(ReceiveQRModal);
