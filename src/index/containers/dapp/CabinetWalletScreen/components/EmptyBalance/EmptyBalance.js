import "./EmptyBalance.less";

import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "react-router5";
import {
  Button,
  ButtonWrapper,
  CircleIcon,
  ContentBox
} from "../../../../../../ui";
import { getCurrencyInfo, openModal } from "../../../../../../actions";
import Lang from "../../../../../../components/Lang/Lang";
import * as utils from "src/utils/index";
import * as pages from "../../../../../constants/pages";
import {
  walletSwapSetCurrency,
  walletSwapSwitch
} from "../../../../../../actions/cabinet/wallet";
import { walletSwapSelector } from "../../../../../../selectors";
import SVG from "utils/svg-wrap";
import _ from 'lodash';
import currencies from 'src/currencies';

export default ({ currency }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currencyInfo = currency ? getCurrencyInfo(currency) : null;
  const abbr = _.get(currencyInfo, 'abbr', '').toUpperCase();
  const isFiat = utils.isFiat(currency);
  const canExchange = _.get(currencies[currency], 'can_exchange');

  const walletSwap = useSelector(walletSwapSelector);

  const handleSwap = useCallback(() => {
    if (utils.isFiat(walletSwap.toCurrency)) {
      dispatch(walletSwapSwitch());
    }
    dispatch(walletSwapSetCurrency("to", currency));
    router.navigate(pages.DAPP_EXCHANGE);
  }, [walletSwap.toCurrency, dispatch, router, currency]);

  if (!currency) {
    return (
      <ContentBox className="WalletEmptyBalance">
        <div className="WalletEmptyBalance__content">
          <div className="WalletEmptyBalance__icon">
            <SVG src={require("src/asset/illustrations/savings.svg")} />
          </div>
          <h2>
            <Lang name="cabinet__EmptyBalanceCommonTitle" />
          </h2>
          <p>
            <Lang name="cabinet__EmptyBalanceCommonText" />
          </p>
          <Button
            onClick={() => {
              router.navigate(pages.DAPP_EXCHANGE);
            }}
          >
            <Lang name="global_buy" />
          </Button>
        </div>
      </ContentBox>
    );
  }

  return (
    <ContentBox className="WalletEmptyBalance">
      <div className="WalletEmptyBalance__content">
        <CircleIcon currency={currencyInfo} />
        <h2>
          {canExchange ? <Lang
            name="cabinet__EmptyBalanceTitle"
            params={{
              currency: abbr
            }}
          /> : 'Coming soon'}
        </h2>
        {currency !== "nrfx" && canExchange && (
          <p>
            <Lang
              name={
                isFiat
                  ? "cabinet__EmptyFiatBalanceText"
                  : "cabinet__EmptyBalanceText"
              }
              params={{
                currency: abbr
              }}
            />
          </p>
        )}
        {canExchange && <ButtonWrapper align="center">
          <Button
            onClick={() => {
              openModal("merchant");
            }}
          >
            <Lang name="cabinet_fiatBalance_add" />
          </Button>
        </ButtonWrapper>}
      </div>
    </ContentBox>
  );
};
