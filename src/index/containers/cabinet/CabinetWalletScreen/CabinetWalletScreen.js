import "./CabinetWalletScreen.less";

import React, { memo, useEffect, useCallback } from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { useRoute, withRouter } from "react-router5";
import { useDispatch, useSelector } from "react-redux";
import { getAnalytics, logEvent } from "firebase/analytics";

import PageContainer from "../../../components/cabinet/PageContainer/PageContainer";
import * as PAGES from "src/index/constants/pages";
import WalletList from "./components/WalletList/WalletList";
import WalletHeader from "./components/WalletHeader/WalletHeader";
import History from "./components/History/History";

import {
  fetchWalletPage,
  walletFetchHistory,
  walletFetchHistoryMore,
  walletUpdate,
  walletSetStatus,
} from "actions/cabinet/wallet";

import {
  walletBalanceSelector,
  walletCardReservationSelector,
  walletHistorySelector,
  walletStatusSelector,
  web3StatusSelector,
  web3BalancesSelector,
} from "src/selectors";

import {
  web3SetStatus,
  web3SetData,
} from "actions/cabinet/web3";

import LoadingStatus from "../../../components/cabinet/LoadingStatus/LoadingStatus";
import Paging from "../../../components/cabinet/Paging/Paging";
import CommonHeader from "./components/CommonHeader/CommonHeader";
import SwapForm from "./components/SwapForm/SwapForm";
import RefillBlock from "./components/RefillBlock/RefillBlock";
import SwapTutorial from "./components/SwapTutorial/SwapTutorial";
import EmptyBalance from "./components/EmptyBalance/EmptyBalance";
import Web3Wallets from "./components/Web3Wallets/Web3Wallets";
import CryptoWallet from './components/CryptoWallet/CryptoWallet';

import { ContentBox } from "ui";
import SwapFormAdaptive from "./components/SwapFormAdaptive/SwapFormAdaptive";
import { setTitle } from "actions";
import { getLang } from "utils";

import web3Backend from "services/web3-backend";

const buildOptions = (balanceId, isCrypto, isSwap) => {
  return isSwap
    ? { operations: "swap" }
    : balanceId && {
    [isCrypto ? "wallet_id" : "balance_id"]: balanceId
  };
};

const old = memo(() => {
  const {
    route: { name, params }
  } = useRoute();

  const adaptive = useAdaptive();

  const isCommon = name === PAGES.WALLET;
  const isCrypto = name === PAGES.WALLET_CRYPTO;
  const isSwap = name === PAGES.WALLET_SWAP;

  const dispatch = useDispatch();
  const status = useSelector(walletStatusSelector);
  const web3Status = useSelector(web3StatusSelector);
  const web3Balances = useSelector(web3BalancesSelector);
  const history = useSelector(walletHistorySelector);
  const cardReservation = useSelector(walletCardReservationSelector);
  const balance = useSelector(walletBalanceSelector(params.currency));
  const balanceId = !isSwap && !!balance && balance.id;

  useEffect(() => {
    dispatch(fetchWalletPage());
  }, [dispatch]);

  useEffect(() => {
    window.scroll(0, 0);

    if (isSwap) {
      logEvent(getAnalytics(), "open_swap_page");
    }
  }, [isSwap]);

  useEffect(() => {
    setTitle(getLang("cabinet_header_wallet", true));
    dispatch(walletFetchHistory(buildOptions(balanceId, isCrypto, isSwap)));
  }, [balanceId, isCrypto, isSwap, dispatch]);

  if (!web3Status.isRequested) {
    // Request for wallets
    dispatch(web3SetStatus('isRequested', true));
    web3Backend.getWallets().then(wallets => {
      dispatch(web3SetData({wallets}));
      dispatch(web3SetStatus('isWalletsLoaded', true));

      // Request for balances
      Promise.allSettled(
        wallets.map(wallet => web3Backend.getBalances(wallet.address))
      ).then(data => {
        const balances = [];
        data.map((balance, index) => {
          const address = wallets[index].address;
          if (balance.status !== 'fulfilled') {
            return;
          }
          balances.push({address, items: balance.value});
        });
        dispatch(web3SetData({balances}));
        dispatch(web3SetStatus('isBalancesLoaded', true));
      });
    }).catch(error => {
      console.error('[CabinetWalletScreen] getWallets', error);
      dispatch(web3SetStatus('isRequested', false));
    });
  }

  const handleLoadMore = useCallback(() => {
    dispatch(walletFetchHistoryMore(buildOptions(balanceId, isCrypto, isSwap)));
  }, [balanceId, isCrypto, isSwap, dispatch]);

  if (status.main) {
    return <LoadingStatus status={status.main} />;
  }

  return (
    <PageContainer
      className="CabinetWalletScreen"
      sideBar={
        !adaptive && <WalletList currency={balanceId && params.currency} />
      }
    >
      {isCommon && <Web3Wallets />}
      {isCommon && <CommonHeader />}
      {isSwap &&
      (adaptive ? (
        <SwapFormAdaptive />
      ) : (
        <>
        <SwapForm />
        <SwapTutorial />
        </>
      ))}

      {balance &&
      !isSwap &&
      (balance.amount ? (
        <WalletHeader isCrypto={isCrypto} balance={balance} />
      ) : (
        <EmptyBalance currency={params.currency} />
      ))}

      {adaptive && !balance && !isSwap && (
        <ContentBox className="CabinetWalletScreen__adaptiveWalletList">
          <WalletList currency={params.currency} />
        </ContentBox>
      )}

      {cardReservation && <RefillBlock />}

      <Paging
        isCanMore={!!history.next && status.historyMore !== "loading"}
        onMore={handleLoadMore}
        moreButton={!!history.next && !status.history}
        isLoading={status.historyMore === "loading"}
      >
        <History />
      </Paging>
    </PageContainer>
  );
});

class CabinetWalletScreen extends React.PureComponent {

  componentDidMount() {
    // Set current title
    setTitle(getLang("cabinet_header_wallet", true));
    
    this._mounted = true;
    const {
      web3SetStatus,
      web3SetData,
      web3Status,
      fetchWalletPage,
  } = this.props;

    if (!web3Status.isRequested && !web3Status.isWalletsLoaded && !web3Status.isBalancesLoaded) {
      fetchWalletPage();
      // Request for wallets
      web3SetStatus('isRequested', true);
      web3Backend.getWallets().then(wallets => {
        web3SetData({wallets});
        web3SetStatus('isWalletsLoaded', true);

        // Request for balances
        Promise.allSettled(
          wallets.map(wallet => web3Backend.getBalances(wallet.address))
        ).then(data => {
          const balances = [];
          data.map((balance, index) => {
            const address = wallets[index].address;
            if (balance.status !== 'fulfilled') {
              return;
            }
            balances.push({address, items: balance.value});
          });
          web3SetData({balances});
          web3SetStatus('isBalancesLoaded', true);
        });
      }).catch(error => {
        console.error('[CabinetWalletScreen] getWallets', error);
        web3SetStatus('isRequested', false);
      });
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  isChanged = (prevProps, propsList) => {
    let isChanged = false;
    propsList.map(prop => {
      isChanged = isChanged || this.props[prop] !== prevProps[prop];
    });
    return isChanged;
  };

  componentDidUpdate(prevProps) {
    const {
      balance, route,
      fetchWalletPage,
      walletFetchHistory,
      walletFetchHistoryMore,
    } = this.props;
    const {
      name, params,
    } = route;

    const prevName = _.get(prevProps, 'route.name');
    const prevParams = _.get(prevProps, 'route.params');
    if (name !== prevName || !_.isEqual(params, prevParams)) {
      const isSwap = name === PAGES.WALLET_SWAP;
      const isCrypto = name === PAGES.WALLET_CRYPTO;
      const balanceId = this.getBalanceId().id;

      setTitle(getLang("cabinet_header_wallet", true));
      walletFetchHistory(buildOptions(balanceId, isCrypto, isSwap));

      if (isSwap) {
        window.scroll(0, 0);
        logEvent(getAnalytics(), "open_swap_page");
      }
    }
  }

  handleLoadMore = (balanceId, isCrypto, isSwap) => {
    this.props.walletFetchHistoryMore(buildOptions(balanceId, isCrypto, isSwap));
  };

  getBalanceId = () => {
    const {
      route,
      balance,
      oldWallets,
    } = this.props;
    const {name, params} = route;
    const {currency} = params;

    const isSwap = name === PAGES.WALLET_SWAP;

    const fiat = oldWallets.balances.find(fiat => fiat.currency === currency);
    const cryptoBalances = _.get(balance, '[0].items', {});
    const currentToken = Object.keys(cryptoBalances).find(token => token === currency);

    return {
      id: !isSwap && (_.get(fiat, 'id') || currentToken),
      fiatBalance: fiat,
      currentToken,
      cryptoBalances,
    };
  };

  render() {
    const {
      status,
      history,
      route,
      cardReservation,
      isAdaptive,
      rates,
    } = this.props;

    if (status.main.length) {
      return <LoadingStatus status={status.main} />;
    }

    const {
      name, params,
    } = route;
    const {currency} = params;
    const isCommon = name === PAGES.WALLET;
    const isCrypto = name === PAGES.WALLET_CRYPTO;
    const isSwap = name === PAGES.WALLET_SWAP;
    const balance = this.getBalanceId();
    const {fiatBalance} = balance;
    const balanceId = balance.id;

    //Check card reservation expired
    const cardExpireDate = _.get(cardReservation, 'card.expire_in', 0) * 1000;
    const isReservationExpire = Date.now() > cardExpireDate;

    return (
      <PageContainer
        className="CabinetWalletScreen"
        sideBar={
          !isAdaptive && <WalletList currency={balanceId && currency} />
        }
      >
        {isCommon && <Web3Wallets />}
        {isCrypto && <CryptoWallet/>}
        {isCommon && <CommonHeader />}
        {isSwap &&
        (isAdaptive ? (
          <SwapFormAdaptive rates={rates} />
        ) : (
          <>
          <SwapForm rates={rates} />
          <SwapTutorial />
          </>
        ))}

        {fiatBalance &&
        !isSwap &&
        (fiatBalance.amount ? (
          <WalletHeader isCrypto={isCrypto} balance={fiatBalance} />
        ) : (
          <EmptyBalance currency={currency} />
        ))}

        {isAdaptive && !fiatBalance && !isSwap && (
          <ContentBox className="CabinetWalletScreen__adaptiveWalletList">
            <WalletList currency={currency} />
          </ContentBox>
        )}

        {!isReservationExpire && <RefillBlock />}

        <Paging
          isCanMore={!!history.next && status.historyMore !== "loading"}
          onMore={() => handleLoadMore(balanceId, isCrypto, isSwap)}
          moreButton={!!history.next && !status.history}
          isLoading={status.historyMore === "loading"}
        >
          <History />
        </Paging>
      </PageContainer>
    );
  }
}


export default connect(state => ({
  status: walletStatusSelector(state),
  web3Status: web3StatusSelector(state),
  web3Balances: web3BalancesSelector(state),
  history: walletHistorySelector(state),
  cardReservation: walletCardReservationSelector(state),
  oldWallets: state.wallet,
  balances: state.web3.balances,
  walletsAvailable: state.web3.wallets.length,
  isAdaptive: state.default.adaptive,
  route: state.router.route,
  rates: state.web3.rates,
}), dispatch => bindActionCreators({
  fetchWalletPage,
  walletFetchHistory,
  walletFetchHistoryMore,
  web3SetStatus,
  web3SetData,
}, dispatch), null, {pure: true})(CabinetWalletScreen);
