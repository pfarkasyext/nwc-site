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
import { Fragment, useState } from "react";
import {
  Dialog,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  CurrencyDollarIcon,
  GlobeAmericasIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-product",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "slug",
      "meta",
      "name",
      "brand",
      "richTextDescription",
      "c_cRating",
      "c_cRatingsCount",
      "primaryPhoto",
      "c_oldPrice",
      "c_newPrice",
      "c_cPrice",
      "c_cPromotion",
      "c_productDescription",
      "c_linkedDepartment.name",
      "c_linkedCategories.name",
      "c_linkedSubcategories.name",
      "c_linkedDepartment.landingPageUrl",
      "c_linkedCategories.landingPageUrl",
      "c_linkedSubcategories.landingPageUrl",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["product"],
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Product: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    brand,
    richTextDescription,
    c_cRating,
    c_cRatingsCount,
    primaryPhoto,
    c_cPrice,
    c_cPromotion,
    c_productDescription,
    c_linkedDepartment,
    c_linkedCategories,
    c_linkedSubcategories,
  } = document;

  const product = {
    //name: "Basic Tee",
    //price: "$35",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Women", href: "#" },
      { id: 2, name: "Clothing", href: "#" },
    ],
    images: [
      {
        id: 1,
        imageSrc:
          "https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg",
        imageAlt: "Back of women's Basic Tee in black.",
        primary: true,
      },
    ],
    colors: [
      { name: "Black", bgColor: "bg-gray-900", selectedColor: "ring-gray-900" },
      {
        name: "Heather Grey",
        bgColor: "bg-gray-400",
        selectedColor: "ring-gray-400",
      },
    ],
    sizes: [
      { name: "15", inStock: true },
      { name: "25", inStock: true },
      { name: "40", inStock: true },
      { name: "65", inStock: true },
      { name: "100", inStock: true },
      { name: "250", inStock: false },
    ],
    description: `
      <p>The Basic tee is an honest new take on a classic. The tee uses super soft, pre-shrunk cotton for true comfort and a dependable fit. They are hand cut and sewn locally, with a special dye technique that gives each tee it's own look.</p>
      <p>Looking to stock your closet? The Basic tee also comes in a 3-pack or 5-pack at a bundle discount.</p>
    `,
    details: [
      "High quality ingredients",
      "Ethically manufactured",
      "Clinically proven",
      "Expert approved",
    ],
  };

  const policies = [
    {
      name: "International delivery",
      icon: GlobeAmericasIcon,
      description: "Get your order in 2 weeks",
    },
    {
      name: "Loyalty rewards",
      icon: CurrencyDollarIcon,
      description: "It pays to join!",
    },
  ];
  const reviews = {
    average: 3.9,
    totalCount: 512,
    featured: [
      {
        id: 1,
        title: "Can't say enough good things",
        rating: 5,
        content: `
          <p>I was really pleased with the overall shopping experience. My order even included a little personal, handwritten note, which delighted me!</p>
          <p>The product quality is amazing, it looks and feel even better than I had anticipated. Brilliant stuff! I would gladly recommend this store to my friends. And, now that I think of it... I actually have, many times!</p>
        `,
        author: "Risako M",
        date: "May 16, 2021",
        datetime: "2021-01-06",
      },
      // More reviews...
    ],
  };
  const relatedProducts = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg",
      imageAlt: "Front of men's Basic Tee in white.",
      price: "$35",
      color: "Aspen White",
    },
    // More products...
  ];

  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  // //build initial array of breadcrumb objects
  // const breadcrumbLinks = [];
  // if (c_linkedDepartment[0] !== null) {
  //   breadcrumbLinks.push(<a href={c_linkedDepartment[0].landingPageUrl} className="text-brand-primary hover:text-brand-hover">{c_linkedDepartment[0].name}</a>)
  // }
  // if (c_linkedCategories[0] !== null) {
  //   breadcrumbLinks.push(<a href={c_linkedCategories[0].landingPageUrl} className="text-brand-primary hover:text-brand-hover">{c_linkedCategories[0].name}</a>)
  // }
  // if (c_linkedSubcategories[0] !== null) {
  //   breadcrumbLinks.push(<a href={c_linkedSubcategories[0].landingPageUrl} className="text-brand-primary hover:text-brand-hover">{c_linkedSubcategories[0].name}</a>)
  // }

  // //loop through array and build out render object
  // let breadcrumbs = [];
  // for (let i = 0; i < breadcrumbLinks.length; i++) {
  //   if (i !== 0 ) breadcrumbs.push(<>&nbsp;&nbsp;&nbsp;&rarr;&nbsp;&nbsp;&nbsp;</>);
  //   breadcrumbs.push(breadcrumbLinks[i]);
  // }

  // MODEL:
  // <>
  //   <a href="#" className="text-brand-primary hover:text-brand-hover">{c_linkedDepartment[0].name}</a>
  //   &nbsp;&nbsp;&nbsp;&rarr;&nbsp;&nbsp;&nbsp;
  //   <a href="#" className="text-brand-primary hover:text-brand-hover">{c_linkedCategories[0].name}</a>
  //   &nbsp;&nbsp;&nbsp;&rarr;&nbsp;&nbsp;&nbsp;
  //   <a href="#" className="text-brand-primary hover:text-brand-hover">{c_linkedSubcategories[0].name}</a>
  // </>

  return (
    <>
      <PageLayout _site={_site} c_siteLogo={_site.c_siteLogo}>
        {/* <div className="centered-container">
          <div className="section flex">
            <div className="w-2/5 h-96 flex justify-center items-center">
              <img className="max-h-96" src={c_cImageURLText}></img>
            </div>
            <div className="w-3/5 h-96 flex flex-col justify-center p-6">
              <div className="font-bold text-2xl text-brand-primary">
                {name}
              </div>
              <div className="text-2xl">${c_cPrice}</div>
              <div className="pt-4">{richTextDescription}</div>
              <div className="font-bold pt-4">{c_cPromotion}</div>
            </div>
          </div>
          <SearchHeadlessProvider searcher={searcher}>
            <div className="initLoads block">
              <FeaturedProducts
                initialVerticalKey={["products"]}
                initialNames={["Products"]}
              />
            </div>
          </SearchHeadlessProvider>
        </div> */}
        <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
          {/* <div className="text-sm font-medium">{breadcrumbs}</div> */}
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5 lg:col-start-8">
              <div className="flex justify-between">
                <h1 className="text-xl font-medium text-gray-900">
                  <div>{name}</div>
                  <div className="text-sm italic">{brand}</div>
                </h1>
                <p className="text-xl font-medium text-gray-900">${c_cPrice}</p>
              </div>
              {/* Reviews */}
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    {reviews.average}
                    <span className="sr-only"> out of 5 stars</span>
                  </p>
                  <div className="ml-1 flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-yellow-400"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <div
                    aria-hidden="true"
                    className="ml-4 text-sm text-gray-300"
                  >
                    ·
                  </div>
                  <div className="ml-4 flex">
                    <a
                      href="#"
                      className="text-sm font-medium text-brand-primary hover:text-brand-hover"
                    >
                      See all {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-1 lg:grid-rows-1 lg:gap-8">
                {/* {product.images.map((image) => (
                <img
                  key={image.id}
                  src={image.imageSrc}
                  alt={image.imageAlt}
                  className={classNames(
                    image.primary ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                    'rounded-lg'
                  )}
                />
              ))} */}
                <img
                  src={primaryPhoto.image.url}
                  // className={classNames(
                  //   image.primary ? 'lg:col-span-2 lg:row-span-2' : 'hidden lg:block',
                  //   'rounded-lg'
                  // )}
                />
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              <form>
                {/* Color picker */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900">
                    Varieties
                  </h2>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {product.colors.map((color) => (
                        <RadioGroup.Option
                          key={color.name}
                          value={color}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedColor,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.name}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.bgColor,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Size picker */}
                <div className="mt-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-medium text-gray-900">Size</h2>
                    <a
                      href="#"
                      className="text-sm font-medium text-brand-primary hover:text-brand-hover"
                    >
                      See dosage recommendations
                    </a>
                  </div>

                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-2"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                      {product.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size.name}
                          value={size}
                          className={({ active, checked }) =>
                            classNames(
                              size.inStock
                                ? "cursor-pointer focus:outline-none"
                                : "cursor-not-allowed opacity-25",
                              active
                                ? "ring-2 ring-indigo-500 ring-offset-2"
                                : "",
                              checked
                                ? "border-transparent bg-brand-primary text-white hover:bg-brand-hover"
                                : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
                              "flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1"
                            )
                          }
                          disabled={!size.inStock}
                        >
                          <RadioGroup.Label as="span">
                            {size.name}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-brand-cta px-8 py-3 text-base font-medium text-white hover:bg-brand-cta-hover focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
              </form>

              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Description
                </h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  {c_productDescription}
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-sm font-medium text-gray-900">
                  Fabric &amp; Care
                </h2>

                <div className="prose prose-sm mt-4 text-gray-500">
                  <ul role="list">
                    {product.details.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policies */}
              <section aria-labelledby="policies-heading" className="mt-10">
                <h2 id="policies-heading" className="sr-only">
                  Our Policies
                </h2>

                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {policies.map((policy) => (
                    <div
                      key={policy.name}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
                    >
                      <dt>
                        <policy.icon
                          className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="mt-4 text-sm font-medium text-gray-900">
                          {policy.name}
                        </span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-500">
                        {policy.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>

          {/* Reviews */}
          <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
            <h2
              id="reviews-heading"
              className="text-lg font-medium text-gray-900"
            >
              Recent reviews
            </h2>

            <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
              {reviews.featured.map((review) => (
                <div
                  key={review.id}
                  className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8"
                >
                  <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
                    <div className="flex items-center xl:col-span-1">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              review.rating > rating
                                ? "text-yellow-400"
                                : "text-gray-200",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="ml-3 text-sm text-gray-700">
                        {review.rating}
                        <span className="sr-only"> out of 5 stars</span>
                      </p>
                    </div>

                    <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
                      <h3 className="text-sm font-medium text-gray-900">
                        {review.title}
                      </h3>

                      <div
                        className="mt-3 space-y-6 text-sm text-gray-500"
                        dangerouslySetInnerHTML={{ __html: review.content }}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
                    <p className="font-medium text-gray-900">{review.author}</p>
                    <time
                      dateTime={review.datetime}
                      className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0"
                    >
                      {review.date}
                    </time>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related products */}
          <section aria-labelledby="related-heading" className="mt-16 sm:mt-24">
            {/* <h2
              id="related-heading"
              className="text-lg font-medium text-gray-900"
            >
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="group relative">
                  <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      src={relatedProduct.imageSrc}
                      alt={relatedProduct.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={relatedProduct.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {relatedProduct.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {relatedProduct.color}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {relatedProduct.price}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
            <SearchHeadlessProvider searcher={searcher}>
              <div className="initLoads block my-12">
                <FeaturedProducts
                  initialVerticalKey={["products"]}
                  initialNames={["Products"]}
                />
              </div>
            </SearchHeadlessProvider>
          </section>
        </main>
      </PageLayout>
    </>
  );
};

export default Product;
