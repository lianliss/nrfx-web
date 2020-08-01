import React from "react";
import { List, NumberFormat, WalletAddress, WalletCard } from "src/ui";
import Lang from "src/components/Lang/Lang";
import Footer from "../components/Footer/Footer";
import { getCurrencyInfo } from "../../../../../actions";
import Wallet from "../../../../containers/cabinet/CabinetWalletScreen/components/Wallet/Wallet";

export default ({ operation }) => {
  return (
    <div>
      <WalletCard
        title={<Lang name="global_amount" />}
        balance={operation.amount}
        currency={operation.currency}
        status={operation.status}
      />
      <List
        items={[
          {
            label: <Lang name="global_fee" />,
            value: <NumberFormat number={0} currency={operation.currency} />
          },
          {
            label: <Lang name="global_from" />,
            value: <WalletAddress isUser address={operation.address} />
          },
          {
            label: <Lang name="global_to" />,
            value: (
              <Lang
                name="cabinet_operationModal_myWallet"
                params={{
                  currency: operation.currency.toUpperCase()
                }}
              />
            )
          }
        ].filter(Boolean)}
      />
      <Footer status={operation.status} date={operation.created_at} />
    </div>
  );
};
