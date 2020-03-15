import React from "react";

import BaseScreen from "../../../BaseScreen";
import * as UI from "../../../../../ui";
import * as utils from "../../../../../utils";
import { PHONE } from "../../../../constants/breakpoints";
import { getLang } from "../../../../../utils";

const platformLogos = [
  {
    logo: require("../asset/binance.svg"),
    name: "Binance"
  },
  {
    logo: require("../asset/bitfinex.svg"),
    name: "Bitfinex"
  },
  {
    logo: require("../asset/poloniex.svg"),
    name: "Poloniex"
  },
  {
    logo: require("../asset/kraken.svg"),
    name: "Kraken"
  },
  {
    logo: require("../asset/huobi.svg"),
    name: "Huobi"
  },
  {
    logo: require("../asset/coinbase.svg"),
    name: "Coinbase"
  },
  {
    logo: require("../asset/bittrex.svg"),
    name: "Bittrex"
  },
  {
    logo: require("../asset/okex.svg"),
    name: "Okex"
  },
  {
    logo: require("../asset/bitstamp.svg"),
    name: "Bitstamp"
  }
];

export default class SiteRobotsScreen extends BaseScreen {
  state = {
    visibleLogos: platformLogos,
    screenWidth: window.innerWidth
  };

  componentDidMount() {
    this.updateVisibleLogos(true);
    window.addEventListener("resize", this.updateVisibleLogos);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateVisibleLogos);
  }

  updateVisibleLogos = isInitial => {
    const { visibleLogos, screenWidth } = this.state;

    if (window.innerWidth !== screenWidth || isInitial) {
      if (screenWidth > PHONE && platformLogos.length !== visibleLogos.length) {
        this.setState({ visibleLogos: platformLogos });
      } else if (
        screenWidth <= PHONE &&
        platformLogos.length === visibleLogos.length
      ) {
        this.setState({ visibleLogos: platformLogos.slice(0, 6) });
      }

      this.setState({ screenWidth: window.innerWidth });
    }
  };

  showMore = () => {
    this.setState({ visibleLogos: platformLogos });
  };

  render() {
    const { visibleLogos } = this.state;

    return (
      <div className="SupportedPlatforms">
        <div className="SupportedPlatforms__text">
          <img
            src={require("../asset/robots_platforms_bg.svg")}
            alt="supported-platforms"
            className="SupportedPlatforms__bg"
          />
          <h2 className="SupportedPlatforms__title">
            {utils.getLang("site__robotsSupportedTitle")}
          </h2>
          <p className="SupportedPlatforms__caption">
            {utils.getLang("site__robotsSupportedSubTitle")}
          </p>
        </div>
        <div className="SupportedPlatforms__logos">
          {visibleLogos.map((item, i) => (
            <div
              key={i}
              className="SupportedPlatforms__logo"
              xs={6}
              sm={6}
              md={4}
              lg={4}
            >
              <img src={item.logo} alt={item.name} />
            </div>
          ))}
        </div>

        {visibleLogos.length !== platformLogos.length ? (
          <UI.Button
            size="small"
            rounded
            type="secondary"
            onClick={this.showMore}
          >
            {getLang("site__showMore")}
          </UI.Button>
        ) : null}
      </div>
    );
  }
}
