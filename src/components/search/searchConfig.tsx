import {
  CloudRegion,
  Environment,
  HeadlessConfig,
} from "@yext/search-headless-react";

const searchConfig: HeadlessConfig = {
  apiKey: "d2471212e8121452a0204c59c9a08bd4",
  experienceKey: "answers",
  locale: "en",
  environment: Environment.SANDBOX,
  cloudRegion: CloudRegion.US,
};

export default searchConfig;
