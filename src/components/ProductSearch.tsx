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
  StandardFacets,
  NumericalFacets,
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
import ProductCard from "./ProductCard";

type InitialSearchState = "not started" | "started" | "complete";

const ProductSearch = (): JSX.Element => {
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
          <SearchBar placeholder="Search NWC products" />
          {/* ...and ends here */}
          <SpellCheck />
          <ResultsCount />
          {/* <div className="flex">
            <div className="mr-5 w-56 shrink-0">
              <div className="flex flex-col rounded border bg-zinc-100 p-4 shadow-sm">
                <StandardFacets />
              </div>
            </div> */}
            <VerticalResults
              customCssClasses={{
                verticalResultsContainer:
                  "grid md:grid-cols-2 lg:grid-cols-4 gap-4 grid-cols-1",
              }}
              CardComponent={ProductCard}
              displayAllOnNoResults={false}
            />
          {/* </div> */}
        </div>
        <Pagination />
      </div>
    </>
  );
};

export default ProductSearch;
