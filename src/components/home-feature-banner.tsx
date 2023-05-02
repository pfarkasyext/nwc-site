import * as React from "react";
import Cta from "./cta";

const HomeFeatureBanner = (props: any) => {
  const { address, phone } = props;

  return (
    <>
      {/* Featured section */}
      <section aria-labelledby="cause-heading">
            <div className="relative px-6 py-32 sm:px-12 sm:py-40 lg:px-16 bg-gradient-to-r from-brand-primary via-purple-500 to-brand-cta">
              <div
                aria-hidden="true"
                className="absolute inset-0 "
              />
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2
                  id="cause-heading"
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  Long-term thinking
                </h2>
                <p className="mt-3 text-xl text-white">
                  We're committed to responsible, sustainable, and ethical
                  manufacturing. Our small-scale approach allows us to focus on
                  quality and reduce our impact. We're doing our best to delay
                  the inevitable heat-death of the universe.
                </p>
                <a
                  href="#"
                  className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                >
                  Read our story
                </a>
              </div>
            </div>
          </section>
    </>
  );
};

export default HomeFeatureBanner;
