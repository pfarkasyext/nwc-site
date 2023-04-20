// locator.tsx

import * as React from "react";
import SearchHeroBanner from "../components/search-hero-banner";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import {
  provideHeadless,
  SandboxEndpoints,
  SearchHeadlessProvider,
  useSearchActions,
} from "@yext/search-headless-react";

export const getPath: GetPath<TemplateProps> = () => {
  return `home`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "NWC Locations",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const apiKey = "d2471212e8121452a0204c59c9a08bd4";
  const experienceKey = "answers";
  const experienceVersion = "PRODUCTION";
  const locale = "en";

  const searcher = provideHeadless({
    apiKey: apiKey,
    experienceKey: experienceKey,
    //verticalKey: "Your Vertical Key",
    locale: "en",
    endpoints: SandboxEndpoints,
  });

const Home: Template<TemplateRenderProps> = ({
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
    <PageLayout
      _site={_site}
      c_siteLogo={_site.c_siteLogo}
      includeSearchHeader={false}
    >
      <SearchHeadlessProvider searcher={searcher}>
        <SearchHeroBanner />
      </SearchHeadlessProvider>
      <div className="centered-container">
          <div className="section">
            (Featured Products)
          </div>
      </div>
    </PageLayout>
  );
};

export default Home;
