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
  } from "@yext/search-ui-react";

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
  verticalKey: "faqs",
  endpoints: SandboxEndpoints,
};

const searcher = provideHeadless(headlessConfig);

const Search: Template<TemplateRenderProps> = () => {
  return (
    <PageLayout>

      <SearchHeadlessProvider searcher={searcher}>
        <div className="px-4 py-8">
          <div className="mx-auto flex max-w-5xl flex-col">
            <SearchBar />
            <SpellCheck />
            <ResultsCount />
            <VerticalResults
              CardComponent={StandardCard}
              displayAllOnNoResults={false}
            />
          </div>
          <Pagination />
        </div>
      </SearchHeadlessProvider>

    </PageLayout>
    
  );
};

export default Search;