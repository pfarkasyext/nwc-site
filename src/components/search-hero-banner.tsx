import * as React from "react";
import { SearchBar } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import {
  provideHeadless,
  SandboxEndpoints,
  SearchHeadlessProvider,
  useSearchActions,
} from "@yext/search-headless-react";

const SearchHeroBanner = () => {
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
    {/* <div className={`bg-brand-primary flex justify-center bg-gradient-to-r from-brand-primary via-purple-500 to-brand-cta`}>
        <div className="h-80 flex flex-col mx-6 py-4 w-2/3 max-w-3xl text-white">
                <div className="pt-6 pb-3 text-3xl font-bold">Healthy Living since 1939</div>
                <div className="py-3 pb-6">Get expert guidance and top-quality vitamins, supplements, and sports nutrition products at NWC. With over 80 years of experience, we help you reach your health goals and live your best life.</div>
                <div className="flex justify-center">
                    <SearchBar
                    onSearch={onSearch}
                    customCssClasses={{
                        searchBarContainer: "w-full",
                        inputElement: "demo",
                    }}
                    hideRecentSearches={false}
                    />
                </div>
        </div>
    </div> */}
    <section aria-labelledby="cause-heading">
            <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://www.washingtonpost.com/resizer/q_Sj-osjhABCigGjPWnL5BfChoo=/arc-anglerfish-washpost-prod-washpost/public/OHBJ2SJ6W5JLRDPQLSOU4233EY.jpg"
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gray-900 bg-opacity-50"
              />
              <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                <h2
                  id="cause-heading"
                  className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                >
                  Healthy Living since 1939
                </h2>
                <p className="mt-3 text-xl text-white">
                Get expert guidance and top-quality vitamins, supplements, and sports nutrition products at NWC. With over 80 years of experience, we help you reach your health goals and live your best life.
                </p>
                <div className="flex justify-center w-2/3 pt-12">
                    <SearchBar
                    onSearch={onSearch}
                    customCssClasses={{
                        searchBarContainer: "w-full",
                        inputElement: "demo",
                    }}
                    hideRecentSearches={false}
                    />
                </div>
              </div>
            </div>
          </section>
    </>
  );
};

export default SearchHeroBanner;