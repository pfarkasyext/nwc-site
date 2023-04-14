import * as React from "react";
import Cta from "./cta";
import { Address } from "@yext/pages/components";

const renderAddress = (address?: Address) => {
  if (address.line2) {
    return (
      <>
        {address && (
          <div>
            {address.line1}
            <br />
            {address.line2}
            <br />
            {address.city}, {address.region}
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {address && (
          <div>
            {address.line1}
            <br />
            {address.city}, {address.region}
          </div>
        )}
      </>
    );
  }
};

const getDirectionsUrl = (addr?: Address) => {
  const line2 = addr.line2 ? ` ${addr.line2},` : ``;
  const region = addr.region ? ` ${addr.region}` : ``;
  const rawQuery = `${addr.line1},${line2} ${addr.city},${region} ${addr.postalCode} ${addr.countryCode}`;
  const query = encodeURIComponent(rawQuery);

  const url = `https://www.google.com/maps/search/?api=1&query=${query}&output=classic`;

  return url;
}

const phoneLink = (phone?: string) => {
  if (!phone) {
    return '';
  }
  return `tel:${phone}`;
}

const Details = (props: any) => {
  const { address, phone } = props;

  return (
    <>
      <div className="grid">
        <div className="text-xl font-semibold">Contact Info</div>
        <div className="grid grid-cols-2 py-4">
          <div>
            {renderAddress(address)}
            <div className="pt-4">
              {phone}
            </div>
          </div>
        </div>
        <div className="uppercase">
          <Cta
            buttonText="Get Directions"
            url={getDirectionsUrl(address)}
            style="text-white bg-brand-cta shadow-xl hover:bg-brand-cta-hover hover:underline mt-3 w-fit min-w-[200px] flex justify-center font-normal py-2"
            target="_self"
          ></Cta>
          <Cta
            buttonText="Call"
            url={phoneLink(phone)}
            style="text-white bg-brand-cta shadow-xl hover:bg-brand-cta-hover hover:underline mt-3 w-fit min-w-[200px] flex justify-center font-normal py-2"
            target="_self"
          ></Cta>
        </div>
      </div>
    </>
  );
};

export default Details;
