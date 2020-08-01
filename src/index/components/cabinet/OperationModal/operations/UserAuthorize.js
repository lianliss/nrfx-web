import React from "react";
import { List } from "src/ui";
import Lang from "src/components/Lang/Lang";
import Footer from "../components/Footer/Footer";
import { getLang } from "../../../../../utils";

export default ({ operation: { data }, operation }) => {
  return (
    <div>
      <List
        items={[
          {
            label: <Lang name="global_device" />,
            value: data.is_mobile_application
              ? [
                  getLang("global_applicationFor", true),
                  data.platform_name
                ].join(" ")
              : [data.browser_name, data.browser_version].join(" ")
          },
          {
            label: <Lang name="global_ipAddress" />,
            value: data.ip_address
          }
        ]}
      />
      <Footer date={operation.created_at} />
    </div>
  );
};
