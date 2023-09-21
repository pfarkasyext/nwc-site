import { SearchBar } from "@yext/search-ui-react";
import * as React from "react";
import { useState, useEffect } from "react";
import searchConfig from "./search/searchConfig";

const TypedAnimation = () => {
  const [text, setText] = useState("");
  const [prompts, setPrompts] = useState<string[] | undefined>([]);
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [shouldRestart, setShouldRestart] = useState(false);
  const [shouldStart, setShouldStart] = useState(false);

  const mounted = React.useRef(true); // Add a ref to track component mount/unmount

  const onSearch = (searchEventData: {
    verticalKey?: string;
    query?: string;
  }) => {
    const { query } = searchEventData;
    if (query) window.open("/search?query=" + query, "_self");
  };

  useEffect(() => {
    const typingTimer =
      prompts &&
      shouldStart &&
      setTimeout(() => {
        if (!shouldRestart) {
          if (index < prompts.length && !isDeleting) {
            const currentString = prompts[index];
            const currentChar = currentString[text.length];
            setText((prevText) => prevText + currentChar);
            if (text.length === currentString.length - 1) {
              setIsDeleting(true);
            }
          } else {
            if (text.length > 0) {
              setText((prevText) => prevText.slice(0, -1));
              if (text.length === 1) {
                setIsDeleting(false);
                setIndex((prevIndex) => (prevIndex + 1) % prompts.length);
              }
            } else {
              setShouldRestart(true);
            }
          }
        } else {
          setText("");
          setIndex((prevIndex) => (prevIndex + 1) % prompts.length);
          setIsDeleting(false);
          setShouldRestart(false);
        }
      }, 40);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [index, text, prompts, isDeleting, shouldRestart, shouldStart]);

  useEffect(() => {
    const fetchUnivPrompts = async () => {
      const url = `https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete?v=20190101&api_key=${searchConfig.apiKey}&sessionTrackingEnabled=false&experienceKey=${searchConfig.experienceKey}&input=&version=STAGING&locale=${searchConfig.locale}`;
      try {
        const res = await fetch(url);
        const body = await res.json();
        const qs = body.response.results.map((item: any) => item.value);

        if (mounted.current) {
          // Check if component is still mounted before updating state
          setPrompts(qs);
          setShouldStart(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnivPrompts();

    return () => {
      // Mark the component as unmounted when it's about to unmount
      mounted.current = false;
    };
  }, []);

  return (
    <h2 className="w-full">
      <SearchBar
        onSearch={onSearch}
        customCssClasses={{
          searchBarContainer: "w-full mb-0",
        }}
        hideRecentSearches={false}
        placeholder={text}
      ></SearchBar>
    </h2>
  );
};

export default TypedAnimation;
