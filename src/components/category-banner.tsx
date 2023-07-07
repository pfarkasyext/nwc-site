import * as React from "react";

type Banner = {
  name?: string;
  description?: string;
  photoURL?: string;
};

const CategoryBanner = (props: Banner) => {
  const { name, description, photoURL } = props;

  return (
    <>
      <section aria-labelledby="cause-heading">
        <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={photoURL}
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
              {name}
            </h2>
            <p className="mt-3 text-xl text-white">
              {description}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryBanner;
