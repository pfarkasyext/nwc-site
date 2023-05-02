// locator.tsx

import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import StoreLocator from "../components/StoreLocator";
import {
  provideHeadless,
  SandboxEndpoints,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";

export const getPath: GetPath<TemplateProps> = () => {
  return `locations`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "NWC Locations",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const searcher = provideHeadless({
  apiKey: "d2471212e8121452a0204c59c9a08bd4",
  // make sure your experience key matches what you see in the platform
  experienceKey: "answers",
  locale: "en",
  endpoints: SandboxEndpoints,
  verticalKey: "locations",
});

const Locator: Template<TemplateRenderProps> = ({
    relativePrefixToRoot,
    path,
    document,
  }) => {
    const {
        _site,
        name,
        address,
        geomodifier,
        openTime,
        hours,
        mainPhone,
        geocodedCoordinate,
        services,
        description,
    } = document;

  return (
    <PageLayout _site={_site} c_siteLogo={_site.c_siteLogo}>
      <SearchHeadlessProvider searcher={searcher}>
        <div className="mx-auto max-w-7xl px-4">
          <StoreLocator />
        </div>
      </SearchHeadlessProvider>
    </PageLayout>
  );
};

export default Locator;