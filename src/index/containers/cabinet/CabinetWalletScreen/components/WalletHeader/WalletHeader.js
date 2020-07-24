import "./WalletHeader.less";

import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { Button, ContentBox, NumberFormat } from "../../../../../../ui";
import Lang from "../../../../../../components/Lang/Lang";
import { currencySelector } from "../../../../../../selectors";
import * as actions from "../../../../../../actions";

export default ({ balance, isCrypto }) => {
  const currency = useSelector(currencySelector(balance?.currency));

  const handleSend = useCallback(() => {
    actions.openModal("send");
  });

  const handleReceive = useCallback(() => {
    actions.openModal("receive");
  });

  const handleRefill = useCallback(() => {
    actions.openModal("merchant");
  });

  const nrfxPresale = useCallback(() => {
    actions.openModal("nrfx_presale");
  });

  const handleWithdrawal = useCallback(() => {
    actions.openModal("merchant", {}, { type: "withdrawal" });
  });

  const renderButtons = () => {
    if (currency.abbr === "nrfx") {
      return (
        <Button onClick={nrfxPresale} size="middle">
          <Lang name="global_buy" />
        </Button>
      );
    } else if (isCrypto) {
      return (
        <>
          <Button onClick={handleReceive} size="middle">
            <Lang name="cabinet_walletTransactionModal_receive" />
          </Button>
          <Button onClick={handleSend} size="middle" type="secondary">
            <Lang name="cabinet_walletTransactionModal_send" />
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={handleRefill} size="middle">
            <Lang name="cabinet_fiatBalance_add" />
          </Button>
          <Button onClick={handleWithdrawal} size="middle" type="secondary">
            <Lang name="global_withdrawal" />
          </Button>
        </>
      );
    }
  };

  return (
    <ContentBox className="WalletHeader">
      <div className="WalletHeader__content">
        <div className="WalletHeader__label">
          <span className="WalletHeader__label__currency">{currency.name}</span>
          <span className="WalletHeader__label__usd">
            <NumberFormat roughly number={balance.to_usd} currency="usd" />
          </span>
        </div>
        <div className="WalletHeader__amount">
          <NumberFormat number={balance.amount} currency={balance.currency} />
        </div>
      </div>
      <div className="WalletHeader__buttons">{renderButtons()}</div>
    </ContentBox>
  );
};
