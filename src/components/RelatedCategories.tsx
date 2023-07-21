import * as React from "react";

type linkedCat = {
  name: string;
  landingPageUrl: string;
  slug: string;
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
                    href={"/" + item.slug}
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
