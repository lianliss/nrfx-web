// styles
import "./CabinetWrapper.less";
// external
import React, { Component } from "react";
import { connect } from "react-redux";
import SVG from "utils/svg-wrap";
// internal
import { classNames } from "../../../src/utils";
import router from "../../../src/router";
import Header from "../../index/components/cabinet/Header/Header";
import * as PAGES from "../../index/constants/pages";
import * as utils from "../../utils";
import TabBar from "../../index/components/cabinet/TabBar/TabBar";
import { BaseLink } from "react-router5";
import * as actions from "../../actions";
import * as steps from "../../components/AuthModal/fixtures";
import LoadingStatus from "../../index/components/cabinet/LoadingStatus/LoadingStatus";
import LogoLoader from "../../ui/components/LogoLoader/LogoLoader";
import Web3Backend from 'services/web3-backend';
import streamMessage from './steam-message';
import TagManager from 'react-gtm-module';
import { PHONE } from "../../index/constants/breakpoints";
import { Logo } from "../../ui";

import {
  walletBalancesSelector,
  web3WalletsSelector,
  web3BalancesSelector,
} from "src/selectors";
import {
  walletUpdate,
} from "src/actions/cabinet/wallet";
import { getCurrencyInfo } from "src/actions";
import {
  updateProfile,
} from 'src/actions/cabinet/profile';

import {
  web3Update,
  web3SetData,
} from 'actions/cabinet/web3';

const STREAM_RECONNECT_TIMEOUT = 2000;

class CabinetWrapper extends Component {
  state = {
    error: null
  };
  stream = null;

  componentDidMount() {
    const {updateProfile, web3SetData} = this.props;
    this.runStream();

    Web3Backend.getUserData().then(data => {
      updateProfile(data);
    }).catch(error => {
      console.error("[CabinetWrapper] Can't get user data");
    });
    Promise.all([
      Web3Backend.getAllRates(),
      Web3Backend.getCommissions(),
    ]).then(data => {
      let commissions = data[1];
      try {
        commissions = JSON.parse(commissions);
      } catch (error) {
        console.warn('Commissions in not JSON format', data[1]);
      }
      web3SetData({
        rates: data[0],
        commissions: commissions,
      });
    }).catch(error => {
      console.error("[CabinetWrapper] Can't get rates");
    });

    TagManager.initialize({
      gtmId: 'GTM-NSSCKZG',
    });

    // Set adaptive.
    this.handleResize();
    
    // Set adaptive.
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    // Unset adaptive.
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    const { setAdaptive } = this.props;
    // If phone - true, else - false.
    setAdaptive(document.body.offsetWidth <= PHONE);
  }

  runStream = async () => {
    this.stream = await Web3Backend.stream(
      message => streamMessage(message, this.props),
      error => setTimeout(this.runStream, STREAM_RECONNECT_TIMEOUT),
    );

    window.pingWeb3Backend = () => this.stream.send('ping');
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.children !== this.props.children) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error, info) {
    console.error('[CabinetWrapper]', error, info);
    this.setState({
      error: {
        name: error.name,
        message: error.message
      }
    });
  }

  __renderContent() {
    const { error } = this.state;
    return error ? (
      <LoadingStatus status={error.name} description={error.message} />
    ) : (
      this.props.children
    );
  }

  render() {
    const route = router.getState();

    let contentRules = {
      [PAGES.NOTIFICATIONS]: {
        left: (
          <BaseLink router={router} routeName={PAGES.WALLET}>
            <SVG src={require("../../asset/24px/angle-left.svg")} />
          </BaseLink>
        )
      },
      default: {
        left: !!Object.keys(route.params).length && (
          <span onClick={() => window.history.back()}>
            <SVG src={require("../../asset/24px/angle-left.svg")} />
          </span>
        )
      }
    };

    if (!Object.keys(route.params)) {
      contentRules[PAGES.WALLET] = {
        left: (
          <BaseLink router={router} routeName={PAGES.NOTIFICATIONS}>
            <SVG src={require("../../asset/24px/bell.svg")} />
          </BaseLink>
        )
      };
    }

    const content = utils.switchMatch(route.name, contentRules);

    const { className, adaptive, user, profile } = this.props;

    if (profile.pending && !profile.user) {
      return <LogoLoader className="AppLoading" />;
    }

    const mainClassName = classNames({
      CabinetWrapper: true,
      [className]: !!className
    });

    return (
      <div className={mainClassName}>
        <Header adaptive={adaptive}  />
        <div className="CabinetWrapper__content">{this.__renderContent()}</div>
        {/* Display TabBar for mobile */}
        {/* {adaptive && user && <TabBar />} */}
      </div>
    );
  }
}

CabinetWrapper.defaultProps = {
  adaptive: false,
}

export default connect(
  state => ({
    ...state.default,
    router: state.router,
    user: state.default.profile.user,
    profile: state.default.profile,
    fiats: walletBalancesSelector(state),
    wallets: web3WalletsSelector(state),
    balances: web3BalancesSelector(state),
  }),
  {
    setAdaptive: actions.setAdaptive,
    web3SetData,
    web3Update,
    walletUpdate,
    updateProfile,
  }
)(CabinetWrapper);