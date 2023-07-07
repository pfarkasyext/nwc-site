// src/components/StoreLocator.tsx

import * as React from "react";
import {
  MapboxMap,
  FilterSearch,
  OnSelectParams,
  VerticalResults,
  StandardCard,
  getUserLocation,
  OnDragHandler,
  SearchBar,
  SpellCheck,
  ResultsCount,
  Pagination,
  Facets,
  StandardFacet,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import {
  Matcher,
  SandboxEndpoints,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import ProductCard from "./cards/ProductCard";
import { SortDropdown } from "./search/SortDropdown";

type ProductSearchProps = {
  headerLabel?: string;
  searchBarPlaceholder?: string;
};

type InitialSearchState = "not started" | "started" | "complete";

const ProductSearch = ({
  headerLabel,
  searchBarPlaceholder
}: ProductSearchProps) => {
  const searchActions = useSearchActions();

  const [initialSearchState, setInitialSearchState] =
    useState<InitialSearchState>("not started");

  const searchLoading = useSearchState((state) => state.searchStatus.isLoading);

  // set search vertical to products, run initial search

  useEffect(() => {
    searchActions.setVertical("products");
    searchActions.executeVerticalQuery();
    setInitialSearchState("started");
  }, []);

  useEffect(() => {
    if (!searchLoading && initialSearchState === "started") {
      setInitialSearchState("complete");
    }
  }, [searchLoading]);

  return (
    <>
      <div className="px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-col">
          <div className="text-2xl font-semibold my-4 text-center">
            {headerLabel}
          </div>
          <SearchBar placeholder={searchBarPlaceholder} />
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
