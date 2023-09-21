import {
  CloudRegion,
  Environment,
  HeadlessConfig,
} from "@yext/search-headless-react";
const apiKey: string = process.env.YEXT_PUBLIC_SEARCH_API_KEY as string;
const experienceKey: string = process.env.YEXT_PUBLIC_SEARCH_EXP_KEY as string;
const searchConfig: HeadlessConfig = {
  apiKey: apiKey,
  experienceKey: experienceKey,
  locale: "en",
  environment: Environment.SANDBOX,
  cloudRegion: CloudRegion.US,
};

export default searchConfig;
