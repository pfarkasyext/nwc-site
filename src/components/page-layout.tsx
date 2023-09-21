import * as React from "react";
import Site from "../types/Site";
import Footer from "./footer";
import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./search/searchConfig";
import Header from "./header";
import {
  ChatHeadlessProvider,
  HeadlessConfig,
} from "@yext/chat-headless-react";
import { IoChatbubblesSharp, IoCaretDownOutline } from "react-icons/io5";
import { useState } from "react";
import { ChatHeader, ChatPanel } from "@yext/chat-ui-react";
import "@yext/chat-ui-react/bundle.css";

export type KgPic = {
  url: string;
};

type Props = {
  _site: Site;
  c_siteLogo?: KgPic;
  includeSearchHeader?: boolean;
  children?: React.ReactNode;
};
const botId: string = YEXT_PUBLIC_BOT_ID as string;
const apiKey: string = YEXT_PUBLIC_BOT_API_KEY as string;

const searcher = provideHeadless(searchConfig);
const config: HeadlessConfig = {
  botId: botId,
  apiKey: apiKey,
  env: "SANDBOX",
};
const PageLayout = ({
  _site,
  c_siteLogo,
  includeSearchHeader,
  children,
}: Props) => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
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
      {showChat && (
        <div
          className="w-[400px]  mb-8"
          style={{ bottom: "20px", right: "20px", position: "fixed" }}
        >
          <ChatHeadlessProvider config={config}>
            <ChatPanel
              customCssClasses={{
                container: "h-[400px] overflow-scroll",
                inputCssClasses: {
                  sendButton: " !hover:bg-brand-cta !bg-brand-cta",
                },
              }}
              header={
                <ChatHeader
                  title={"NWC Assistant"}
                  showRestartButton={true}
                  customCssClasses={{
                    container: "!bg-none !bg-brand-cta text-white",
                  }}
                ></ChatHeader>
              }
            />
          </ChatHeadlessProvider>
        </div>
      )}
      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        {!showChat ? (
          <IoChatbubblesSharp
            className="text-brand-cta"
            onClick={() => setShowChat(!showChat)}
            style={{
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
            }}
          />
        ) : (
          <IoCaretDownOutline
            onClick={() => setShowChat(!showChat)}
            className="text-brand-cta"
            style={{
              fontSize: "1.875rem",
              lineHeight: "2.25rem",
            }}
          />
        )}
      </div>
    </>
  );
};

export default PageLayout;
