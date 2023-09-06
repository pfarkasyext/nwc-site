import * as React from "react";
import Site from "../types/Site";
import Footer from "./footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./search/searchConfig";
import Header from "./header";

export type KgPic = {
  url: string;
};

type Props = {
  _site: Site;
  c_siteLogo?: KgPic;
  includeSearchHeader?: boolean;
  children?: React.ReactNode;
};

const searcher = provideHeadless(searchConfig);

const PageLayout = ({
  _site,
  c_siteLogo,
  includeSearchHeader,
  children,
}: Props) => {
  return (
    <SearchHeadlessProvider searcher={searcher}>
      <div className="min-h-screen">
        <Header
          _site={_site}
          c_siteLogoUrl={c_siteLogo?.url}
          includeSearchHeader={includeSearchHeader}
        />

        {children}
        <Footer _site={_site} c_siteLogoUrl={c_siteLogo?.url}></Footer>
      </div>
    </SearchHeadlessProvider>
  );
};

export default PageLayout;
