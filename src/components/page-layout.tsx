import * as React from "react";
import Site from "../types/Site";
import Header from "./header";
import Footer from "./footer";

export type KgPic = {
  url: string;
};

type Props = {
  _site: Site;
  c_siteLogo?: KgPic;
  children?: React.ReactNode;
};

const PageLayout = ({ _site, c_siteLogo, children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header _site={_site} c_siteLogoUrl={c_siteLogo?.url} />
      {children}
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;
