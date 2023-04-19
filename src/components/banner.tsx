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
        className={`relative flex justify-center items-center z-10 w-full bg-cover bg-center h-80 bg-[url(/src/assets/images/storefront.jpeg)] `}
      >
        <div className="text-white text-center font-semibold bg-brand-primary w-fit h-fit p-8 rounded-[24px]">
          <h1 className="text-3xl ">{name} - {geomodifier}</h1>
          <div className="text-lg pt-2">
            {address?.city}, {address?.region}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
