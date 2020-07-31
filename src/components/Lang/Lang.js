import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { currentLangSelector, langSelector } from "../../selectors";
import { joinComponents } from "../../utils";

const Lang = ({ name, params }) => {
  const currentLang = useSelector(currentLangSelector);
  const lang = useSelector(langSelector(currentLang, name));

  let displayLang = lang || name || "";

  if (params) {
    Object.keys(params).forEach(param => {
      displayLang = displayLang.replace(`{${param}}`, params[param]);
    });
  }

  if (displayLang.includes("{")) {
    displayLang = displayLang.replace(/{.*?}/g, "");
  }

  if (displayLang.includes("\\n")) {
    displayLang = displayLang.split("\\n").reduce(joinComponents(<br />), null);
  }

  return <>{displayLang}</>;
};

Lang.propTypes = {
  name: PropTypes.string,
  params: PropTypes.object
};

export default Lang;
