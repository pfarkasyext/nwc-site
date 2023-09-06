import { useSearchActions } from "@yext/search-headless-react";
import { SearchBar } from "@yext/search-ui-react";
import * as React from "react";
import { useEffect, useState } from "react";
import searchConfig from "./searchConfig";

const UnivSearchBar = () => {
  const onSearch = (searchEventData: {
    verticalKey?: string;
    query?: string;
  }) => {
    const { query } = searchEventData;
    if (query) window.open("/search?query=" + query, "_self");
  };

  const [queryPrompts, setQueryPrompts] = useState<string[]>([]);
  const words = ["CSS3.", "HTML5.", "javascript."];
  let i = 0;
  let timer;

  function typingEffect() {
    const word = queryPrompts[i].split("");
    const loopTyping = function () {
      if (word.length > 0) {
        const ele = document.querySelector(".demo") as HTMLInputElement;
        ele.placeholder += word.shift();
      } else {
        deletingEffect();
        return false;
      }
      timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
  }

  function deletingEffect() {
    const word = queryPrompts[i].split("");
    const loopDeleting = function () {
      if (word.length > 0) {
        word.pop();
        const ele = document.querySelector(".demo") as HTMLInputElement;
        ele.placeholder = word.join("");
      } else {
        if (words.length > i + 1) {
          i++;
        } else {
          i = 0;
        }
        typingEffect();
        return false;
      }
      timer = setTimeout(loopDeleting, 65);
    };
    loopDeleting();
  }

  const fetchUnivPrompts = async () => {
    let url = `https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete`;
    url += "?v=20190101";
    url += "&api_key=" + searchConfig.apiKey;
    url += "&sessionTrackingEnabled=false";
    url += "&experienceKey=" + searchConfig.experienceKey;
    url += "&input=";
    url += "&version=" + "STAGING";
    url += "&locale=" + searchConfig.locale;
    try {
      const res = await fetch(url);
      const body = await res.json();
      const qs = body.response.results.map((item: any) => {
        return item.value;
      });
      setQueryPrompts(qs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUnivPrompts();
  }, []);

  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setVertical("locations");
  }, []);

  useEffect(() => {
    queryPrompts.length >= 1 && typingEffect();
  }, [queryPrompts]);

  return (
    <div className="mt-6">
      <SearchBar
        onSearch={onSearch}
        customCssClasses={{
          searchBarContainer: "w-full",
          inputElement: "demo",
        }}
        hideRecentSearches={false}
      />
    </div>
  );
};

export default UnivSearchBar;
