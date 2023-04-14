import * as React from "react";
import Cta from "./cta";

export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

export type Headshot = {
  url: string;
};

export type KgPic = {
  url: string;
};

type Banner = {
  name?: string;
  headshot?: Headshot;
  c_specialtiesPages?: string[];
  address?: Address;
  c_starRating?: string;
  c_numberOfReviews?: string;
  c_siteLogo?: KgPic;
  c_45StarsImage?: KgPic;
};

const renderRating = (
  c_starRating?: string,
  c_numberOfReviews?: string,
  starImgUrl?: string
) => {
  return (
    <>
      <img src={starImgUrl} width="140px" className="mx-auto"></img>
      <div>
        {c_starRating} avg ({c_numberOfReviews} Reviews)
      </div>
    </>
  );
};

const Banner = (props: Banner) => {
  const {
    name,
    headshot,
    c_specialtiesPages,
    address,
    c_starRating,
    c_numberOfReviews,
    c_45StarsImage,
  } = props;

  let tagline;
  if (c_specialtiesPages === undefined) {
    tagline = `${address?.city}, ${address?.region}`
  } else {
    tagline = c_specialtiesPages[0];
    if (c_specialtiesPages[1]) tagline += ", " + c_specialtiesPages[1];
    tagline += ` in ${address?.city}, ${address?.region}`;
  }

  return (
    <>
      <div
        className={`relative z-10 w-full bg-cover bg-center h-80 bg-[url(/src/assets/images/banner-background-1.jpg)] `}
      >
        <div className=" left-0 right-0 flex flex-col items-center ">
          <div className="my-8 rounded-xl bg-brand-primary-dark border-8 shadow-xl border-brand-primary-dark px-4 py-2 flex">
            <div className="text-center m-4">
              <div className="align-middle">
                <h1 className="text-white text-3xl font-semibold">{name}</h1>
                <div className="text-lg pt-2 text-white font-semibold max-w-xs">
                  {tagline}
                </div>
                <div className="text-base pt-2 text-white">
                  {renderRating(
                    c_starRating,
                    c_numberOfReviews,
                    c_45StarsImage?.url
                  )}
                </div>
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
