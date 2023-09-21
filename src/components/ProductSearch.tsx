// src/components/StoreLocator.tsx

import * as React from "react";
import {
  VerticalResults,
  SearchBar,
  SpellCheck,
  ResultsCount,
  Pagination,
  Facets,
  StandardFacet,
  RenderEntityPreviews,
  DropdownItem,
  FocusedItemData,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import {
  Matcher,
  provideHeadless,
  useSearchActions,
  useSearchState,
  VerticalResults as VerticalResultsData,
} from "@yext/search-headless-react";
import ProductCard from "./cards/ProductCard";
import { SortDropdown } from "./search/SortDropdown";
import Product from "../types/products";
import searchConfig from "./search/searchConfig";

type ProductSearchProps = {
  headerLabel?: string;
  searchBarPlaceholder?: string;
  facetField?: string;
  facetValue?: string;
};

type InitialSearchState = "not started" | "started" | "complete";

const ProductSearch = ({
  headerLabel,
  searchBarPlaceholder,
  facetField,
  facetValue,
}: ProductSearchProps) => {
  const searchActions = useSearchActions();

  const [initialSearchState, setInitialSearchState] =
    useState<InitialSearchState>("not started");

  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  useEffect(() => {
    searchActions.setVertical("products");
    facetField &&
      searchActions.executeVerticalQuery().then(() => {
        searchActions.setFacetOption(
          facetField,
          {
            value: facetValue!,
            matcher: Matcher.Equals,
          },
          true
        );
        searchActions.executeVerticalQuery();
      });
    searchActions.executeVerticalQuery();
    setInitialSearchState("started");
  }, []);

  useEffect(() => {
    if (!searchLoading && initialSearchState === "started") {
      setInitialSearchState("complete");
    }
  }, [searchLoading]);
  const entityPreviewSearcher = provideHeadless({
    ...searchConfig,
    headlessId: "visual-autocomplete",
  });

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
            onClick={() => history.pushState(null, "", `/${result.slug}`)}
            ariaLabel={dropdownItemProps.ariaLabel}
          >
            <DropdownItem
              key={result.id}
              value={result.name}
              ariaLabel={dropdownItemProps.ariaLabel}
            >
              <a href={result.slug}>
                {result.primaryPhoto && (
                  <img
                    src={result.primaryPhoto.image.url}
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
    <>
      <div className="px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col">
          <div className="text-2xl font-semibold my-4 text-center">
            {headerLabel}
          </div>
          <SearchBar
            placeholder={searchBarPlaceholder}
            hideRecentSearches={true}
            visualAutocompleteConfig={{
              renderEntityPreviews: renderEntityPreviews,
              entityPreviewSearcher: entityPreviewSearcher,
              includedVerticals: ["products", "brands"],
              universalLimit: { products: 4 },
              entityPreviewsDebouncingTime: 500,
            }}
          />
          <SpellCheck />
          <ResultsCount />
          <div className="flex">
            <div className="mr-5 w-56 shrink-0">
              <div className="flex flex-col rounded border bg-zinc-100 p-4 shadow-sm">
                <SortDropdown />
                <Facets>
                  <StandardFacet
                    fieldId="c_linkedDepartment.name"
                    label="Department"
                  />
                  <StandardFacet
                    fieldId="c_linkedCategories.name"
                    label="Category"
                  />
                  <StandardFacet
                    fieldId="c_linkedSubcategories.name"
                    label="Subcategory"
                  />
                  <StandardFacet fieldId="brand" label="Brand" />
                </Facets>
              </div>
            </div>
            <VerticalResults
              customCssClasses={{
                verticalResultsContainer:
                  "grid md:grid-cols-2 lg:grid-cols-4 gap-4 grid-cols-1",
              }}
              CardComponent={ProductCard}
              displayAllOnNoResults={false}
            />
          </div>
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default ProductSearch;
