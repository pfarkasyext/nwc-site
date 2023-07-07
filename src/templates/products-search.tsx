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
import {
  provideHeadless,
  SandboxEndpoints,
  SearchHeadlessProvider,
} from "@yext/search-headless-react";
import { FilterSearch } from "@yext/search-ui-react";
import ProductSearch from "../components/ProductSearch";
import ProductCard from "../components/cards/ProductCard";

export const getPath: GetPath<TemplateProps> = () => {
  return `products`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "NWC Products",
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
  verticalKey: "products",
});

const ProductSearchPage: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    richTextDescription,
    c_cRating,
    c_cRatingsCount,
    c_cImageURLText,
    c_oldPrice,
    c_newPrice,
    c_cPrice,
    c_cPromotion,
  } = document;

  return (
    <PageLayout
      _site={_site}
      c_siteLogo={_site.c_siteLogo}
      includeSearchHeader={false}
    >
      <SearchHeadlessProvider searcher={searcher}>
        <div className="mx-auto max-w-7xl px-4">
          <ProductSearch headerLabel="Search for NWC Products" searchBarPlaceholder="Search" />
        </div>
      </SearchHeadlessProvider>
    </PageLayout>
  );
};

export default ProductSearchPage;
