import * as React from "react";
import Cta from "./cta";

export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type Banner = {
  name?: string;
  address?: Address;
  geomodifier?: string;
};

const Banner = (props: Banner) => {
  const {
    name,
    address,
    geomodifier
  } = props;

  return (
    <>
      <div
        className={`relative z-10 w-full bg-cover bg-center h-80 bg-[url(/src/assets/images/storefront.jpeg)] `}
      >
        <div className=" left-0 right-0 flex flex-col items-center ">
          <div className="my-8 rounded-xl bg-brand-primary border-8 shadow-xl border-brand-primary px-4 py-2 flex">
            <div className="text-center m-4">
              <div className="align-middle">
                <h1 className="text-white text-3xl font-semibold">{name} - {geomodifier}</h1>
                <div className="text-lg pt-2 text-white font-semibold max-w-xs">
                {address?.city}, {address?.region}
                </div>
                {/* <div className="text-base pt-2 text-white">
                  {renderRating(
                    c_starRating,
                    c_numberOfReviews,
                    c_45StarsImage?.url
                  )}
                </div> */}
              </div>
            </div>
            <div className="flex pt-4 justify-between"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
