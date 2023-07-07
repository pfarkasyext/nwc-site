import * as React from "react";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect, useState } from "react";
import Carousel from "./carousel";

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

type linkedCat = {
  name: string;
  landingPageUrl: string;
};

type RelatedCategoriesProps = {
  sectionTitle: string;
  categories: linkedCat[];
};

const RelatedCategories = ({
  sectionTitle,
  categories,
}: RelatedCategoriesProps) => {
  return (
    <>
      <div className="px-4 pt-4 pb-16 bg-gray-100">
        <div className="mx-auto flex max-w-5xl flex-col">
          <div className="text-2xl font-semibold my-4 text-center">{sectionTitle}</div>
          <div className="flex flex-row flex-wrap justify-center mt-6 gap-x-4 gap-y-12">
            {categories &&
              categories.map((item, index) => (
                <div key={index}>
                  <a
                    href={item.landingPageUrl}
                    className="text-white hover:text-brand-hover bg-brand-primary rounded-lg px-8 py-4"
                  >
                    {item.name}
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { RelatedCategories };
