import React from "react";
import Welcome from "../MainScreen/components/Welcome/Welcome";
import Promo from "../MainScreen/components/Promo/Promo";
import Swap from "../MainScreen/components/Swap/Swap";
import Exchange from "../MainScreen/components/Exchange/Exchange";
import Advantages from "../MainScreen/components/Advantages/Advantages";
import Application from "../MainScreen/components/Application/Application";
import Steps from "./components/Steps/Steps";
import Lang from "../../../components/Lang/Lang";

export default () => {
  return (
    <div>
      <Promo
        title={<Lang name="landingBitcoin_promo_title" />}
        description={<Lang name="lendingBitcoin_promo_description" />}
        actionButtonText={<Lang name="landingBitcoin_promo_actionButton" />}
        image={require("../MainScreen/components/Promo/assets/bitcoin.svg")}
      />
      <Steps />
      {/*<Swap />*/}
      {/*<Exchange />*/}
      <Advantages
        titleLang="landing_advantages_title"
        items={[
          {
            icon: require("../MainScreen/components/Advantages/assets/fast.svg"),
            titleLang: "landing_advantages_performance_title",
            textLang: "landing_advantages_performance_description"
          },
          {
            icon: require("../MainScreen/components/Advantages/assets/wallet.svg"),
            titleLang: "landing_advantages_multiCurrency_title",
            textLang: "landing_advantages_multiCurrency_description"
          },
          {
            icon: require("../MainScreen/components/Advantages/assets/liquidity.svg"),
            titleLang: "landing_advantages_liquidity_title",
            textLang: "landing_advantages_liquidity_description"
          },
          {
            icon: require("../MainScreen/components/Advantages/assets/fee.svg"),
            titleLang: "landing_advantages_fee_title",
            textLang: "landing_advantages_fee_description"
          },
          {
            icon: require("../MainScreen/components/Advantages/assets/ui.svg"),
            titleLang: "landing_advantages_ui_title",
            textLang: "landing_advantages_ui_description"
          },
          {
            icon: require("../MainScreen/components/Advantages/assets/support.svg"),
            titleLang: "landing_advantages_support_title",
            textLang: "landing_advantages_support_description"
          }
        ]}
      />
      <Application accent />
      <Advantages
        type="alternative"
        titleLang="landingBitcoin_use_title"
        items={[
          {
            icon: require("../MainScreen/components/Advantages/assets/keep.svg"),
            titleLang: "landingBitcoin_use_keepId_title",
            textLang: "landingBitcoin_use_keepId_description"
          },
          {
            icon: require("../MainScreen/components/Advantages/assets/liquidity.svg"),
            titleLang: "landingBitcoin_use_SellIt_title",
            textLang: "landingBitcoin_use_SellIt_description"
          },
          {
            icon: require("../MainScreen/components/Advantages/assets/exchange.svg"),
            titleLang: "landingBitcoin_use_exchangeIt_title",
            textLang: "landingBitcoin_use_exchangeIt_description"
          },
          {
            icon: require("../MainScreen/components/Advantages/assets/pay.svg"),
            titleLang: "landingBitcoin_use_payWithIt_title",
            textLang: "landingBitcoin_use_payWithIt_description"
          },
          {
            icon: require("../MainScreen/components/Advantages/assets/send.svg"),
            titleLang: "landingBitcoin_use_SendIt_title",
            textLang: "landingBitcoin_use_SendIt_description"
          },
          {
            icon: require("../MainScreen/components/Advantages/assets/donate.svg"),
            titleLang: "landingBitcoin_use_donateIt_title",
            textLang: "landingBitcoin_use_donateIt_description"
          }
        ]}
      />
      <Welcome
        titleLang="landingBitcoin_callToAction_title"
        actionButtonLang="landingBitcoin_callToAction_button"
      />
    </div>
  );
};
