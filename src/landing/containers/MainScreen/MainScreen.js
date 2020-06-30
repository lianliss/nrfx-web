import React from "react";
import Welcome from "./components/Welcome/Welcome";
import Promo from "./components/Promo/Promo";
import Swap from "./components/Swap/Swap";
import Exchange from "./components/Exchange/Exchange";
import Advantages from "./components/Advantages/Advantages";
import Application from "./components/Application/Application";
import Lang from "../../../components/Lang/Lang";

export default () => {
  return (
    <div>
      <Promo
        title={<Lang name="landing_promo_title" />}
        description={<Lang name="landing_promo_description" />}
        actionButtonText={<Lang name="landing_promo_actionButton" />}
        image={require("./components/Promo/assets/promo.svg")}
        label={<Lang name="landing_promo_nrfx_label" />}
        labelDescription={<Lang name="landing_promo_nrfx_description" />}
        labelLink={<Lang name="global_buy" />}
      />
      <Swap />
      <Exchange />
      <Advantages
        accent
        titleLang="landing_advantages_title"
        items={[
          {
            icon: require("./components/Advantages/assets/fast.svg"),
            titleLang: "landing_advantages_performance_title",
            textLang: "landing_advantages_performance_description"
          },
          {
            icon: require("./components/Advantages/assets/wallet.svg"),
            titleLang: "landing_advantages_multiCurrency_title",
            textLang: "landing_advantages_multiCurrency_description"
          },
          {
            icon: require("./components/Advantages/assets/liquidity.svg"),
            titleLang: "landing_advantages_liquidity_title",
            textLang: "landing_advantages_liquidity_description"
          },
          {
            icon: require("./components/Advantages/assets/fee.svg"),
            titleLang: "landing_advantages_fee_title",
            textLang: "landing_advantages_fee_description"
          },
          {
            icon: require("./components/Advantages/assets/ui.svg"),
            titleLang: "landing_advantages_ui_title",
            textLang: "landing_advantages_ui_description"
          },
          {
            icon: require("./components/Advantages/assets/support.svg"),
            titleLang: "landing_advantages_support_title",
            textLang: "landing_advantages_support_description"
          }
        ]}
      />
      <Application />
      <Welcome />
    </div>
  );
};
