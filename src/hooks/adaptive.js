import { useEffect, useState } from "react";
import { setAdaptive as setAdaptiveStore } from "src/actions";
import { PHONE } from "../index/constants/breakpoints";

export default () => {
  const [adaptive, setAdaptive] = useState();
  const handleResize = () => {
    if (document.body.offsetWidth <= PHONE) {
      setAdaptive(true);
      setAdaptiveStore(true);
    } else {
      setAdaptive(false);
      setAdaptiveStore(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return adaptive;
};
