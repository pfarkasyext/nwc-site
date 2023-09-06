import * as React from "react";
import { SearchBar } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { provideHeadless, useSearchActions } from "@yext/search-headless-react";
import searchConfig from "./search/searchConfig";
import TypedAnimation from "./TypedAnimation";
const SearchBarHead = () => {
  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setVertical("locations");
  }, []);
  return (
    <>
      <div className="w-4/12 relative z-50">
        <TypedAnimation />
      </div>
    </>
  );
};

export default SearchBarHead;
