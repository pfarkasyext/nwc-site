import * as React from "react";
import Cta from "../components/cta";
import SearchHeader from "./search-header"
import { provideHeadless, SearchHeadlessProvider, SandboxEndpoints } from "@yext/search-headless-react";

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
    label: "Stores",
    url: "#",
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

const Header = (props: any) => {
  const { _site, c_siteLogoUrl } = props;
  
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));
  
  return (
    <div className="bg-brand-primary-dark min-h-[88px] px-6 py-6">
      <div className="centered-container">
        <nav className="py-6 flex items-center justify-between">
          <div className="flex gap-x-6 items-center">
            <a href="#">
              <img
                src="/src/assets/images/nwc-logo.png"
                width="150px"
                height="auto"
              ></img>
            </a>
            <div className="flex gap-x-4 text-base font-semibold text-body text-white">
              {linkDoms}
            </div>
          </div>
          <div className="space-x-5"></div>
          <SearchHeadlessProvider searcher={searcher}>
            <SearchHeader />
          </SearchHeadlessProvider>
          <div className="flex gap-x-4">
            <div className=" h-12 pt-4 ">
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
