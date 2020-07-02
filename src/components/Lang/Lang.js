import React from "react";
import { getLang } from "../../utils";
import { useSelector } from "react-redux";
import { currentLangSelector } from "../../selectors";

export default props => {
  const currentLang = useSelector(currentLangSelector);
  return <>{getLang(props.name, false, currentLang)}</>;

  // TODO FINIS COMPONENT
};
