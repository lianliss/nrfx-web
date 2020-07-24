import React from "react";
import PropTypes from "prop-types";
import { getLang } from "../../utils";
import { useSelector } from "react-redux";
import { currentLangSelector } from "../../selectors";

const Lang = props => {
  const currentLang = useSelector(currentLangSelector);
  return <>{getLang(props.name, false, currentLang)}</>;

  // TODO FINIS COMPONENT
};

Lang.propTypes = {
  name: PropTypes.string
};

export default Lang;
