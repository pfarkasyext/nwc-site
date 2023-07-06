// src/templates/search.tsx

import * as React from "react";
import PageLayout from "../components/page-layout";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TemplateProps,
} from "@yext/pages";
import "../index.css";
import {
  SearchHeadlessProvider,
  provideHeadless,
  HeadlessConfig,
  SandboxEndpoints,
} from "@yext/search-headless-react";
import {
  SearchBar,
  StandardCard,
  VerticalResults,
  SpellCheck,
  ResultsCount,
  Pagination,
  StandardFacets,
  NumericalFacets
  } from "@yext/search-ui-react";
  import UnivSearch from "../components/search/UnivSearch";

export const getPath: GetPath<TemplateProps> = () => {
  return "search";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: `NWC Search`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const headlessConfig: HeadlessConfig = {
  apiKey: "d2471212e8121452a0204c59c9a08bd4",
  experienceKey: "answers",
  locale: "en",
  endpoints: SandboxEndpoints,
};

const searcher = provideHeadless(headlessConfig);

const Search: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site
  } = document;

  return (
    <PageLayout _site={_site} c_siteLogo={_site.c_siteLogo} includeSearchHeader={false}>
      <div className="centered-container">
        <SearchHeadlessProvider searcher={searcher}>
          <UnivSearch
            document={document}
            path={""}
            relativePrefixToRoot={""}
            __meta={{
              mode: "development",
              manifest: undefined,
            }}
          />
        </SearchHeadlessProvider>
      </div>
    </PageLayout>
  );
};

export default Search;