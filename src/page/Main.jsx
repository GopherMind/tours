import React, { Suspense, lazy, useEffect, useState } from "react";
import Header from "../components/components/Header";
import BestTour from "../components/MainPage/BestTour";
import Banner from "../components/MainPage/Banner/Banner";
import AboutUs from "../components/MainPage/aboutUs/AboutUs";

const Testimonials = lazy(() => import("../components/MainPage/testimoials/Testimonials"));
const QuestionsAnswer = lazy(() => import("../components/MainPage/questions/QuestionsAnswer"));
const Booking = lazy(() => import("../components/components/booking/Booking"));
const Footer = lazy(() => import("../components/components/footer/Footer"));

const Main = () => {
  const [showBelowFold, setShowBelowFold] = useState(false);

  useEffect(() => {
    const cb = () => setShowBelowFold(true);
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const id = window.requestIdleCallback(cb, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(cb, 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Header isVisibility={false} />
      <Banner />
      <AboutUs />
      <BestTour />

      {showBelowFold ? (
        <Suspense fallback={<div className="mt-16 px-4 py-12 bg-gray-50" />}>
          <Testimonials />
        </Suspense>
      ) : (
        <div className="mt-16 px-4 py-12 bg-gray-50" />
      )}

      <BestTour text="Winter tours" season="winter" />

      {showBelowFold ? (
        <Suspense fallback={<div className="mt-16 px-4 py-12 bg-gray-100" />}>
          <QuestionsAnswer />
        </Suspense>
      ) : (
        <div className="mt-16 px-4 py-12 bg-gray-100" />
      )}

      {showBelowFold ? (
        <Suspense fallback={null}>
          <Booking />
          <Footer />
        </Suspense>
      ) : null}
    </>
  );
};

export default Main;