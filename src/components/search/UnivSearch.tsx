import {
  provideHeadless,
  Result,
  useSearchActions,
  useSearchState,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import {
  CardProps,
  RenderEntityPreviews,
  FocusedItemData,
  ResultsCount,
  SearchBar,
  UniversalResults,
  SpellCheck,
  DirectAnswer,
  CardComponent,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect, useState } from "react";
import searchConfig from "./searchConfig";
import classNames from "classnames";
import Product from "../../types/products";
import { TemplateRenderProps } from "@yext/pages";
import LocationCard from "../LocationCard";
import ProductCard from "../ProductCard";
export type ParamTypes = {
  id: string;
};

const UnivSearch = ({ document }: TemplateRenderProps) => {
  const searchActions = useSearchActions();
  const { _site } = document;
  const [searchTerm, setSeachTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const HelpArticleCard = (props: CardProps<any>) => {
    const { result } = props;
    return <div className="border text-s">{result.name}</div>;
  };

  const GridSection = ({ results, CardComponent, header }: SectionProps) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div className="">{header}</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 grid-cols-1">
          {results.map((r) => (
            <CardComponent result={r} />
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get('search');
    searchTerm && searchActions.setQuery(searchTerm);
    searchActions.executeUniversalQuery();
  }, []);

  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "visual-autocomplete",
  });

  // const renderEntityPreviews: RenderEntityPreviews = (
  //   autocompleteLoading,
  //   verticalKeyToResults: Record<string, VerticalResultsData>,
  //   dropdownItemProps: {
  //     onClick: (
  //       value: string,
  //       _index: number,
  //       itemData?: FocusedItemData
  //     ) => void;
  //     ariaLabel: (value: string) => string;
  //   }
  // ): any => {
  //   const productResults = verticalKeyToResults["products"]
  //     ?.results as unknown as Result<Product>[];
  //   const brandResults = verticalKeyToResults["brands"]
  //     ?.results as unknown as Result<Ce_brand>[];
  //   const orderedKeys = Object.keys(verticalKeyToResults);
  //   const totalResultCount = Object.values(verticalKeyToResults).reduce(
  //     (acc, vertical) => acc + vertical.results.length,
  //     0
  //   );
  //   return productResults ? (
  //     <div
  //       className={classNames("flex flex-col gap-2", {
  //         "opacity-50": autocompleteLoading,
  //       })}
  //     >
  //       {orderedKeys.map((key) => {
  //         if (key === "brands" && brandResults) {
  //           return (
  //             <div key="brands" className="p-4 border-right-2">
  //               <p className="mb-4 font-bold">Brands</p>
  //               {brandResults.map((result) => (
  //                 <div key={result.id} className="mb-4">
  //                   {/* <a
  //                     className=" text-sm hover:underline"
  //                     href={result?.rawData?.slug}
  //                   > */}
  //                   {result.name}
  //                   {/* </a> */}
  //                 </div>
  //               ))}
  //             </div>
  //           );
  //         }
  //         if (key === "products" && brandResults) {
  //           return (
  //             <div key="products" className="p-4 border-right-2">
  //               <p className="mb-4 font-bold">Products</p>
  //               <div className="grid grid-cols-4 gap-4">
  //                 {productResults.map((result) => (
  //                   <div key={result.id} className="mb-4">
  //                     {result.rawData.primaryPhoto && (
  //                       <img
  //                         src={result.rawData.primaryPhoto.image.url}
  //                         alt=""
  //                         className="h-32 w-32 mx-auto"
  //                       />
  //                     )}
  //                     <div className="text-sm">{result.name}</div>
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           );
  //         }
  //       })}
  //     </div>
  //   ) : null;
  // };

  const handleSearch = (e: any) => {
    setSeachTerm(e.query);
    searchActions.setUniversal();
    searchActions.executeUniversalQuery().then(() => setLoading(false));
  };

  return (
    <div className="mt-6">
      <SearchBar
        onSearch={(e) => handleSearch(e)}
        hideRecentSearches={false}
        // visualAutocompleteConfig={{
        // entityPreviewSearcher: entityPreviewSearcher,
        // includedVerticals: ["products", "brands"],
        // universalLimit: { products: 4 },
        // entityPreviewsDebouncingTime: 500,
        // }}
      />
      <div className="mt-8">
        <div className="">
          <SpellCheck />
          <DirectAnswer />
          <ResultsCount />
        </div>
        <UniversalResults
          verticalConfigMap={{
            products: {
              CardComponent: ProductCard,
              SectionComponent: GridSection,
              label: "Products",
              viewAllButton: true,
            },
            locations: {
              CardComponent: LocationCard,
              //   SectionComponent: GridSection,
              label: "Locations",
              viewAllButton: true,
            },
            help_articles: {
              CardComponent: HelpArticleCard,
              //   SectionComponent: GridSection,
              label: "Help Articles",
              viewAllButton: true,
            },
          }}
        />
      </div>
    </div>
  );
};

export default UnivSearch;
