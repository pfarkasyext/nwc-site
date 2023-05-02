import * as React from "react";
import { SearchBar } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import {
  provideHeadless,
  SandboxEndpoints,
  useSearchActions,
} from "@yext/search-headless-react";
const SearchBarHead = () => {
  const apiKey = "d2471212e8121452a0204c59c9a08bd4";
  const experienceKey = "answers";
  const experienceVersion = "PRODUCTION";
  const locale = "en";

  const onSearch = (searchEventData: {
    verticalKey?: string;
    query?: string;
  }) => {
    const { query } = searchEventData;
    if (query)
      window.open(
        "/search?query=" + query,
        "_self"
      );
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
    url += "&api_key=" + apiKey;
    url += "&sessionTrackingEnabled=false";
    url += "&experienceKey=" + experienceKey;
    url += "&input=";
    url += "&version=" + experienceVersion;
    url += "&locale=" + locale;
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
    <>
      <div className="w-4/12 relative z-50">
        <SearchBar
          onSearch={onSearch}
          customCssClasses={{
            searchBarContainer: "w-auto px-4 md:px-0   mx-auto mb-auto ",
            inputElement: "demo ",
          }}
          hideRecentSearches={true}
        />
      </div>
    </>
  );
};

export default SearchBarHead;
