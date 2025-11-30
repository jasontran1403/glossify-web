 

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BackToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Only scroll if not already near the top
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname]);

  return null;
};

export default BackToTop;
