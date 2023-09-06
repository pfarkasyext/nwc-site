// locator.tsx

import * as React from "react";
import SearchHeroBanner from "../components/search-hero-banner";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import { provideHeadless } from "@yext/search-headless-react";
import { FeaturedProducts } from "../components/search/FeaturedProducts";
import searchConfig from "../components/search/searchConfig";

export const getPath: GetPath<TemplateProps> = () => {
  return `home`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "NWC Locations",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const offers = [
  {
    name: "Download the app",
    description: "Get an exclusive $5 off code",
    href: "#",
  },
  {
    name: "Return when you're ready",
    description: "60 days of free returns",
    href: "#",
  },
  {
    name: "Sign up for our newsletter",
    description: "15% off your first order",
    href: "#",
  },
];
const collections = [
  {
    name: "Health Boosting",
    description: "Vitamins and Minerals",
    imageSrc:
      "https://www.nia.nih.gov/sites/default/files/2017-08/vitamins-meta.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
  },
  {
    name: "Performance Boosting",
    description: "Sports Nutrition",
    imageSrc:
      "https://nypost.com/wp-content/uploads/sites/2/2023/02/NYPICHPDPICT000007191289.jpg?w=1024",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
  },
  {
    name: "All Natural",
    description: "Herbs and Natural Remedies",
    imageSrc:
      "https://www.lancastergeneralhealth.org/-/media/images/lancaster%20general/images/healthhub/healthhubpost/5%20reasons%20to%20be%20cautious%20when%20considering%20herbal%20remedies.ashx",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
  },
];
const testimonials = [
  {
    id: 1,
    quote:
      "My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!",
    attribution: "Sarah Peters, New Orleans",
  },
  {
    id: 2,
    quote:
      "I had to return a purchase. The whole process was so simple that I ended up ordering two new items!",
    attribution: "Kelly McPherson, Chicago",
  },
  {
    id: 3,
    quote:
      "If you're looking for high quality supplements to improve your performance, NWC is the place!",
    attribution: "Chris Paul, Phoenix",
  },
];

const Home: Template<TemplateRenderProps> = ({ document }) => {
  const { _site } = document;
  return (
    <>
      <PageLayout
        _site={_site}
        c_siteLogo={_site.c_siteLogo}
        includeSearchHeader={false}
      >
        <div className="bg-white">
          <main>
            {/* Hero */}
            <div className="flex flex-col border-b border-gray-200 lg:border-0">
              <nav aria-label="Offers" className="order-last lg:order-first">
                <div className="mx-auto max-w-7xl lg:px-8">
                  <ul
                    role="list"
                    className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-x lg:divide-y-0"
                  >
                    {offers.map((offer) => (
                      <li key={offer.name} className="flex flex-col">
                        <a
                          href={offer.href}
                          className="relative flex flex-1 flex-col justify-center bg-white px-4 py-6 text-center focus:z-10"
                        >
                          <p className="text-sm text-gray-500">{offer.name}</p>
                          <p className="font-semibold text-gray-900">
                            {offer.description}
                          </p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
              <SearchHeroBanner />
            </div>

            {/* Trending products */}
            <div className="initLoads block my-12">
              <FeaturedProducts
                initialVerticalKey={["products"]}
                initialNames={["Products"]}
              />
            </div>

            {/* Collections */}
            <section
              aria-labelledby="collections-heading"
              className="bg-gray-100"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                  <h2
                    id="collections-heading"
                    className="text-2xl font-bold text-gray-900"
                  >
                    Collections
                  </h2>

                  <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                    {collections.map((collection) => (
                      <div key={collection.name} className="group relative">
                        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                          <img
                            src={collection.imageSrc}
                            alt={collection.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <h3 className="mt-6 text-sm text-gray-500">
                          <a href={collection.href}>
                            <span className="absolute inset-0" />
                            {collection.name}
                          </a>
                        </h3>
                        <p className="text-base font-semibold text-gray-900">
                          {collection.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Sale and testimonials */}
            <div className="relative overflow-hidden">
              {/* Decorative background image and gradient */}
              <div aria-hidden="true" className="absolute inset-0">
                <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
                  <img
                    src="https://domf5oio6qrcr.cloudfront.net/medialibrary/2293/l0908b16207233934035.jpg"
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-0 bg-white bg-opacity-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
              </div>

              {/* Sale */}
              <section
                aria-labelledby="sale-heading"
                className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
              >
                <div className="mx-auto max-w-2xl lg:max-w-none">
                  <h2
                    id="sale-heading"
                    className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
                  >
                    Get 25% off during our one-time sale
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
                    Most of our products are limited releases that won't come
                    back. Get your favorite items while they're in stock.
                  </p>
                  <a
                    href="#"
                    className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 px-8 py-3 font-medium text-white hover:bg-gray-800 sm:w-auto"
                  >
                    Get access to our one-time sale
                  </a>
                </div>
              </section>

              {/* Testimonials */}
              <section
                aria-labelledby="testimonial-heading"
                className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
              >
                <div className="mx-auto max-w-2xl lg:max-w-none">
                  <h2
                    id="testimonial-heading"
                    className="text-2xl font-bold tracking-tight text-gray-900"
                  >
                    What are people saying?
                  </h2>

                  <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
                    {testimonials.map((testimonial) => (
                      <blockquote
                        key={testimonial.id}
                        className="sm:flex lg:block"
                      >
                        <svg
                          width={24}
                          height={18}
                          viewBox="0 0 24 18"
                          aria-hidden="true"
                          className="flex-shrink-0 text-gray-300"
                        >
                          <path
                            d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                            fill="currentColor"
                          />
                        </svg>
                        <div className="mt-8 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-10">
                          <p className="text-lg text-gray-600">
                            {testimonial.quote}
                          </p>
                          <cite className="mt-4 block font-semibold not-italic text-gray-900">
                            {testimonial.attribution}
                          </cite>
                        </div>
                      </blockquote>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
