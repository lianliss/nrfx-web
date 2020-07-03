import { useEffect, useState } from "react";
import { setAdaptive as setAdaptiveStore } from "src/actions";

export default () => {
  const [adaptive, setAdaptive] = useState();
  const handleResize = () => {
    if (document.body.offsetWidth <= 650) {
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
