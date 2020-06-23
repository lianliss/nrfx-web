import React from "react";
import { useSelector } from "react-redux";
import "./Footer.less";
import { Logo } from "../../../../ui";
import SVG from "react-inlinesvg";
import AppButtons from "../AppButtons/AppButtons";
import Copyright from "../Copyright/Copyright";
import { Select } from "src/ui/index";
import { getCssVar } from "../../../../utils";
import { customStyles } from "../../../../ui/components/Select/Select";
import { currentLangSelector, langListSelector } from "../../../../selectors";
import { setLang } from "../../../../services/lang";

const getLanguageFlag = langCode => {
  return (
    <div className="Footer__lang__flag">
      <SVG src={require(`../../../../asset/site/lang-flags/${langCode}.svg`)} />
    </div>
  );
};

export default () => {
  const langList = useSelector(langListSelector);
  const currentLang = useSelector(currentLangSelector);

  return (
    <div className="Footer LandingWrapper__block">
      <div className="Footer__content LandingWrapper__content">
        <div className="Footer__main">
          <Logo className="Footer__logo" size="extra-large" />
          <Select
            className="Footer__lang"
            styles={{
              control: (provided, state) => ({
                ...customStyles.control(provided, state),
                boxShadow: null,
                border: `1px solid ${getCssVar("--cloudy")}`,
                borderRadius: 16,
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
          <div className="Footer__social">
            <div className="Footer__social__link facebook">
              <SVG src={require("src/asset/social/facebook.svg")} />
            </div>
            <div className="Footer__social__link twitter">
              <SVG src={require("src/asset/social/twitter.svg")} />
            </div>
            <div className="Footer__social__link instagram">
              <SVG src={require("src/asset/social/instagram.svg")} />
            </div>
            <div className="Footer__social__link medium">
              <SVG src={require("src/asset/social/medium.svg")} />
            </div>
            <div className="Footer__social__link linkedin">
              <SVG src={require("src/asset/social/linkedin.svg")} />
            </div>
          </div>
          <div className="desktopBlock">
            <AppButtons className="Footer__appButtons" />
            <Copyright className="Footer__copyright" />
          </div>
        </div>
        <nav className="Footer__nav">
          <ul>
            <li>
              <h4>Продукты</h4>
            </li>
            <li>
              <span>Купить Bitcoin</span>
            </li>
            <li>
              <span>Купить Ethereum</span>
            </li>
            <li>
              <span>Обмен валют</span>
            </li>
            <li>
              <span>Биржа</span>
            </li>
          </ul>
          <ul>
            <li>
              <h4>Компания</h4>
            </li>
            <li>
              <span>О компании</span>
            </li>
            <li>
              <span>Комиссии</span>
            </li>
            <li>
              <span>Narfex Token</span>
            </li>
            <li>
              <span>Безопасность</span>
            </li>
          </ul>
          <ul>
            <li>
              <h4>Компания</h4>
            </li>
            <li>
              <span>FAQ – Частые вопросы</span>
            </li>
            <li>
              <span>Центр поддержки</span>
            </li>
            <li>
              <span>Пользовательское соглашение</span>
            </li>
            <li>
              <span>Политика конфиденциальности</span>
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
