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
import PageLayout from "../components/page-layout";
import Favicon from "../public/yext-favicon.ico";
import "../index.css";
import { provideHeadless } from "@yext/search-headless-react";
import { FeaturedProducts } from "../components/search/FeaturedProducts";
import { LocationAboutSection } from "../components/location-about-section";
import { LocationIntentLinks } from "../components/location-intent-links";
import searchConfig from "../components/search/searchConfig";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-intentPage",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "name",
      "address",
      "slug",
      "geomodifier",
      "c_bannerPhoto",
      "c_intentPageContent",
      "c_intentPageSubheading",
      "c_parentLocation.id",
      "c_parentLocation.geocodedCoordinate",
      "c_parentLocation.description",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_intentPage"],
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

const renderPostContent = (input: any) => {
  const bodyDom: JSX.Element[] = [];
  const paragraphs = input.split("\n");
  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i] != "")
      bodyDom.push(<p className="py-4">{paragraphs[i]}</p>);
    //return `<p>${paragraphs[i]}</p>`;
  }
  return <div className="font-normal">{bodyDom}</div>;
};

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
    geomodifier,
    address,
    c_bannerPhoto,
    c_intentPageContent,
    c_intentPageSubheading,
    c_parentLocation,
  } = document;

  const breadcrumbLinks = [
    "All Stores",
    address?.region,
    address?.city,
    address?.line1,
  ];

  let tabIndexInput = 0;
  const idString = "" + id;
  if (idString.endsWith("intent-1")) {
    tabIndexInput = 1;
  } else if (idString.endsWith("intent-2")) {
    tabIndexInput = 2;
  } else if (idString.endsWith("intent-3")) {
    tabIndexInput = 3;
  }

  return (
    <>
      <PageLayout
        _site={_site}
        c_siteLogo={_site.c_siteLogo}
        includeSearchHeader={true}
      >
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
          <div className="mx-4 my-4">
            <div className="py-4">
              <LocationIntentLinks
                id={c_parentLocation && c_parentLocation[0].id}
                tabIndex={tabIndexInput}
              />
            </div>
            <div className="relative bg-gray-900">
              <div className="relative h-80 overflow-hidden bg-indigo-600 md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
                <img
                  className="h-full w-full object-cover"
                  src={c_bannerPhoto && c_bannerPhoto.url}
                  alt=""
                />
                <svg
                  viewBox="0 0 926 676"
                  aria-hidden="true"
                  className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
                >
                  <path
                    fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
                    fillOpacity=".4"
                    d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
                  />
                  <defs>
                    <linearGradient
                      id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
                      x1="926.392"
                      x2="-109.635"
                      y1=".176"
                      y2="321.024"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#776FFF" />
                      <stop offset={1} stopColor="#FF4694" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
                <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
                  <h2 className="text-lg font-semibold leading-7 text-brand-primary">
                    NWC - {geomodifier}
                  </h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {name} at NWC
                  </p>
                  <p className="mt-6 text-lg leading-7 text-gray-300">
                    {c_intentPageSubheading}
                  </p>
                  <div className="mt-8">
                    <a
                      href="#"
                      className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white">
              <div className="mx-auto max-w-xl px-4 pt-8 sm:px-6 lg:max-w-7xl lg:px-8 pb-16">
                {renderPostContent(c_intentPageContent)}
              </div>
            </div>
          </div>
        </div>
        b{" "}
        <div className="initLoads block my-12">
          <FeaturedProducts
            initialVerticalKey={["products"]}
            initialNames={["Products"]}
          />
        </div>
        <LocationAboutSection
          geomodifier={geomodifier}
          description={c_parentLocation[0].description}
          geocodedCoordinate={c_parentLocation[0].geocodedCoordinate}
        />
      </PageLayout>
    </>
  );
};

export default Location;
