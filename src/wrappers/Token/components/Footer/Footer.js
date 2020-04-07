import "./Footer.less";
import React from "react";
import { Logo } from "src/ui";
import COMPANY from "../../../../index/constants/company";
import SVG from "react-inlinesvg";

export default props => {
  return (
    <div className="TokenWrapper__footer">
      <div className="TokenWrapper__content Footer__bottom">
        <div className="Footer__logo">
          <Logo type="monochrome" />
        </div>
        <div className="Footer__copyright">
          © 2017-{new Date().getYear() + 1900} {COMPANY.name}
        </div>
        <div className="Footer__socials">
          {COMPANY.social.facebook && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://" + COMPANY.social.facebook}
              className="Footer__social"
            >
              <SVG src={require("../../../../asset/social/facebook.svg")} />
            </a>
          )}
          {COMPANY.social.twitter && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://" + COMPANY.social.twitter}
              className="Footer__social"
            >
              <SVG src={require("../../../../asset/social/twitter.svg")} />
            </a>
          )}
          {COMPANY.social.instagram && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://" + COMPANY.social.instagram}
              className="Footer__social"
            >
              <SVG src={require("../../../../asset/social/instagram.svg")} />
            </a>
          )}
          {COMPANY.social.telegram && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://" + COMPANY.social.telegram}
              className="Footer__social"
            >
              <SVG src={require("../../../../asset/social/telegram.svg")} />
            </a>
          )}
          {COMPANY.social.vk && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://" + COMPANY.social.vk}
              className="Footer__social"
            >
              <SVG src={require("../../../../asset/social/vk.svg")} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
