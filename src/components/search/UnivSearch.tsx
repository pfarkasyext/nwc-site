import {
  provideHeadless,
  useSearchActions,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import {
  ResultsCount,
  SearchBar,
  UniversalResults,
  SpellCheck,
  DirectAnswer,
  StandardCard,
  SectionProps,
  DropdownItem,
  FocusedItemData,
  RenderEntityPreviews,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect, useState } from "react";
import searchConfig from "./searchConfig";
import { TemplateRenderProps } from "@yext/pages";
import LocationCard from "../cards/LocationCard";
import ProductCard from "../cards/ProductCard";
import HelpArticleCard from "../cards/HelpArticleCard";
import Product from "../../types/products";

export type ParamTypes = {
  id: string;
};

const UnivSearch = ({ document }: TemplateRenderProps) => {
  const searchActions = useSearchActions();
  const { _site } = document;
  const [searchTerm, setSeachTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // const HelpArticleCard = (props: CardProps<any>) => {
  //   const { result } = props;
  //   return <div className="border text-s">{result.name}</div>;
  // };

  const GridSection = ({ results, CardComponent, header }: SectionProps) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div className="">{header}</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 grid-cols-1">
          {results.map((r, index) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };

  const BannerSection = ({ results, CardComponent }: SectionProps) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div className="">
          {results.map((r, index) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchTerm = urlParams.get("query");
    searchTerm && searchActions.setQuery(searchTerm);
    searchActions.executeUniversalQuery();
  });

  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "visual-autocomplete",
  });
  const handleSearch = (e: any) => {
    setSeachTerm(e.query);
    searchActions.setUniversal();
    searchActions.executeUniversalQuery().then(() => setLoading(false));
  };

  const renderEntityPreviews: RenderEntityPreviews = (
    autocompleteLoading: boolean,
    verticalKeyToResults: Record<string, VerticalResultsData>,
    dropdownItemProps: {
      onClick: (
        value: string,
        _index: number,
        itemData?: FocusedItemData
      ) => void;
      ariaLabel: (value: string) => string;
    }
  ): JSX.Element | null => {
    const productResults = verticalKeyToResults["products"]?.results.map(
      (result) => result.rawData
    ) as unknown as Product[];

    return productResults ? (
      <div className="grid grid-cols-4 px-8">
        {productResults.map((result) => (
          <DropdownItem
            key={result.id}
            value={result.name}
            onClick={() => history.pushState(null, "", `/product/${result.id}`)}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <DropdownItem
              key={result.id}
              value={result.name}
              ariaLabel={dropdownItemProps.ariaLabel}
            >
              <a href={result.slug}>
                {result.photoGallery && (
                  <img
                    src={result.photoGallery[0].image.url}
                    alt=""
                    className="h-full w-32 mx-auto"
                  />
                )}
                <div className="text-sm">{result.name}</div>
              </a>
            </DropdownItem>
          </DropdownItem>
        ))}
      </div>
    ) : null;
  };
  return (
    <div className="mt-6">
      <SearchBar
        onSearch={(e) => handleSearch(e)}
        hideRecentSearches={true}
        visualAutocompleteConfig={{
          renderEntityPreviews: renderEntityPreviews,
          entityPreviewSearcher: entityPreviewSearcher,
          includedVerticals: ["products", "brands"],
          universalLimit: { products: 4 },
          entityPreviewsDebouncingTime: 500,
        }}
      />
      <div className="mt-8">
        <div className="">
          <SpellCheck />
          <DirectAnswer customCssClasses={{}} />
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
              viewAllButton: false,
            },
            promo_banner: {
              CardComponent: StandardCard,
              SectionComponent: BannerSection,
              label: "",
              viewAllButton: false,
            },
            track: {
              CardComponent: StandardCard,
              SectionComponent: BannerSection,
              label: "",
              viewAllButton: false,
            },
            pinned_banner: {
              CardComponent: StandardCard,
              SectionComponent: BannerSection,
              label: "",
              viewAllButton: false,
            },
          }}
        />
      </div>
    </div>
  );
};

export default UnivSearch;
