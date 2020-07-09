import "./FiatOperationModal.less";

import React from "react";

import Modal from "../../../../ui/components/Modal/Modal";
import * as UI from "../../../../ui";
import * as utils from "src/utils/index";
import RefillOperation from "./operations/refill";
import WithdrawalOperation from "./operations/withdrawal";
import SwapOperation from "./operations/swap";
import BankCardRefillRejectOperation from "./operations/bankCardRefillReject";

function FiatOperationModal(props) {
  const { operation } = props;

  if (!operation) {
    props.onClose();
    return null;
  }

  const renderContent = operation => {
    if (operation.type === "refill") {
      return <RefillOperation operation={operation} />;
    } else if (operation.type === "withdrawal") {
      return <WithdrawalOperation operation={operation} />;
    } else if (operation.type === "bank_card_refill_reject") {
      return <BankCardRefillRejectOperation operation={operation} />;
    } else {
      return <SwapOperation operation={operation} />;
    }
  };

  return (
    <Modal className="FiatOperationModal" isOpen={true} onClose={props.onClose}>
      <UI.ModalHeader>
        {utils.getLang("cabinet__historyItemTitle_" + operation.type)}
      </UI.ModalHeader>
      {renderContent(operation)}
    </Modal>
  );
}

export default FiatOperationModal;
