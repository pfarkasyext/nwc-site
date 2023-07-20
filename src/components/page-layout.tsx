import * as React from "react";
import Site from "../types/Site";
import Header from "./header";
import Footer from "./footer";
import { HeadlessConfig, SandboxEndpoints, SearchHeadlessProvider, provideHeadless } from "@yext/search-headless-react";

export type KgPic = {
  url: string;
};

type Props = {
  _site: Site;
  c_siteLogo?: KgPic;
  includeSearchHeader?: boolean;
  children?: React.ReactNode;
};

const headlessConfig: HeadlessConfig = {
  apiKey: "d2471212e8121452a0204c59c9a08bd4",
  experienceKey: "answers",
  locale: "en",
  endpoints: SandboxEndpoints,
};

const searcher = provideHeadless(headlessConfig);

const PageLayout = ({
  _site,
  c_siteLogo,
  includeSearchHeader,
  children,
}: Props) => {
  return (
    <div className="min-h-screen">
      <SearchHeadlessProvider searcher={searcher}>
        <Header
          _site={_site}
          c_siteLogoUrl={c_siteLogo?.url}
          includeSearchHeader={includeSearchHeader}
        />
      </SearchHeadlessProvider>

      {children}
      <Footer _site={_site} c_siteLogoUrl={c_siteLogo?.url}></Footer>
    </div>
  );
};

export default PageLayout;
