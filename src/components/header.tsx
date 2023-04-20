import * as React from "react";
import Cta from "../components/cta";
import SearchHeader from "./search-header"
import { provideHeadless, SearchHeadlessProvider, SandboxEndpoints } from "@yext/search-headless-react";
import { Image } from "@yext/pages/components"

type Link = {
  label: string;
  url: string;
};

const apiKey = "7e586e5de90ad8889acbabca5bc57f32";
const experienceKey = "find-a-doctor";
const experienceVersion = "PRODUCTION";
const locale = "en";

const searcher = provideHeadless({
  apiKey: apiKey,
  experienceKey: experienceKey,
  //verticalKey: "Your Vertical Key",
  locale: "en",
  endpoints: SandboxEndpoints,
});

const links: Link[] = [
  {
    label: "Find a Store",
    url: "/locator",
  },
  {
    label: "Store Directory",
    url: "/",
  },
  {
    label: "Products",
    url: "#",
  },
  {
    label: "FAQs",
    url: "#",
  },
];

const renderSearchHeader = (includeSearchHeader: boolean) => {
  if (includeSearchHeader == false) {
    return "";
  } else {
    return (
      <SearchHeadlessProvider searcher={searcher}>
          <SearchHeader />
      </SearchHeadlessProvider>
    );
  }
}

const Header = (props: any) => {
  const { _site, c_siteLogoUrl, includeSearchHeader } = props;
  
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_self" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));
  
  return (
    <div className="bg-brand-primary-dark h-fit px-6 py-6">
      <div className="centered-container">
        <nav className="py-6 flex items-center justify-between">
          <div className="flex gap-x-6 items-center mr-2">
            <a href="/home">
              <img
                src={c_siteLogoUrl}
                width="150px"
                height="auto"
              ></img>
            </a>
            <div className="flex gap-x-4 text-base font-semibold text-body text-white">
              {linkDoms}
            </div>
          </div>
          <div className="space-x-5"></div>
          {renderSearchHeader(includeSearchHeader)}
          <div className="flex gap-x-4 hidden lg:inline">
            <div className=" h-12 pt-4">
              <Cta
                buttonText="Log In"
                url="#"
                style="text-white bg-brand-cta shadow-xl hover:bg-brand-cta-hover py-4"
                target="_self"
              ></Cta>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
