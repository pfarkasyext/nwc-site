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

const Locator: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const { _site } = document;

  return (
    <PageLayout
      _site={_site}
      c_siteLogo={_site.c_siteLogo}
      includeSearchHeader={true}
    >
      <div className="mx-auto max-w-7xl px-4">
        <StoreLocator />
      </div>
    </PageLayout>
  );
};

export default Locator;
