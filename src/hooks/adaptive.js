import { useEffect, useState } from "react";

export default () => {
  const [adaptive, setAdaptive] = useState(0);

  const handleResize = () => {
    if (document.body.offsetWidth <= 650) {
      document.body.classList.add("adaptive");
      setAdaptive(true);
    } else {
      document.body.classList.remove("adaptive");
      setAdaptive(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return adaptive;
};
