 

import { useEffect, ReactNode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BackToTop from "../common/BackToTop";
import ScrollToTop from "../common/scroll-to-top";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  
  useEffect(() => {
    AOS.init({
      duration: 800,       // slightly shorter animations = smoother feel
      once: true,          // run animation only once
      easing: "ease-out",  // smoother easing
      offset: 50,          // start animation a bit earlier
      debounceDelay: 50,   // reduce layout thrashing
      throttleDelay: 50,
    });

    // refresh on window resize only once
    const handleResize = () => AOS.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {children}
      <ScrollToTop />
      <BackToTop />
    </>
  );
};

export default Wrapper;
 