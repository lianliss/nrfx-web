import React from "react";
import { useSelector } from "react-redux";
import router from "src/router";
import "./Footer.less";
import { Logo } from "../../../../ui";
import SVG from "utils/svg-wrap";
import AppButtons from "../../../../components/AppButtons/AppButtons";
import Copyright from "../Copyright/Copyright";
import { Select } from "src/ui/index";
import { getCssVar } from "../../../../utils";
import { customStyles } from "../../../../ui/components/Select/Select";
import { currentLangSelector, langListSelector } from "../../../../selectors";
import { setLang } from "../../../../services/lang";
import { Link } from "react-router5";
import * as PAGES from 'src/index/constants/pages';
import * as pages from "../../../../index/constants/pages";
import * as actions from "../../../../actions";
import COMPANY from "../../../../index/constants/company";
import Lang from "../../../../components/Lang/Lang";
import Socials from "../Socials/Socials";

const getLanguageFlag = langCode => {
  return (
    <div className="Footer__lang__flag">
      <SVG src={require(`../../../../asset/site/lang-flags/${langCode}.svg`)} />
    </div>
  );
};

export default ({ logoType = "default" }) => {
  const langList = useSelector(langListSelector);
  const currentLang = useSelector(currentLangSelector);

  return (
    <div className="Footer LandingWrapper__block">
      <div className="Footer__content LandingWrapper__content">
        <div className="Footer__main">
          <Logo className="Footer__logo" size="extra-large" type={logoType} />
          <Select
            className="Footer__lang"
            styles={{
              control: (provided, state) => ({
                ...customStyles.control(provided, state),
                boxShadow: null,
                border: `1px solid ${getCssVar("--cloudy")}`,
                borderRadius: 3,
                minHeight: 40
              }),
              option: (provided, state) => ({
                ...customStyles.option(provided, state),
                padding: "11px 16px"
              })
            }}
            onChange={o => setLang(o.value)}
            value={currentLang}
            options={langList
              .filter(l => l.display)
              .map(l => ({
                ...l,
                label: l.title,
                icon: getLanguageFlag(l.value)
              }))}
          />
          <Socials />
          <div className="desktopBlock">
            <AppButtons className="Footer__appButtons" />
            <Copyright className="Footer__copyright" />
          </div>
        </div>
        <nav className="Footer__nav">
          <ul>
            <li>
              <h4>
                <Lang name="landing_footer_products" />
              </h4>
            </li>
            <li>
              <Link routeName={pages.TOKEN}>Narfex Token</Link>
            </li>
            <li>
              <Link routeName={pages.BUY_BITCOIN}>
                <Lang name="landing_footer_buyBitcoin" />
              </Link>
            </li>
            {/*<li>*/}
            {/*  <span><Lang name="landing_footer_buyEthereum" /></span>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <span>*/}
            {/*    <Lang name="landing_footer_swap" />*/}
            {/*  </span>*/}
            {/*</li>*/}
            <li>
              <Link routeName={pages.SITE_EXCHANGE}>
                <Lang name="landing_footer_exchange" />
              </Link>
            </li>
            {/* <li>
              <a href="https://bscscan.com/address/0x3764be118a1e09257851a3bd636d48dfeab5cafe" target="_blank">
                Smart contract
              </a>
            </li> */}
            <li>
              <a onClick={() => router.navigate(PAGES.LIQUIDITY)}>
                <Lang name="dapp_sidebar_liquidity" />
              </a>
            </li>
            <li>
              <a onClick={() => router.navigate(PAGES.FARMING)}>
                <Lang name="dapp_sidebar_farm" />
              </a>
            </li>
            <li onClick={() => router.navigate(PAGES.DAPP_VALIDATOR)}>
              <a>
                <Lang name="dapp_sidebar_validator" />
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <h4>
                <Lang name="landing_footer_about" />
              </h4>
            </li>
            <li>
              <Link routeName={pages.NARFEX_DAO}>
                <Lang name="landing_footer_company" />
              </Link>
            </li>
            <li>
              <a href="https://www.crunchbase.com/organization/narfex" target="_blank">
                <Lang name="landing_footer_crunchbase" />
              </a>
            </li>
            <li>
              <a href="https://github.com/narfex/DEX" target="_blank">
                GitHub
              </a>
            </li>
            <li>
              <a href={COMPANY.docs} target="_blank">
                <Lang name="landing_footer_white_paper" />
              </a>
            </li>
            {/*<li>*/}
              {/*<Link routeName={pages.FEE}>*/}
                {/*<Lang name="landing_footer_fee" />*/}
              {/*</Link>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <Link routeName={pages.SAFETY}>*/}
            {/*    <Lang name="landing_footer_security" />*/}
            {/*  </Link>*/}
            {/*</li>*/}
          </ul>
          <ul>
            <li>
              <h4>
                <Lang name="landing_footer_help" />
              </h4>
            </li>
            <li>
              <a
                href={COMPANY.docs}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Lang name="landing_footer_docs" />
              </a>
            </li>
            <li>
              <Link routeName={pages.CONTACT}>
                <Lang name="landing_footer_support" />
              </Link>
            </li>
            <li>
              <span
                onClick={() =>
                  actions.openModal("static_content", { type: "terms" })
                }
              >
                <Lang name="landing_footer_terms" />
              </span>
            </li>
          </ul>
        </nav>
        <div className="mobileBlock">
          <AppButtons className="Footer__appButtons" />
          <Copyright className="Footer__copyright" />
        </div>
      </div>
    </div>
  );
};
