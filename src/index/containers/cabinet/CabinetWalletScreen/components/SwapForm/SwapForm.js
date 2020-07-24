import "./SwapForm.less";
import React from "react";
import { useSelector } from "react-redux";
import { ContentBox, Dropdown, CircleIcon } from "../../../../../../ui";
import Lang from "../../../../../../components/Lang/Lang";
import { currencySelector } from "../../../../../../selectors";
import { currencyPresenter } from "../../../../../../actions";

export default () => {
  const currency = useSelector(currencySelector("btc"));

  return (
    <ContentBox className="SwapForm">
      <div className="SwapForm__form">
        <div className="SwapForm__form__label">
          <Lang name="cabinet_fiatWalletGive" />
        </div>
        <Dropdown
          value="1"
          options={[
            {
              prefix: (
                <CircleIcon
                  size="ultra_small"
                  shadow={false}
                  currency={currencyPresenter(currency)}
                />
              ),
              value: "1",
              title: "1"
            }
          ]}
        />
      </div>
      <div className="SwapForm__form"></div>
    </ContentBox>
  );
};
