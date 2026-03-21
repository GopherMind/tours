import { Suspense, lazy } from "react";

const FindBanner = lazy(() => import("./FindBanner"));

const Banner = () => {
  return (
    <div className="relative w-full">
      {/* Hero секция */}
      <div className="relative w-full h-[500px] px-8 flex flex-col items-center justify-start pt-20">
        <img
          src="/assets/hero-forest-1280.webp"
          srcSet="/assets/hero-forest-640.webp 640w, /assets/hero-forest-1280.webp 1280w, /assets/hero-forest-1920.webp 1920w"
          sizes="100vw"
          alt="Японский лесной пейзаж"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 pointer-events-none" />

        <div className="relative text-white text-center">
          <h1 className="text-6xl font-bold">Mirage</h1>
          <p className="mt-4 text-2xl">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque, fuga?
          </p>
        </div>

        <div className="relative flex bg-amber-300 w-full hover:bg-yellow-500 text-white justify-center rounded-2xl p-4 text-2xl px-10 md:w-1/3 mt-6 transition-colors duration-300 cursor-pointer">
          All Tours
        </div>
      </div>

      {/* FindBanner наезжает на hero снизу */}
      <div className="relative z-10 flex justify-center w-full -mt-30 px-4 pb-8">
        <Suspense fallback={null}>
          <FindBanner />
        </Suspense>
      </div>
    </div>
  );
};

export default Banner;