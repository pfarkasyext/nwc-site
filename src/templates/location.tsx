/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import StoreHeroBanner from "../components/store-hero-banner";
import Details from "../components/details";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StaticMap from "../components/static-map";
import Favicon from "../public/yext-favicon.ico";
import "../index.css";
import {
  SandboxEndpoints,
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { FeaturedProducts } from "../components/search/FeaturedProducts";
import { Address } from "@yext/pages/components";
import Cta from "../components/cta";
import { LocationFeaturedCategories } from "../components/location-featured-categories";
import { LocationAboutSection } from "../components/location-about-section";
import { LocationIntentLinks } from "../components/location-intent-links";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-location",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "geomodifier",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "c_linkedCategories.name",
      "c_linkedCategories.slug",
      "c_linkedCategories.c_bannerPhoto",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and produce a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

const apiKey = "d2471212e8121452a0204c59c9a08bd4";
const experienceKey = "answers";
const experienceVersion = "PRODUCTION";
const locale = "en";

const searcher = provideHeadless({
  apiKey: apiKey,
  experienceKey: experienceKey,
  //verticalKey: "Your Vertical Key",
  locale: "en",
  endpoints: SandboxEndpoints,
});

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    id,
    name,
    address,
    geomodifier,
    openTime,
    hours,
    mainPhone,
    geocodedCoordinate,
    services,
    description,
    c_linkedCategories,
  } = document;

  const breadcrumbLinks = [
    "All Stores",
    address?.region,
    address?.city,
    address?.line1,
  ];

  const categories = [
    {
      name: "Handcrafted Collection",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-01-collection-01.jpg",
      imageAlt:
        "Brown leather key ring with brass metal loops and rivets on wood table.",
      description:
        "Keep your phone, keys, and wallet together, so you can lose everything at once.",
    },
    {
      name: "Organized Desk Collection",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-01-collection-02.jpg",
      imageAlt:
        "Natural leather mouse pad on white desk next to porcelain mug and keyboard.",
      description:
        "The rest of the house will still be a mess, but your desk will look great.",
    },
    {
      name: "Focus Collection",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/home-page-01-collection-03.jpg",
      imageAlt:
        "Person placing task list card into walnut card holder next to felt carrying case on leather desk pad.",
      description:
        "Be more productive than enterprise project managers with a single piece of paper.",
    },
  ];

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
  };

  const phoneLink = (phone?: string) => {
    if (!phone) {
      return "";
    }
    return `tel:${phone}`;
  };

  return (
    <>
      <PageLayout _site={_site} c_siteLogo={_site.c_siteLogo}>
        <div className="mx-auto mt-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row my-4">
            {breadcrumbLinks &&
              breadcrumbLinks.map((item, index) => (
                <div key={index}>
                  {index !== 0 && (
                    <span className="mx-2 text-gray-400">&gt;</span>
                  )}
                  <a
                    href={"#"}
                    className="text-brand-primary hover:text-brand-hover"
                  >
                    {item}
                  </a>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-gray-100">
          <div className="mx-4 mt-4">
            <div className="py-4">
              <LocationIntentLinks id={id} />
            </div>
            <div className="bg-white">
              <div className="mx-auto max-w-xl px-4 pt-8 sm:px-6 lg:max-w-7xl lg:px-8 pb-16">
                <h3 className="mt-4 text-3xl text-gray-500">NWC</h3>
                <h2 className="text-5xl font-bold tracking-tight text-gray-900">
                  {geomodifier}
                </h2>
                <div className="mt-10 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                  <div className="group block">
                    <div
                      aria-hidden="true"
                      className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-5 lg:aspect-w-5"
                    >
                      <div className="h-full w-full object-cover object-center bg-white">
                        <div className="bg-gray-100 p-6 h-full">
                          <h3 className="mt-4 font-semibold text-gray-900 text-xl font-semibold mb-4">
                            Information
                          </h3>
                          <div className="">
                            <div>
                              {renderAddress(address)}
                              <div className="pt-4">{mainPhone}</div>
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
                              url={phoneLink(mainPhone)}
                              style="text-white bg-brand-cta shadow-xl hover:bg-brand-cta-hover hover:underline mt-3 w-fit min-w-[200px] flex justify-center font-normal py-2"
                              target="_self"
                            ></Cta>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group block">
                    <div
                      aria-hidden="true"
                      className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-5 lg:aspect-w-5 "
                    >
                      <div className="h-full w-full object-cover object-center bg-white">
                        <div className="bg-gray-100 p-2 h-full">
                          {hours && (
                            <Hours title={"Store Hours"} hours={hours} />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group block">
                    <div
                      aria-hidden="true"
                      className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg lg:aspect-h-5 lg:aspect-w-5"
                    >
                      <img
                        className="h-full w-full object-cover object-center bg-brand-primary"
                        src="https://dynl.mktgcdn.com/p/YQTNWpAQ48L7meecBlfj0hyDk7DqbbNouEZJJUACsY8/450x450.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <LocationFeaturedCategories categories={c_linkedCategories} />
          <SearchHeadlessProvider searcher={searcher}>
            <div className="initLoads block my-12">
              <FeaturedProducts
                initialVerticalKey={["products"]}
                initialNames={["Products"]}
              />
            </div>
          </SearchHeadlessProvider>
          <LocationAboutSection
            geomodifier={geomodifier}
            description={description}
            geocodedCoordinate={geocodedCoordinate}
          />
        </div>
      </PageLayout>
    </>
  );
};

export default Location;
