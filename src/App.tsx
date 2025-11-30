 

import {  Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeOne from "./components/homes/home-1";
import ErrorBoundary from "./components/ErrorBoundary";
import AboutOne from "./components/abouts/about-1";
import Service from "./components/service";
import Faq from "./components/faq";
import Blog from "./components/blog";
import Contactus3 from "./components/contact-us3";
import NotFound from "./error";
import PortfolioOne from "./components/portfolio-1";
import Contactus1 from "./components/contact-us1";

const router = createBrowserRouter([
  { path: "/", element: <HomeOne /> },
  { path: "/about-us", element: <AboutOne /> },
  { path: "/services", element: <Service /> },
  { path: "/galerry", element: <PortfolioOne /> },
  { path: "/policy", element: <Faq /> },
  { path: "/termofservice", element: <Faq /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact-us", element: <Contactus3 /> },
  { path: "/book-now", element: <Contactus1 /> },

  { path: "*", element: <NotFound /> },
]);

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="preloader">
        <div className="preloader-inner">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>

  );
}

export default App;
