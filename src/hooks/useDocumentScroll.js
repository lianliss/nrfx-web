import { useEffect, useState } from "react";
import { throttle2 } from "src/utils";

export default () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  function handleDocumentScroll() {
    const { scrollTop } = document.documentElement || document.body;
    setScrollPosition(scrollTop);
  }

  const handleDocumentScrollThrottled = throttle2(handleDocumentScroll, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleDocumentScrollThrottled);
    return () =>
      window.removeEventListener("scroll", handleDocumentScrollThrottled);
    // eslint-disable-next-line
  }, []);

  return [scrollPosition];
};
