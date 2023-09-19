import * as React from "react";
import { useEffect } from "react";
import { useSearchActions } from "@yext/search-headless-react";
import TypedAnimation from "./TypedAnimation";

const SearchHeroBanner = () => {
  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setUniversal();
  }, []);

  return (
    <>
      <section aria-labelledby="cause-heading">
        <div className="relative bg-gray-800 px-6 py-24 sm:px-12 sm:py-24 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src="https://www.washingtonpost.com/resizer/q_Sj-osjhABCigGjPWnL5BfChoo=/arc-anglerfish-washpost-prod-washpost/public/OHBJ2SJ6W5JLRDPQLSOU4233EY.jpg"
              alt=""
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gray-900 bg-opacity-50"
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2
              id="cause-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Healthy Living since 1939
            </h2>
            <p className="mt-3 text-xl text-white">
              Get expert guidance and top-quality vitamins, supplements, and
              sports nutrition products at NWC. With over 80 years of
              experience, we help you reach your health goals and live your best
              life.
            </p>
            <div className="flex justify-center w-2/3 pt-12 mb-4">
              <TypedAnimation />
            </div>
            <a
              href="/products"
              className="inline-block rounded-md border border-transparent bg-brand-cta px-8 py-3 font-medium text-white hover:bg-brand-cta-hover"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchHeroBanner;
