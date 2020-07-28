import React from "react";
import PropTypes from "prop-types";
// import { getLang } from "../../utils";
import { useSelector } from "react-redux";
import { currentLangSelector, langSelector } from "../../selectors";

const Lang = ({ name, params }) => {
  const currentLang = useSelector(currentLangSelector);
  const lang = useSelector(langSelector(currentLang, name));

  let displayLang = lang || name;

  if (params) {
    Object.keys(params).forEach(param => {
      displayLang = displayLang.replace(`{${param}}`, params[param]);
    });
  }

  return <>{displayLang.replace(/{.*?}/g, "")}</>;
};

Lang.propTypes = {
  name: PropTypes.string,
  params: PropTypes.object
};

export default Lang;
