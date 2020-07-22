import "./WalletHeader.less";

import React from "react";
import { useSelector } from "react-redux";
import { Button, ContentBox, NumberFormat } from "../../../../../../ui";
import Lang from "../../../../../../components/Lang/Lang";
import { currencySelector } from "../../../../../../selectors";

export default ({ balance }) => {
  const currency = useSelector(currencySelector(balance?.currency));

  return (
    <ContentBox className="WalletHeader">
      <div className="WalletHeader__content">
        <div className="WalletHeader__label">
          <span className="WalletHeader__label__currency">{currency.name}</span>
          <span className="WalletHeader__label__usd">
            <NumberFormat
              roughly
              number={balance.to_usd}
              currency={balance.currency}
            />
          </span>
        </div>
        <div className="WalletHeader__amount">
          <NumberFormat number={balance.amount} currency={balance.currency} />
        </div>
      </div>
      <div className="WalletHeader__buttons">
        <Button size="middle">
          <Lang name="cabinet_walletTransactionModal_receive" />
        </Button>
        <Button size="middle" type="secondary">
          <Lang name="cabinet_walletTransactionModal_send" />
        </Button>
      </div>
    </ContentBox>
  );
};
