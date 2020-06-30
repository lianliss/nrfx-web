import React from "react";
import Promo from "../MainScreen/components/Promo/Promo";
import Welcome from "../MainScreen/components/Welcome/Welcome";
import About from "./components/About/About";
import Roadmap from "./components/Roadmap/Roadmap";
import Lang from "../../../components/Lang/Lang";

export default () => {
  return (
    <div>
      <Promo
        title={<Lang name="landingCompany_promo_title" />}
        description={<Lang name="landingCompany_promo_description" />}
        actionButtonText={<Lang name="landingCompany_promo_actionButton" />}
        image={require("../MainScreen/components/Promo/assets/company.svg")}
      />
      <About />
      <Roadmap />
      <Welcome />
    </div>
  );
};
