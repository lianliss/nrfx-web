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

export default ({ currency }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currencyInfo = getCurrencyInfo(currency);
  const abbr = currencyInfo.abbr.toUpperCase();
  const isFiat = utils.isFiat(currency);
  const canExchange = currencyInfo.can_exchange;

  const walletSwap = useSelector(walletSwapSelector);

  const handleSwap = useCallback(() => {
    if (utils.isFiat(walletSwap.toCurrency)) {
      dispatch(walletSwapSwitch());
    }
    dispatch(walletSwapSetCurrency("to", currency));
    router.navigate(pages.WALLET_SWAP);
  }, [walletSwap.toCurrency, dispatch, router, currency]);

  return (
    <ContentBox className="WalletEmptyBalance">
      <div className="WalletEmptyBalance__content">
        <CircleIcon currency={currencyInfo} />
        <h2>
          <Lang
            name="cabinet__EmptyBalanceTitle"
            params={{
              currency: abbr
            }}
          />
        </h2>
        <p>
          <Lang
            name="cabinet__EmptyBalanceText"
            params={{
              currency: abbr
            }}
          />
        </p>
        {isFiat ? (
          <ButtonWrapper align="center">
            <Button
              onClick={() => {
                openModal("merchant");
              }}
            >
              <Lang name="cabinet_fiatBalance_add" />
            </Button>
          </ButtonWrapper>
        ) : (
          <ButtonWrapper align="center">
            {canExchange && (
              <Button onClick={handleSwap}>
                <Lang name="global_buy" />
              </Button>
            )}
            {currency === "nrfx" ? (
              <Button
                onClick={() => {
                  openModal("nrfx_presale");
                }}
              >
                <Lang name="global_buy" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  openModal("receive");
                }}
                type={canExchange ? "secondary" : "default"}
              >
                <Lang name="global_receive" />
              </Button>
            )}
          </ButtonWrapper>
        )}
      </div>
    </ContentBox>
  );
};
