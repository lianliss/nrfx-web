import React from 'react';
import { useSelector } from 'react-redux';

// Components
import SwapSettings from 'dapp/SwapSettings/SwapSettings';
import { Modal, BottomSheetModal } from 'ui';

// Utils
import { openCabinetModal } from 'dapp/Modals/ConnectToWalletModal/hooks/openCabinetModal';

// Styles
import './DexSettingsModal.less';

function DexSettingsModal({
  setSlippage,
  slippageTolerance,
  setDeadline,
  deadline,
  ...props
}) {
  const adaptive = useSelector((store) => store.default.adaptive);
  const Wrapper = adaptive ? BottomSheetModal : Modal;
  const settingsProps = {
    setSlippage,
    slippageTolerance,
    slippageNumbers: [0.5, 1, 2],
    setDeadline,
    deadline,
    showTitle: true,
    onClose: props.onClose,
  };

  openCabinetModal();

  return (
    <Wrapper
      className="SwapSettings__wrap"
      skipClose
      prefix="SwapSettings"
      {...props}
    >
      <SwapSettings {...settingsProps} />
    </Wrapper>
  );
}

export default DexSettingsModal;
