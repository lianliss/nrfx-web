import React from "react";
import { getLang } from "../../utils";
import { useSelector } from "react-redux";
import { currentLangSelector } from "../../selectors";

export default props => {
  const currentLang = useSelector(currentLangSelector);
  return <>{getLang(props.key, currentLang)}</>;
};
